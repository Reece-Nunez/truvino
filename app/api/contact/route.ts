import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactNotificationEmail,
  contactConfirmationEmail,
} from "../../lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, company, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send notification to Truvino
    await resend.emails.send({
      from: "Truvino <noreply@truvinousa.com>",
      to: ["info@truvinousa.com"],
      subject: `New Contact Form: ${subject}`,
      html: contactNotificationEmail({ name, email, phone, company, subject, message }),
      replyTo: email,
    });

    // Send confirmation to the person who submitted
    await resend.emails.send({
      from: "Truvino <noreply@truvinousa.com>",
      to: [email],
      subject: "We've received your message — Truvino",
      html: contactConfirmationEmail(name),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
