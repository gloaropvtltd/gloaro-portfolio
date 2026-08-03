import { Resend } from "resend";
import { isRateLimited } from "@/utils/rateLimit";
import { sql } from "@/utils/db";
import { scoreLead } from "@/utils/ai";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const MAX_LENGTHS = { name: 100, email: 254, company: 100, phone: 30, service: 60, message: 5000 };

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, phone, service, message, website } = body ?? {};

  // Honeypot: real users never see or fill this field, bots that
  // auto-fill every input do — silently accept without sending.
  if (website) {
    return Response.json({ success: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    if (typeof body[field] === "string" && body[field].length > max) {
      return Response.json(
        { error: `${field} exceeds the maximum allowed length.` },
        { status: 400 }
      );
    }
  }

  let lead = null;
  if (process.env.GROQ_API_KEY) {
    try {
      lead = await scoreLead({
        name: name.trim(),
        company: company?.trim(),
        phone: phone?.trim(),
        service: service?.trim(),
        message: message.trim(),
      });
    } catch (error) {
      // Lead scoring is an enhancement, not a requirement — a submission
      // must still go through even if the model call fails.
      console.error("Lead scoring failed:", error);
    }
  }

  try {
    await sql`
      INSERT INTO contact_submissions (name, email, company, phone, service, message, lead_score, lead_urgency, lead_tags, lead_summary, lead_draft_reply, lead_call_brief)
      VALUES (${name.trim()}, ${email.trim()}, ${company?.trim() || null}, ${phone?.trim() || null}, ${service?.trim() || null}, ${message.trim()}, ${lead?.score ?? null}, ${lead?.urgency ?? null}, ${lead?.tags ?? null}, ${lead?.summary ?? null}, ${lead?.draftReply ?? null}, ${lead?.callBrief ?? null})
    `;
  } catch (error) {
    // Don't block sending the email just because the database isn't
    // configured yet — persistence is a nice-to-have for the admin
    // dashboard, not a requirement for the contact form to work.
    console.error("Failed to persist contact submission:", error);
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "GLOARO Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO || "info@gloaro.com",
      replyTo: email.trim(),
      subject: lead
        ? `[${lead.urgency.toUpperCase()}] New project inquiry from ${name.trim()}`
        : `New project inquiry from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        company?.trim() ? `Company: ${company.trim()}` : null,
        phone?.trim() ? `Phone: ${phone.trim()}` : null,
        service?.trim() ? `Service: ${service.trim()}` : null,
        lead ? `Lead score: ${lead.score}/100 (${lead.urgency} urgency)` : null,
        lead?.tags?.length ? `Tags: ${lead.tags.join(", ")}` : null,
        lead?.summary ? `Brief: ${lead.summary}` : null,
        "",
        "Message:",
        message.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Resend send failed:", error);
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
