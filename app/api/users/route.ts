// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import UserModel from '@/models/User';
import FreelancerProfile from '@/models/FreelancerProfile';
import ClientProfile from '@/models/ClientProfile';

// GET all users (admin only)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const filter: Record<string, unknown> = {};
    if (role) filter.role = role;
    const users = await UserModel.find(filter, { password: 0 }).lean();
    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users - register a new user
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password, role, companyName, profession, primaryCategory } = await req.json();

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({ name, email, password: hashedPassword, role, avatar: '' });
    const userId = (user._id as string).toString();

    // Create role-specific profile
    if (role === 'freelancer') {
      const username = email.split('@')[0] + '-' + Math.random().toString(36).slice(2, 6);
      const fp = await FreelancerProfile.create({
        userId,
        name,
        username,
        email,
        profession: profession || 'Freelancer',
        primaryCategory: primaryCategory || 'web_development',
      });
      await UserModel.findByIdAndUpdate(userId, { freelancerProfileId: fp._id.toString() });
    } else if (role === 'client') {
      const username = email.split('@')[0] + '-' + Math.random().toString(36).slice(2, 6);
      const cp = await ClientProfile.create({
        userId,
        name,
        username,
        email,
        companyName: companyName || '',
      });
      await UserModel.findByIdAndUpdate(userId, { clientProfileId: cp._id.toString() });
    }

    return NextResponse.json({
      user: { id: userId, name, email, role },
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
