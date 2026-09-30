import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import JobApplicationModel from '@/models/JobApplication';
import JobModel from '@/models/Job';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    const creatorId = searchParams.get('creatorId');
    const clientId = searchParams.get('clientId');

    const query: Record<string, string> = {};
    if (jobId) query.jobId = jobId;
    if (creatorId) query.creatorId = creatorId;
    if (clientId) query.clientId = clientId;

    const applications = await (JobApplicationModel as any).find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, applications });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Check if creator already applied
    const existing = await (JobApplicationModel as any).findOne({
      jobId: body.jobId,
      creatorId: body.creatorId,
    }).lean();
    if (existing) {
      return NextResponse.json({ success: false, error: 'Already applied to this job' }, { status: 409 });
    }

    const application = await JobApplicationModel.create({
      ...body,
      status: 'Pending',
      appliedAt: new Date().toISOString(),
    });

    // Increment job applicants count
    await (JobModel as any).findByIdAndUpdate(body.jobId, { $inc: { applicantsCount: 1 } });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
