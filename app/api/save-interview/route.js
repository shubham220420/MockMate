import { connectDB  } from "@/utils/database";
import MockInterview from "@/utils/model";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const saved = await MockInterview.create({
      jobTitle: body.jobTitle,
      jobDescription: body.jobDescription,
      preparationLevel: body.preparationLevel,
      jobResponse: body.jobResponse,
      createdBy: body.createdBy,
      mockId : body.mockId
    });
    console.log ("saved data is ", saved);

    return Response.json({ success: true, saved });
  } catch (error) {
    console.log("Save error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
