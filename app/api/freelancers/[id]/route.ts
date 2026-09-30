// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import FreelancerProfile from '@/models/FreelancerProfile';

export async function GET(_: NextRequest, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const profile = await FreelancerProfile.findById(id).lean();
    if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ profile });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch freelancer' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const profile = await FreelancerProfile.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ profile });
  } catch {
    return NextResponse.json({ error: 'Failed to update freelancer' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await FreelancerProfile.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete freelancer' }, { status: 500 });
  }
}
