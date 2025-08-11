import { connectDB } from "@/utils/database";
import MockInterview from "@/utils/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("body", body);
    const { id, currentquestionIndex, AIresponse, useranswer } = body;
    console.log("USER ASNWER FROM POST CALL ", useranswer);
    const saved = await MockInterview.findOneAndUpdate(
      { mockId: id },
      {
        $set: {
          [`jobResponse.${currentquestionIndex}.AIresponse`]: AIresponse,
          [`jobResponse.${currentquestionIndex}.useranswer`]: useranswer,
        },
      },
      { new: true }
    );

    return NextResponse.json({ success: true, saved });
  } catch (error) {
    console.log("Save error:", error);
    return NextResponse.json(
      { success: false, error: "Cant recieve user feedback" },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await connectDB();

    const saved = await MockInterview.findOne({ mockId: id });

    if (saved) {
      return NextResponse.json( saved.jobResponse );
    } else {
      return NextResponse.json(
        { success: false, error: "No feedback found for the given ID" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log("got error while fetching feedback from database", error);
    return NextResponse.json(
      { success: false, error: "Can't fetch feedback" },
      { status: 500 }
    );
  }
}
