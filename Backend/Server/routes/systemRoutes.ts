// backend/routes/symptomRoutes.ts

import express from "express";
import type { Request, Response } from "express";
import SymptomCheck from "../models/SystemCheck.ts";
import { callLLMForSymptoms } from "../Services/llm.ts";

const router = express.Router();

// Quick deterministic red-flag checks (expand as needed)
function checkRedFlags(symptoms: string[], description?: string) {
  const s = (symptoms.join(" ") + " " + (description || "")).toLowerCase();
  const redFlags: { emergency: boolean; reason?: string }[] = [];
  if (
    s.includes("chest pain") &&
    (s.includes("breath") || s.includes("shortness"))
  ) {
    redFlags.push({
      emergency: true,
      reason:
        "Chest pain with breathing difficulty — possible cardiac/respiratory emergency",
    });
  }
  if (s.includes("severe bleeding") || s.includes("unconscious")) {
    redFlags.push({
      emergency: true,
      reason: "Severe bleeding/unconscious — emergency",
    });
  }
  if (
    s.includes("sudden slurred") ||
    (s.includes("face") && s.includes("weak"))
  ) {
    redFlags.push({ emergency: true, reason: "Possible stroke signs" });
  }

  if (redFlags.length > 0) {
    return {
      emergency: true,
      reasons: redFlags.map((r) => r.reason).filter(Boolean),
    };
  }
  return { emergency: false };
}

router.post("/check", async (req: Request, res: Response) => {
  try {
    const { userId, age, sex, symptoms, description } = req.body;

    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res
        .status(400)
        .json({ message: "Provide symptoms array with at least one symptom." });
    }

    // 1. red-flag quick check
    const flag = checkRedFlags(symptoms, description);
    if (flag.emergency) {
      const response = {
        triage: "emergency",
        differential: [],
        confidence: "high",
        explain: `Immediate red flag: ${flag.reasons?.join("; ")}`,
      };
      // Save optional record
      await SymptomCheck.create({
        userId,
        age,
        sex,
        symptoms,
        description,
        result: response,
      });
      return res.json({ result: response });
    }

    // 2. Build prompt for LLM
    const prompt = `
You are a clinical triage assistant. Input data:
age: ${age ?? "unknown"}
sex: ${sex ?? "unknown"}
symptoms: ${symptoms.join(", ")}
description: ${description ?? ""}

Return ONLY valid JSON with keys:
{
  "differential": [{"condition":"", "probability":"high|moderate|low","advice":""}, ...],
  "triage": "home|see-doctor|urgent|emergency",
  "confidence": "low|moderate|high",
  "explain": "short explanation 1-2 sentences"
}

Do NOT include any extra text.
`;

    // 3. Call LLM
    const llmResult = await callLLMForSymptoms(prompt);

    // 4. Optional: save to DB
    await SymptomCheck.create({
      userId,
      age,
      sex,
      symptoms,
      description,
      result: llmResult,
    });

    return res.json({ result: llmResult });
  } catch (err: any) {
    console.error("Symptom check error:", err);
    return res
      .status(500)
      .json({
        message: "Server error during symptom check",
        error: err.message,
      });
  }
});

export default router;
