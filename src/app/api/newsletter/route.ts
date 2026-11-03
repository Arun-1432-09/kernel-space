import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { subscribeNewsletter } from "@/lib/data/mutations";

// Simple in-memory rate limiting map: ip -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues[0]?.message || "Invalid email address";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const { email } = result.data;
    const res = await subscribeNewsletter(email);

    if (!res.success) {
      return NextResponse.json(
        { error: res.error || "Subscription could not be processed" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: res.data?.alreadySubscribed
          ? "You are already subscribed to Kernel Space!"
          : "Welcome to the Kernel Space community. You're now subscribed.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
