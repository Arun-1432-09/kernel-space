import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const pitchSchema = z.object({
  name: z.string().max(100).optional().nullable(),
  email: z.string().email().max(255).optional().or(z.literal("")).nullable(),
  topic: z.string().min(5, "Topic must be at least 5 characters").max(200),
  core_question: z.string().min(10, "Please provide a core guiding question").max(500),
  why_it_matters: z.string().min(10, "Please explain why this topic matters").max(1000),
  links: z.string().max(500).optional().nullable(),
  consent_confirmed: z.boolean().refine((val) => val === true, {
    message: "Parental or age consent is required",
  }),
  honeypot: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check honeypot
    if (body.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const parseResult = pitchSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid submission" },
        { status: 400 }
      );
    }

    const { name, email, topic, core_question, why_it_matters, links, consent_confirmed } =
      parseResult.data;

    if (isSupabaseConfigured()) {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { error } = await supabase.from("pitches").insert({
          name: name || null,
          email: email || null,
          topic,
          core_question,
          why_it_matters,
          links: links || null,
          status: "new",
          consent_confirmed,
        });

        if (error) {
          throw error;
        }
      }
    }

    return NextResponse.json(
      { message: "Your pitch has been submitted successfully." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something broke on our side. Try again in a moment." },
      { status: 500 }
    );
  }
}
