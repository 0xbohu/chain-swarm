import 'dotenv/config';
import { triageAgent } from '../triage/triageAgent';
import { brianAgent } from '../brian/brianAgent';
import { starknetAgent } from '../starknet/starknetAgent';
import { xAgent } from '../x/xAgent';
import { runDemoLoop } from '../run';

const allAgents = [
  triageAgent,
  brianAgent,
  starknetAgent,
  xAgent
];

// Let all agents transfer to each other
allAgents.forEach((agent) => {
  const otherAgents = allAgents.filter((a) => a.id !== agent.id);
  agent.tools.push(...otherAgents);
});

runDemoLoop({
  initialAgent: triageAgent,
});
