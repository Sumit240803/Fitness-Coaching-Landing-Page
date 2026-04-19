import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

interface EmailRequestBody {
  name: string;
  email?: string;
  whatsapp: string;
  goals: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: EmailRequestBody = await req.json();
    const { name, email, whatsapp, goals } = body;

    if (!name || !whatsapp) {
      return NextResponse.json(
        { error: "Name and WhatsApp number are required." },
        { status: 400 }
      );
    }

    // Send confirmation email to the admin/coach
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Coached by Shweta <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL || "shwetasetia16@gmail.com",
      subject: `New Application: ${name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e8e8e8;">
          <div style="background-color: #111111; padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">New Application Received</h1>
            <p style="color: #d4a8a4; font-size: 14px; margin-top: 8px;">The Reset Program</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #333333; font-size: 16px; margin-bottom: 24px;">
              A new application has been submitted. Here are the details:
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-size: 14px; width: 140px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111111; font-size: 14px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-size: 14px;">WhatsApp</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111111; font-size: 14px; font-weight: 500;">${whatsapp}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888888; font-size: 14px;">Goals</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111111; font-size: 14px; font-weight: 500;">${goals.join(", ")}</td>
              </tr>
            </table>
            <p style="color: #888888; font-size: 13px; margin-top: 24px; text-align: center;">
              Check the admin dashboard for full application details.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If applicant provided an email, send them a confirmation too
    if (email) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Coached by Shweta <onboarding@resend.dev>",
        to: email,
        subject: "Application Received – Coached by Shweta",
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e8e8e8;">
            <div style="background-color: #111111; padding: 32px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Thank You, ${name}!</h1>
              <p style="color: #d4a8a4; font-size: 14px; margin-top: 8px;">The Reset Program</p>
            </div>
            <div style="padding: 32px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                We've received your application for <strong>The Reset Program</strong>. Our team will review it and get back to you on WhatsApp within <strong>24–48 hours</strong>.
              </p>
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-top: 16px;">
                In the meantime, feel free to book your free clarity call:
              </p>
              <div style="text-align: center; margin-top: 24px;">
                <a href="https://calendly.com/shwetasetia16" style="display: inline-block; padding: 14px 32px; background-color: #d4a8a4; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 15px; font-weight: 500;">
                  Book Your Free Clarity Call
                </a>
              </div>
              <p style="color: #888888; font-size: 13px; margin-top: 32px; text-align: center;">
                If you have any questions, feel free to reach out on WhatsApp.
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Email API error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
