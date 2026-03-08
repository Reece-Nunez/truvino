const LOGO_URL = "https://truvinousa.com/transparent.png";

function baseLayout(content: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="${LOGO_URL}" alt="Truvino" width="180" style="display:block;height:auto;" />
            </td>
          </tr>
          <!-- Gold divider -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#C9A962,transparent);"></div>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="background-color:#1a1a1a;border-radius:12px;border:1px solid rgba(201,169,98,0.1);padding:40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding-top:32px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#C9A962,transparent);margin-bottom:24px;"></div>
              <p style="margin:0;font-size:12px;color:#666;text-align:center;line-height:1.6;">
                Truvino | Premium Wine &amp; Spirits Distribution<br />
                354 State Street Unit 102, Hackensack, NJ 07601, USA<br />
                <a href="tel:+12012905627" style="color:#C9A962;text-decoration:none;">+1 (201) 290-5627</a> &nbsp;|&nbsp;
                <a href="mailto:info@truvinousa.com" style="color:#C9A962;text-decoration:none;">info@truvinousa.com</a>
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#444;text-align:center;">
                &copy; ${new Date().getFullYear()} Truvino. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function field(label: string, value: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 0;vertical-align:top;">
        <span style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#C9A962;font-weight:600;">${label}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:0 0 16px;color:#e5e5e5;font-size:14px;line-height:1.6;">
        ${value}
      </td>
    </tr>`;
}

// ─── Contact Form Emails ───

export function contactNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}) {
  return baseLayout(`
    <h1 style="margin:0 0 8px;font-size:24px;color:#C9A962;font-weight:600;">
      New Contact Inquiry
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#999;">
      You've received a new message from the Truvino website.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${field("Name", data.name)}
      ${field("Email", `<a href="mailto:${data.email}" style="color:#C9A962;text-decoration:none;">${data.email}</a>`)}
      ${field("Phone", data.phone)}
      ${field("Company", data.company)}
      ${field("Subject", data.subject)}
      ${field("Message", data.message.replace(/\n/g, "<br />"))}
    </table>
    <div style="margin-top:24px;">
      <a href="mailto:${data.email}" style="display:inline-block;padding:12px 28px;background-color:#C9A962;color:#000;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">
        Reply to ${data.name}
      </a>
    </div>
  `);
}

export function contactConfirmationEmail(name: string) {
  return baseLayout(`
    <h1 style="margin:0 0 8px;font-size:24px;color:#C9A962;font-weight:600;">
      Thank You, ${name}
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#e5e5e5;line-height:1.6;">
      We've received your message and appreciate you reaching out to Truvino.
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:#999;line-height:1.6;">
      A member of our team will review your inquiry and get back to you as soon as possible. If your matter is urgent, please don't hesitate to call us directly.
    </p>
    <div style="background-color:#0a0a0a;border-radius:8px;padding:20px;border:1px solid rgba(201,169,98,0.15);">
      <p style="margin:0;font-size:13px;color:#C9A962;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
        Direct Contact
      </p>
      <p style="margin:8px 0 0;font-size:14px;color:#e5e5e5;">
        <a href="tel:+12012905627" style="color:#C9A962;text-decoration:none;">+1 (201) 290-5627</a><br />
        <a href="mailto:info@truvinousa.com" style="color:#C9A962;text-decoration:none;">info@truvinousa.com</a>
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:14px;color:#999;line-height:1.6;">
      Warm regards,<br />
      <span style="color:#e5e5e5;font-weight:600;">The Truvino Team</span>
    </p>
  `);
}

// ─── Careers Form Emails ───

export function careerNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return baseLayout(`
    <h1 style="margin:0 0 8px;font-size:24px;color:#C9A962;font-weight:600;">
      New Career Application
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#999;">
      A new application has been submitted through the Truvino careers page.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${field("Name", data.name)}
      ${field("Email", `<a href="mailto:${data.email}" style="color:#C9A962;text-decoration:none;">${data.email}</a>`)}
      ${field("Phone", data.phone)}
      ${field("About & Preferred Position", data.message.replace(/\n/g, "<br />"))}
    </table>
    <p style="margin:16px 0 0;font-size:13px;color:#999;font-style:italic;">
      Note: The applicant's resume is attached to this email.
    </p>
    <div style="margin-top:24px;">
      <a href="mailto:${data.email}" style="display:inline-block;padding:12px 28px;background-color:#C9A962;color:#000;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">
        Reply to ${data.name}
      </a>
    </div>
  `);
}

export function careerConfirmationEmail(name: string) {
  return baseLayout(`
    <h1 style="margin:0 0 8px;font-size:24px;color:#C9A962;font-weight:600;">
      Application Received
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#e5e5e5;line-height:1.6;">
      Thank you for your interest in joining Truvino, ${name}.
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:#999;line-height:1.6;">
      We've received your application and our team will carefully review your qualifications. If your experience aligns with our current needs, we'll be in touch to discuss next steps.
    </p>
    <div style="background-color:#0a0a0a;border-radius:8px;padding:20px;border:1px solid rgba(201,169,98,0.15);">
      <p style="margin:0;font-size:13px;color:#C9A962;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
        What Happens Next
      </p>
      <p style="margin:12px 0 0;font-size:14px;color:#e5e5e5;line-height:1.8;">
        1. Our team reviews your application<br />
        2. Qualified candidates are contacted for an interview<br />
        3. We aim to respond within 5-7 business days
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:14px;color:#999;line-height:1.6;">
      Warm regards,<br />
      <span style="color:#e5e5e5;font-weight:600;">The Truvino Team</span>
    </p>
  `);
}
