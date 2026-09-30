import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const fallbackAnalysis = (category?: string, targetBudget?: number) => ({
  complexity: 'Medium-High',
  estimatedDuration: '7 - 14 business days',
  recommendedRole: category === 'video_editing'
    ? 'Lead Documentary & Commercial Video Editor'
    : 'Senior Full-Stack & Systems Architect',
  recommendedTechStack: category === 'video_editing'
    ? ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Frame.io']
    : ['React 19 / Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
  milestonePlan: [
    { title: 'Phase 1: Brief & Architecture', percentBudget: 25, days: 3 },
    { title: 'Phase 2: Core Build', percentBudget: 40, days: 5 },
    { title: 'Phase 3: Polish & Review', percentBudget: 20, days: 3 },
    { title: 'Phase 4: Final Delivery', percentBudget: 15, days: 3 },
  ],
  budgetGuidance: {
    lowRange: targetBudget ? Math.floor(targetBudget * 0.8) : 450,
    targetRange: targetBudget || 750,
    premiumRange: targetBudget ? Math.floor(targetBudget * 1.4) : 1200,
  },
  keyRecommendations: [
    'Lock scope before production begins.',
    'Use milestone escrow for protected approvals.',
    'Establish clear deliverable criteria in project chat.',
  ],
  suggestedSearchKeywords: category === 'video_editing'
    ? ['Documentary', 'Color Grading', 'Motion Graphics']
    : ['React', 'TypeScript', 'Full-Stack', 'Next.js'],
});

export async function POST(req: NextRequest) {
  try {
    const { projectBrief, category, targetBudget } = await req.json();

    if (!projectBrief) {
      return NextResponse.json({ error: 'Project brief is required' }, { status: 400 });
    }

    const ai = getGenAI();
    if (!ai) {
      return NextResponse.json({ success: true, analysis: fallbackAnalysis(category, targetBudget) });
    }

    const prompt = `You are the Master Creative & Technical Architect for CraftLink, the premier marketplace for world-class video editors and senior software developers.
Analyze the following project brief from a client looking to hire top talent:

PROJECT BRIEF: "${projectBrief}"
CATEGORY: ${category || 'General'}
TARGET BUDGET: ${targetBudget ? `$${targetBudget}` : 'Not specified'}

Provide a deep, expert breakdown formatted strictly as JSON with this exact schema:
{
  "complexity": "Low" | "Medium" | "High" | "Enterprise",
  "estimatedDuration": "string",
  "recommendedRole": "string",
  "recommendedTechStack": ["array"],
  "milestonePlan": [{ "title": "string", "percentBudget": number, "days": number }],
  "budgetGuidance": { "lowRange": number, "targetRange": number, "premiumRange": number },
  "keyRecommendations": ["string"],
  "suggestedSearchKeywords": ["string"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json({ success: true, analysis: parsed });
  } catch (error) {
    console.error('Gemini Architect Error:', error);
    return NextResponse.json({ success: true, analysis: fallbackAnalysis() });
  }
}
