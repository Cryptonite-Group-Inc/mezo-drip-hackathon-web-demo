import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.DRIP_API_KEY;
  const REALM_ID = process.env.DRIP_REALM_ID;
  const BASE_URL = process.env.NEXT_PUBLIC_DRIP_API_URL;
  
  try {
    const res = await fetch(
      `${BASE_URL}/api/v4/realms/${REALM_ID}/leaderboard`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch leaderboard');
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}