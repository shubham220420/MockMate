import { connectDB } from '@/utils/database';
import MockInterview from '@/utils/model';
import { NextResponse } from 'next/server';

export async function DELETE(req){
    const {mockId} = await req.json();
    await connectDB();
    try{
        await MockInterview.findOneAndDelete({mockId : mockId});
        return NextResponse.json({success : true});
    }
    catch(err){
        return NextResponse.json({success : false, error : err.message}, {status : 500});
    }
}
