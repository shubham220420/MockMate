import { connectDB } from '@/utils/database';
import MockInterview from '@/utils/model';

export async function GET() {
  try {
    await connectDB();
    const interviews = await MockInterview.find().sort({ createdAt: -1 });
    return Response.json(interviews);
  } catch (err) {
    console.log(err);
    return Response.json({ error: 'Failed to fetch interviews' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const created = await MockInterview.insertOne(body);
    return Response.json(created, { status: 201 });
  } catch (err) {
    return Response.json({ error: 'Failed to create interview' }, { status: 500 });
  }
}
