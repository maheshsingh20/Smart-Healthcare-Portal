// backend/services/llm.ts
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

if (!OPENAI_KEY) {
  console.warn("OPENAI_API_KEY not set — LLM calls will fail.");
}

export type LlmResponseShape = {
  differential: {
    condition: string;
    probability: "high" | "moderate" | "low";
    advice: string;
  }[];
  triage: "home" | "see-doctor" | "urgent" | "emergency";
  confidence: "low" | "moderate" | "high";
  explain: string;
};

export async function callLLMForSymptoms(
  prompt: string
): Promise<LlmResponseShape> {
  if (!OPENAI_KEY) throw new Error("OPENAI_API_KEY not configured on server");

  // We ask the model to return JSON only.
  const body = {
    model: OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a clinical triage assistant. Output ONLY valid JSON with the specified keys.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.0,
    max_tokens: 600,
  };

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`LLM error ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  const raw = data.choices?.[0]?.message?.content;

  // Try to extract JSON block if model added backticks or text
  const jsonTextMatch = raw?.match(/\{[\s\S]*\}$/);
  const jsonText = jsonTextMatch ? jsonTextMatch[0] : raw;

  try {
    const parsed = JSON.parse(jsonText);
    // Basic validation
    if (!parsed || !parsed.differential || !parsed.triage) {
      throw new Error("LLM returned JSON missing required keys");
    }
    return parsed as LlmResponseShape;
  } catch (err) {
    throw new Error(
      "Failed to parse LLM JSON response: " +
        (err as Error).message +
        " | raw: " +
        raw
    );
  }
}
