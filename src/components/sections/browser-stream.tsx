'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import ChatInterface from './Chat';
import { BrowserAgent } from '@/server/db/schema';
import { CircleStop, Play, Radio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BrowserStream({
  browserAgent,
}: {
  browserAgent: BrowserAgent;
}) {
  const [isStreamConnected, setIsStreamConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [chatWidth, setChatWidth] = useState<100 | 20>(20);
  const [sandboxActive, setSandboxActive] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted message:', message);
    setMessage('');
  };

  const toggleStream = () => {
    setIsStreamConnected(!isStreamConnected);
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[85vh]">
      <ResizablePanel defaultSize={chatWidth} minSize={30}>
        <ChatInterface
          sandboxActive={sandboxActive}
          browserAgent={browserAgent}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={100 - chatWidth} minSize={30}>
        <div className="flex h-full flex-col">
          <main className="flex-grow flex items-center justify-center p-4">
            {isStreamConnected ? (
              <video
                className="w-full max-w-3xl aspect-video"
                controls
                autoPlay
                muted
              >
                <source
                  src="/placeholder.svg?height=480&width=640"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-2xl font-semibold text-gray-700">
                No stream connected
              </div>
            )}
          </main>
          <div className="flex gap-4 p-2 px-6 border rounded-full max-w-3xl mx-auto">
            <Button variant="default">
              Start <Play />
            </Button>
            <Button variant="destructive">
              Stop <CircleStop />
            </Button>
            <Button
              disabled={!sandboxActive}
              onClick={toggleStream}
              variant="outline"
            >
              {isStreamConnected ? 'Disconnect' : 'Connect'} Stream
              <Radio />
            </Button>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
