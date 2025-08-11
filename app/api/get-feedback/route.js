import { connectDB } from "@/utils/database";
import MockInterview from "@/utils/model";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  try {
    await connectDB();

    const saved = await MockInterview.findOne({ mockId: id });
    console.log("found the saved interview", saved);
    return NextResponse.json({ success: true, saved });
  } catch (error) {
    console.log("got error while fetching feedback from database", error);
    return NextResponse.json(
      { success: false, error: "Can't fetch feedback" },
      { status: 500 }
    );
  }
}
