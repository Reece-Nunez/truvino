import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  careerNotificationEmail,
  careerConfirmationEmail,
} from "../../lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const resume = formData.get("resume") as File | null;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare resume attachment if provided
    const attachments = [];
    if (resume) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      attachments.push({
        filename: resume.name,
        content: buffer,
      });
    }

    // Send notification to Truvino
    await resend.emails.send({
      from: "Truvino <noreply@truvinousa.com>",
      to: ["sales@truvinonj.com"],
      subject: `New Career Application: ${name}`,
      html: careerNotificationEmail({ name, email, phone, message }),
      replyTo: email,
      attachments,
    });

    // Send confirmation to applicant
    await resend.emails.send({
      from: "Truvino <noreply@truvinousa.com>",
      to: [email],
      subject: "Application Received — Truvino",
      html: careerConfirmationEmail(name),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Careers form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
