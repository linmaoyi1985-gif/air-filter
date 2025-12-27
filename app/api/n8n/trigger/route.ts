import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { workflow, payload } = body;

    if (!workflow) {
      return NextResponse.json(
        { error: 'Missing required field: workflow' },
        { status: 400 }
      );
    }

    // Get n8n webhook configuration
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const n8nWebhookSecret = process.env.N8N_WEBHOOK_SECRET;

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { error: 'N8N_WEBHOOK_URL not configured on server' },
        { status: 500 }
      );
    }

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add secret to headers if configured
    if (n8nWebhookSecret) {
      headers['X-N8N-Secret'] = n8nWebhookSecret;
    }

    // Forward request to n8n
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        workflow,
        payload,
        user: {
          email: session.user.email,
          name: session.user.name,
        },
      }),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('N8N webhook error:', errorText);
      return NextResponse.json(
        { error: 'N8N webhook request failed', details: errorText },
        { status: n8nResponse.status }
      );
    }

    const data = await n8nResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in n8n trigger:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
