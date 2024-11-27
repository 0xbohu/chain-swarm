import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { createAgent, Agent } from 'ts-swarm';
import { RpcProvider,Account,constants } from 'starknet';
import { TwitterApi } from 'twitter-api-v2';
import { runDemoLoop } from '../run';



// Instantiate with desired auth type (here's Bearer v2 auth)
const client = new TwitterApi({
    appKey: process.env.X_APPKEY,
    appSecret: process.env.X_APPSECRET,
    accessToken: process.env.X_ACCESSTOKEN,
    accessSecret: process.env.X_ACCESSSECRET,
  });
  // NOTE: accessToken and accessSecret are not required if you want to generate OAuth login links.




const xTools: Agent['tools'] = [
  {
    id: 'execute',
    description: 'A tool for posting tweets on twitter or x',
    parameters: z.object({
      calldata: z.string().describe('content to post'),
    }),

    execute: async ({ calldata }) => {

        // // Play with the built in methods
        // const result = await client.v2.tweet(calldata);
        // console.log(JSON.stringify(result.data));
        // return `done: ${result.data.id}`;


           
        
        // mediaIds is a string[], can be given to .tweet
        const result = await client.v2.tweet({
            text: calldata
        });
        return `Posted at: https://x.com/${process.env.X_HANDLE}/status/${result.data.id}`;

    },
  },
];

export const xAgent = createAgent({
  id: 'X_Agent',
  model: openai('gpt-4o-2024-08-06', { structuredOutputs: true }),
  system: `
    You can use the execute tools to post tweets on twitter or x.
    You should attempt to resolve the user's request based on the tools you have available.
    If the customer is unsure, you should return to triage agent.
  `,
  tools: xTools,
});
