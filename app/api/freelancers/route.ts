// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import FreelancerProfile from '@/models/FreelancerProfile';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const availability = searchParams.get('availability');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');

    const filter: any = { isBanned: { $ne: true } };
    if (category) filter.primaryCategory = category;
    if (availability) filter.availability = availability;
    if (featured === 'true') filter.featured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { profession: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
      ];
    }

    const freelancers = await FreelancerProfile.find(filter).limit(limit).lean();
    return NextResponse.json({ freelancers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch freelancers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const profile = await FreelancerProfile.create(body);
    return NextResponse.json({ profile }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create freelancer profile' }, { status: 500 });
  }
}
