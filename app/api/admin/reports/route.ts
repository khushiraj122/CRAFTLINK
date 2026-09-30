import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AdminReport from '@/models/AdminReport';

export async function GET() {
  await connectDB();
  const reports = await AdminReport.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ reports });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const report = await AdminReport.create(body);
  return NextResponse.json({ report }, { status: 201 });
}
