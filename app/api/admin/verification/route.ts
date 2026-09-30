import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import VerificationRequest from '@/models/VerificationRequest';

export async function GET() {
  await connectDB();
  const verifications = await VerificationRequest.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ verifications });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  try {
    const verification = await VerificationRequest.create(body);
    return NextResponse.json({ verification }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Already submitted or invalid data' }, { status: 400 });
  }
}
