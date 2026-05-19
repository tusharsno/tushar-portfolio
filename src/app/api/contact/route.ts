import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sanitize only for HTML display — never use on email headers
function sanitizeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`contact:${ip}`, 3, 60 * 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Raw values for email headers (replyTo must not be HTML-encoded)
    const rawName    = String(name).slice(0, 100);
    const rawEmail   = String(email).slice(0, 200);
    const rawMessage = String(message).slice(0, 2000);

    // HTML-safe values only for the email body
    const safeName    = sanitizeHtml(rawName);
    const safeEmail   = sanitizeHtml(rawEmail);
    const safeMessage = sanitizeHtml(rawMessage);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "tusharcoder269@gmail.com",
      replyTo: rawEmail,  // use raw email — not HTML-encoded
      subject: `New message from ${rawName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">New Contact Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f5; padding: 16px; border-radius: 8px;">${safeMessage}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #888; font-size: 12px;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error("[Contact API Error]", error.message);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
