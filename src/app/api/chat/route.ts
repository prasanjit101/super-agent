import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const message = searchParams.get('message');

    console.log(`User message received in server: ${message}`);
    // Create a transform stream for sending SSE messages
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    let connectionClosed = false;

    // Function to send SSE messages
    const sendMessage = async (data: string, event: string = 'message') => {
      if (connectionClosed) return;
      try {
        await writer.write(new TextEncoder().encode(`event: ${event}\n`));
        await writer.write(new TextEncoder().encode(`data: ${data}\n\n`));
      } catch (error) {
        console.error('Error writing to stream:', error);
        closeConnection();
      }
    };

    let i = 0;
    // Simulate sending messages every 2 seconds
    const intervalId = setInterval(() => {
      if (connectionClosed) return;
      const message = JSON.stringify({ time: new Date().toISOString() });
      sendMessage(message);
      i++;
    }, 2000);

    // Handle client disconnect
    const closeConnection = () => {
      if (connectionClosed) return;
      connectionClosed = true;
      clearInterval(intervalId);
      writer
        .close()
        .catch((error) => console.error('Error closing writer:', error));
    };

    // Listen for the client disconnect
    const requestAborted = new Promise((resolve) => {
      writer.closed.then(resolve);
    });

    requestAborted.then(closeConnection);

    // Return the response with the SSE stream
    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
