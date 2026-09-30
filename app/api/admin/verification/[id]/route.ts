// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import VerificationRequest from '@/models/VerificationRequest';
import FreelancerProfile from '@/models/FreelancerProfile';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const { status, reviewerNotes } = await req.json();
  
  const verification = await VerificationRequest.findByIdAndUpdate(id, { status, reviewerNotes }, { new: true }).lean() as any;
  if (!verification) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // If approved, mark freelancer as verified pro
  if (status === 'approved' && verification.freelancerId) {
    await FreelancerProfile.findOneAndUpdate(
      { userId: verification.freelancerId },
      { isVerifiedPro: true }
    );
  }

  return NextResponse.json({ verification });
}
