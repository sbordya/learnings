# Module Summary: JavaScript for Blockchain Development

## 1. JavaScript Environment Setup

- Install **Node.js** and **npm** (Node Package Manager).
- Use a code editor like **Visual Studio Code**.
- Install necessary extensions (JavaScript/ES6, Solidity, Prettier).
- Initialize a project with `npm init` and install dependencies.

## 2. JavaScript Crash Course

- **Variables**: `let`, `const`, `var`.
- **Data types**: strings, numbers, booleans, arrays, objects.
- **Functions**: declarations, expressions, arrow functions.
- **Control structures**: if/else, loops, switch.
- **Objects & Arrays**: property access, destructuring.

## 3. Asynchronous Programming with JavaScript

- **Promise**: an object representing a future value, resolved or rejected.
  - Handle with `.then()`, `.catch()`, `.finally()`.
- **Async/Await**: syntactic sugar for handling promises; `await` pauses until resolution.
- **Error handling**: try/catch with async code.

## 4. Introduction to Ethers.js

- A JavaScript library for interacting with Ethereum.
- Features:
  - Connect to Ethereum nodes via JSON-RPC, Etherscan, Infura, etc.
  - Manage wallets and keys.
  - Deploy and interact with smart contracts.
  - Listen for blockchain events.
- Installation: `npm install ethers`.

## 5. JavaScript Environment Variables

- Store sensitive information (e.g., private keys, API URLs) in `.env` files.
- Access using `process.env.VARIABLE_NAME`.
- Use the `dotenv` package to load variables into `process.env`.

## 6. Querying the Blockchain

- Use `ethers.js` providers to read data from the blockchain.
- Examples:
  - `provider.getBlockNumber()`
  - `provider.getBalance(address)`
  - `provider.getTransaction(txHash)`

## 7. Sending Transactions

- Create a wallet object with a private key.
- Use `wallet.sendTransaction({...})` to send ETH or interact with contracts.
- Must include gas limit, gas price, and nonce.

## 8. Interacting with Smart Contracts

- Load contract ABI and address.
- Call read functions (no gas) and write functions (cost gas).
- Listen for emitted events using contract.on(eventName, callback).
- Create contract instance:

```js
const contract = new ethers.Contract(address, abi, signerOrProvider);
```
