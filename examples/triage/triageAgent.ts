import { openai } from '@ai-sdk/openai';
import { createAgent } from 'ts-swarm';

export const triageAgent = createAgent({
  id: 'Triage_Agent',
  model: openai('gpt-4o-2024-08-06', { structuredOutputs: true }),
  system: `
    If user wants to post tweets on twitter or x, transfer to xAgent.
    If user asks blockchain or swap related questions, transfer to brianAgent.
    If user asks to execute calldata , transfer to starknetAgent.
    You are to answer the user's questions.
    If you are unable to answer the question, you should transfer responsibility to another agent to retrieve additional information to inform you answer.
  `,
});
