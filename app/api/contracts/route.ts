// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import HiringRequest from '@/models/HiringRequest';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId');
    const freelancerId = searchParams.get('freelancerId');
    const status = searchParams.get('status');

    const filter: Record<string, unknown> = {};
    if (clientId) filter.clientId = clientId;
    if (freelancerId) filter.freelancerId = freelancerId;
    if (status) filter.status = status;

    const contracts = await HiringRequest.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ contracts });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch contracts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const contract = await HiringRequest.create({ ...body, status: 'pending' });
    return NextResponse.json({ contract }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create contract' }, { status: 500 });
  }
}
