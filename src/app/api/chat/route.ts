import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const prompt = searchParams.get('prompt');

    if (!prompt) {
      return new NextResponse('Missing prompt', { status: 400 });
    }

    return new NextResponse(prompt);
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
