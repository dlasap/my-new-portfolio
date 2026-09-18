"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  message: z.string().min(20, "Tell me a bit more — at least 20 characters."),
  company: z.string().optional(), // honeypot
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot filled — treat as spam and pretend success.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    return {
      status: "error",
      message: "Email is not configured yet — please reach me directly at lasapdominic@gmail.com.",
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: parsed.data.email,
      subject: `Portfolio inquiry from ${parsed.data.name}`,
      text: parsed.data.message,
    });
    if (error) throw new Error(error.message);
    return { status: "success", message: "Thanks — I'll get back to you within a day or two." };
  } catch (err) {
    console.error("Contact submission failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message — please email lasapdominic@gmail.com directly.",
    };
  }
}