import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Invalid email format").max(255),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  consent_confirmed: z.boolean().refine((val) => val === true, {
    message: "Parental or age consent is required",
  }),
  honeypot: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, message } = parseResult.data;

    if (isSupabaseConfigured()) {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { error } = await supabase.from("contact_messages").insert({
          name,
          email,
          message,
          is_read: false,
        });

        if (error) throw error;
      }
    }

    return NextResponse.json(
      { message: "Your message has been received." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something broke on our side. Try again in a moment." },
      { status: 500 }
    );
  }
}
