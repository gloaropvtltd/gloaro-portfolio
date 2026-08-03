import Groq from "groq-sdk";

let cachedClient = null;

function getClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured.");
  }
  if (!cachedClient) {
    cachedClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return cachedClient;
}

const leadScoreSchema = {
  type: "object",
  properties: {
    score: {
      type: "integer",
      description: "Lead quality score from 1 (low intent, vague) to 100 (high intent, ready to buy, budget/timeline mentioned)",
    },
    urgency: { type: "string", enum: ["low", "medium", "high"] },
    tags: {
      type: "array",
      items: { type: "string" },
      description: "2-5 short tags: matched service area, company-size signal, notable requirement",
    },
    summary: {
      type: "string",
      description: "One sentence brief for whoever calls this lead back",
    },
    draftReply: {
      type: "string",
      description:
        "A ready-to-edit email reply to the lead, written as GLOARO PVT LTD, acknowledging their message, addressing what they asked for, and proposing a next step (call/demo). 3-5 short paragraphs, no subject line, sign off as \"The GLOARO Team\".",
    },
    callBrief: {
      type: "string",
      description:
        "Exactly 3 short lines (separated by newlines) briefing whoever calls this lead back: what they need, the strongest angle to open with, and one risk or open question to probe.",
    },
  },
  required: ["score", "urgency", "tags", "summary", "draftReply", "callBrief"],
  additionalProperties: false,
};

export async function scoreLead({ name, company, phone, service, message }) {
  const client = getClient();

  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: `You are triaging an inbound lead for GLOARO PVT LTD, a business networking and digital solutions company (web/mobile development, CRM, digital marketing, IT consulting). Score how promising this lead is, summarize it for the sales team, draft a reply email, and write a call brief.

Name: ${name}
Company: ${company || "not provided"}
Phone: ${phone || "not provided"}
Requested service: ${service || "not specified"}
Message: ${message}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "lead_score",
        schema: leadScoreSchema,
        strict: true,
      },
    },
  });

  const text = completion.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("Lead scoring model did not return any output.");
  }
  return JSON.parse(text);
}
