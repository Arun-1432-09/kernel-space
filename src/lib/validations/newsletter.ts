import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please provide a valid email address")
    .max(255, "Email is too long")
    .transform((val) => val.toLowerCase().trim()),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
