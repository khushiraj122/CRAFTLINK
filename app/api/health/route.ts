import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'CraftLink API (Next.js)',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasMongoDB: Boolean(process.env.MONGODB_URI),
  });
}
