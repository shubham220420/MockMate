import { connectDB } from "@/utils/database";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { jobTitle, jobDescription, preparationLevel, questioncount } =
    await req.json();

  const prompt = `
You are an expert AI interviewer.

Based on the following details, generate ${questioncount} relevant interview questions. Each question should sound conversational and realistic, as if asked in a real interview. Your response should include the correct answer to each question as well.

Only return a valid JSON array with the following structure:

[
  {
    "question": "First question here?",
    "answer": "Detailed answer to first question..."
  },
  {
    "question": "Second question here?",
    "answer": "Detailed answer to second question..."
  }
  ...
]

Ensure:
- There are exactly ${questioncount} items.
- Each answer is 7-8 lines max.
- Avoid any extra commentary or explanations outside the JSON.

Job Title: ${jobTitle}

Job Description:
${jobDescription}

Preparation Level:
${preparationLevel}
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
      { error: "Gemini request failed." ,message: "The Gemini model is overloaded. Please try again later." },
      { status: 500 }
    );
  }
}
