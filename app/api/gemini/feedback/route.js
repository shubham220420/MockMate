import { connectDB } from "@/utils/database";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { interviewquestion, useranswer } = await req.json();

const prompt = `
You are an expert AI interviewer assessing a candidate's response.

**Instructions**:
1. Read the given interview question and the user's answer.
2. Provide:
   - "rating": An integer between 1–10 evaluating the answer.
   - "areas_of_improvement": A short paragraph (max 3–4 lines) suggesting improvements.
   - "feedback": A short constructive feedback (max 4–5 lines) focusing on accuracy, clarity, and completeness.

**Rules**:
- Keep total response within 10–12 lines.
- Use clear, professional, and encouraging language.
- Output ONLY valid JSON in the following exact format (no extra text, no markdown, no keys other than specified):

{
  "rating": 8,
  "areas_of_improvement": "Short paragraph here",
  "feedback": "Short feedback here"
}

**Data**:
Question: ${interviewquestion}
User Answer: ${useranswer}
`;

  try {
    await connectDB();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ data: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Gemini request failed." },
      { status: 500 }
    );
  }
}
