import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { dream } = await request.json();

    if (!dream || typeof dream !== 'string' || dream.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a dream to interpret' },
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500, headers: corsHeaders }
      );
    }

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-2-1212',
        messages: [
          {
            role: 'system',
            content: `You are a mystical, insightful dream interpreter with deep knowledge of psychology, symbolism, and the subconscious mind. 
            
Your interpretations should be:
- Poetic yet profound
- Grounded in Jungian psychology and universal symbolism
- Personalized and empathetic
- Structured with clear themes and meanings
- Written in an elegant, flowing style that matches the sophistication of a Diptyque fragrance description

Begin each interpretation by acknowledging the dream's emotional tone, then explore 2-3 key symbols or themes, and conclude with an insight about what the subconscious might be communicating.

Keep your interpretation between 200-300 words. Use evocative language that feels both ancient and contemporary.`
          },
          {
            role: 'user',
            content: `Please interpret this dream:\n\n${dream}`
          }
        ],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('xAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to interpret dream. Please try again.' },
        { status: response.status, headers: corsHeaders }
      );
    }

    const data = await response.json();
    const interpretation = data.choices?.[0]?.message?.content;

    if (!interpretation) {
      return NextResponse.json(
        { error: 'No interpretation received' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({ interpretation }, { headers: corsHeaders });
  } catch (error) {
    console.error('Error interpreting dream:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500, headers: corsHeaders }
    );
  }
}
