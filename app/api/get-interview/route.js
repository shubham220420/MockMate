import { connectDB } from "@/utils/database";
import MockInterview from "@/utils/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const id = body.id;
  try {
    const interview = await MockInterview.findOne({ mockId: id });

    if (!interview) {
      return NextResponse.json(
        {
          success: false,
          error: "Interview not found",
          message: "The requested interview does not exist or has been deleted",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, interview });
  } catch (Error) {
    console.log("Error while fetching details", Error);
    return NextResponse.json(
      { success: false, error: Error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");
  console.log("email from api call is", email);
  try {
    const list = await MockInterview.find({ createdBy: email });
    return NextResponse.json({ success: true, list });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  await connectDB();
  const body = await req.json();
  const { mockId, AIresponse, useranswer } = body;

  try {
    const interview = await MockInterview.findOne({ mockId });
    if (!interview) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    // Update each jobResponse entry
    interview.jobResponse.forEach((item) => {
      item.useranswer = useranswer;
      item.AIresponse.rating = AIresponse.rating;
      item.AIresponse.areas_of_improvement = AIresponse.areas_of_improvement;
      item.AIresponse.feedback = AIresponse.feedback;
    });

    // Tell Mongoose the nested array has changed
    interview.markModified("jobResponse");

    await interview.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
