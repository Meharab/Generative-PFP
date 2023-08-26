# [WEB LINK](https://generative-pfp.vercel.app/)

## Requirements 
install `node` in your system

## Instruction on how to run this Project 
Clone this project on your system
``` shell
cd frontend
nom install
npm run dev
```
or
``` shell
cd frontend
yarn
yarn dev
```

## Description
It's a multichained dapp where users can 🥫 mint an NFT for 0.001 ETH on Ethereum, Arbitrum or Avalanche C-Chain. Users who have registered on ENS can see their's domain name instead of wallet address. 

## Inspiration
I was always wanted to build a game with blockchain but a proper game takes a lot of resources, time and knowledges. After learning ChainLink VRF, I thought this game might be the easiest implementation.

## What it does
This game basically picks a random Winner among a number of players. The host determines entry fees and max number of player. After the join of all the player with entry fees the game starts and picks a winner. The winner gets all the entry fees of other players including his.

## How we built it
The smart contract is built with Solidity, Hardhat, OpenZeppelin and deployed on Polygon network. For node provider service Quick Node is been used. As for the the frontend Next.js framework and ether.js are been used and Web3Modal is used for set up the wallet. 

## Challenges we ran into
We all know blockchain is very deterministic in nature. So, randomness is a very big issue for Blockchain but thanks to ChainLink VRF function by which blockchain can communicate with outside data. Also implementing the graph is very big challenging too. It was very important to catching all the events from blockchain. So that it can be rendered on front-end.

## Accomplishments that we're proud of
We know traditional "winner gets all" type of game generally have problems like lengthy process to get the prize, trust issues etc. So, proud of being able to solve that problem because this project is fast, reliable, trustworthy and fully automated. And also Proud of being able to implement ChainLink VRF functionality and the Graph. Also it's deployed on Polygon Network, so the gas price will be very low and as the same time it's secure.

## What we learned
Learned about 
* how to use ChainLink VRF for randomness oriented problem
* the Graph api for catching on chain events and rendering them on front-end
* how to use external smart contract in solidity
* next.js framework with ether.js 
* implementation of web3modal
* setting up QuickNode provider
etc.

## What's next for Random Winner Game
There are couple of things that are next for this project e.g.
* Implementing ERC-4337 Account Abstraction
* Deploying this project on other EVM & non EVM networks
etc.

## Presentation 
- [Loom](https://www.loom.com/share/53d33bfd7bb446659d810a0ad05d4fc1)
- [YouTube](https://youtu.be/ys7TiuJOKEU)
