import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { createAgent, Agent } from 'ts-swarm';
import { RpcProvider,Account,constants } from 'starknet';
import exampleCallData from '../../testpayload.json';



const options = {
    apiKey: process.env.BRIAN_API_KEY || "",
  };

const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });

// initialize existing pre-deployed account 0 of Devnet
const privateKey = process.env.STARKNET_PRIVKEY || "";
const accountAddress = process.env.STARKNET_ADDRESS || "";

const account = new Account(myProvider, accountAddress, privateKey);


const starknetTools: Agent['tools'] = [
  {
    id: 'execute',
    description: 'A tool for executing starknet transaction data',
    parameters: z.object({
      calldata: z.string().describe('what data to execute'),
    }),

    execute: async ({ calldata }) => {
        
        const result = await account.execute(JSON.parse(calldata));
        
        return `tx: ${result.transaction_hash}`;

    },
  },
];

export const starknetAgent = createAgent({
  id: 'Starknet_Agent',
  model: openai('gpt-4o-2024-08-06', { structuredOutputs: true }),
  system: `
    You can use the execute tools to answer the question.
    You should attempt to resolve the user's request based on the tools you have available.
    If the customer is unsure, you should return to triage agent.
  `,
  tools: starknetTools,
});
