import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { env } from '@/env';
import { MemorySaver } from '@langchain/langgraph';

const agentModel = new ChatOpenAI({
  temperature: 0.4,
  model: 'google/gemini-2.0-flash-exp:free',
  openAIApiKey: env.OPENROUTER_KEY,
  configuration: {
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'https://www.SuperAgent.vercel.app',
      'X-Title': 'SuperAgent',
    },
  },
});

const agentTools = [new TavilySearchResults({ maxResults: 3 })];

// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});

// Now it's time to use!
const agentFinalState = await agent.invoke(
  { messages: [new HumanMessage('what is the current weather in sf')] },
  { configurable: { thread_id: '42' } },
);

console.log(
  agentFinalState.messages[agentFinalState.messages.length - 1].content,
);

const agentNextState = await agent.invoke(
  { messages: [new HumanMessage('what about ny')] },
  { configurable: { thread_id: '42' } },
);

console.log(
  agentNextState.messages[agentNextState.messages.length - 1].content,
);
