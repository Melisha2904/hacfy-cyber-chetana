import { NextResponse } from 'next/server';
import { questionTracker } from '@/lib/chat-store';

export async function GET() {
  // Return top 5 most asked questions sorted by count
  const sorted = Array.from(questionTracker.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([question, count]) => ({ question, count }));

  return NextResponse.json({ trending: sorted });
}
