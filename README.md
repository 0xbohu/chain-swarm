# CHAIN-SWARM ⛓️-🐛

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

CHAIM-SWARM is a repository for implementing [OpenAI Swarm API](https://github.com/openai/swarm) framework. The purpose of project is to experiment multi-agents orchestration to build a seamless experience between web2 and web3 AI agents.

## Features

- **Minimal Interface**: `createAgent`in specific code structure and add to swarm list.
- **Multi-Agent System**: Create and manage multiple AI agents with different roles and capabilities, with a focus on web3 knowledge base, code generation, construct transaction callData, execute tx onchain (Starknet), and connection to web2 application(twitter)
- **Flexible Agent Configuration**: Easily define agent behaviors, instructions, and available functions.
- **Task Delegation**: Agents can transfer tasks to other specialized agents.
- **Tools**: Agents can use tools to perform tasks.
- **Zod Validation**: Tools can use zod validation to ensure the input is correct.
- **Model Choice**: Currently use `gpt-4o-2024-08-06` model and it is easy to switch between different LLMs by changing a single line of code.

## Examples

[All Agents](./examples/all/index.ts) has registered a list of available agents for this demo

- Triage Agent: a traffic controller agent to reroute user query to other agents, also try to answer user questions using OpenAI general knowledge bases
- Brian Agent: an agent leverage [Brian API](https://docs.brianknows.org/brian-api/apis) to answer user questions regarding blockchain `/knowledge` endpoint, providing contract code example via `/smart-contract` endpoint, or construct chain based tx callData via `/transaction` endpoint,
- Starknet Agent: an agent to execute raw callData for starknet transactions
- X Agent: an agent to post tweets on x.com

The result from the interaction with one agent, can be handed over to another agent to execute further instructions

## Installation

Use your preferred package manager:

```bash
pnpm add
```

Run the example:

```bash
npx tsx examples/all
```

## Demo

## Acknowledgements

- [Brian API](https://docs.brianknows.org/brian-api/apis)
- [StarknetJS](https://starknetjs.com/)
- [TS-SWARM](https://github.com/joshmu/ts-swarm)
- [Vercel AI SDK](https://github.com/vercel/ai)
- [Swarm API](https://github.com/openai/swarm)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) for details.
