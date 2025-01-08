'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Share,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
  Volume2,
  SendHorizontal,
  Check,
  ChevronsUpDown,
  ArrowDown,
  Bot,
  User2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from '@/lib/utils';
import { ScriptsCombobox } from '../elements/scripts-combobox';
import { BrowserAgent } from '@/server/db/schema';
import { useToast } from "@/hooks/use-toast"


interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  error?: string;
}

export default function ChatInterface({ browserAgent, sandboxActive }: { browserAgent: BrowserAgent, sandboxActive: boolean }) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxActive) {
      toast({
        title: 'Error',
        description: 'Please start your agent first',
        variant: 'destructive',
      })
    };
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
    };
    setMessages((prev) => [...prev, aiMessage]);

    const eventSource = new EventSource(
      `/api/chat?message=${encodeURIComponent(input)}`,
    );

    eventSource.onmessage = (event) => {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages?.[newMessages.length - 1];
        if (lastMessage?.role === 'assistant') {
          lastMessage.content += event.data;
        }
        return newMessages;
      });
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
      setIsLoading(false);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages?.[newMessages.length - 1];
        if (lastMessage?.role === 'assistant') {
          lastMessage.error = `Failed to generate response. Please try again.`;
        }
        return newMessages;
      });
    };

    eventSource.addEventListener('done', () => {
      eventSource.close();
      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Chat Messages or Empty State */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-2 py-20 lg:py-40">
              <p className="max-w-xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
                You are connected to <span className="text-primary">{browserAgent.title}</span>
              </p>
              <p className="text-sm text-slate-300">chat with your agent here</p>
              <ArrowDown />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`mx-auto flex max-w-4xl p-4 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                <div
                  className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-4`}
                >
                  <Avatar className="h-8 w-8">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black`}
                    >
                      {message.role === 'assistant' ? <Bot /> : <User2 />}
                    </div>
                  </Avatar>
                  <div className="max-w-2xl flex-1">
                    <div
                      className={cn(
                        `mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`,
                        message.error ? 'border border-red-500 p-2' : '',
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-invert max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }: {
                                className?: string;
                                children?: React.ReactNode;
                              } & { [key: string]: any }) {
                                const match = /language-(\w+)/.exec(
                                  className ?? '',
                                );
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    {...props}
                                    style={oneDark}
                                    language={match[1]}
                                    PreTag="div"
                                  >
                                    {JSON.stringify(children).replace(
                                      /\n$/,
                                      '',
                                    )}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code {...props} className={className}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.role === 'assistant' && (
                      <div className="flex gap-2 text-gray-400">
                        <Button variant="ghost" size="icon" className="">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 flex w-full justify-center gap-2 border-t pt-4 px-4">
        <div className="w-full max-w-2xl space-y-2">
          <form
            onSubmit={handleSubmit}
            className="relative mx-auto rounded-lg border border-slate-600"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the task you want to perform..."
              className="w-full rounded-lg p-4 pr-24 focus:outline-none"
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <Button type="submit" size="icon" className="">
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
