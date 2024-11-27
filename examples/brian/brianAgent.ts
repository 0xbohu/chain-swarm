import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { createAgent, Agent } from 'ts-swarm';
import { BrianSDK } from "@brian-ai/sdk";

const options = {
    apiKey: process.env.BRIAN_API_KEY || "",
  };
const brian = new BrianSDK(options);

const brianTools: Agent['tools'] = [
  {
    id: 'knowledge',
    description: 'A tool for providing blockchain knowledge for questions',
    parameters: z.object({
      prompt: z.string().describe('The question from the user'),
    }),
    execute: async ({ prompt }) => {

        const result = await brian.ask({
            prompt: prompt,
            kb: "public-knowledge-box",
        });

      if (!result.answer){
        return `Could not find any information, sorry!`;
      }
      return `brian's answer: ${result.answer}`;
    },
  },
  {
    id: 'swap',
    description: 'A tool for swapping tokens',
    parameters: z.object({
      prompt: z.string().describe('The swap details from user')
    }),
    execute: async ({ prompt,address }) => {

      //prompt
      //address
      //chainId

      const result = await brian.transact({
          prompt: prompt,
          address: process.env.STARKNET_ADDRESS || "",
      });

      if (!result){
        return `Could not fetch transaction details`;
      }

      const calldata = JSON.stringify(result[0].data.steps);

      return `swap calldata is ${calldata}`;
    },
  },
];

export const brianAgent = createAgent({
  id: 'Brian_Agent',
  model: openai('gpt-4o-2024-08-06', { structuredOutputs: true }),
  system: `
    You are a blockchain agent. You need to provide details about blockchain knowledge, creating smart contract code.
    You can use the Brian Knowledge tools to answer the question.
    You should attempt to resolve the user's request based on the tools you have available.
    If the customer is unsure, you could provide them a list of topics to choose from.
  `,
  tools: brianTools,
});
