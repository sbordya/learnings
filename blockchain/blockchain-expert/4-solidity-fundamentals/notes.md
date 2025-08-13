# Module Summary: Ethereum Smart Contracts Development

## 1. MetaMask Setup

- **MetaMask**: Browser extension and mobile app that provides a cryptocurrency wallet.
- Used to send/receive ETH and interact with decentralized applications (DApps).
- Password encrypts your wallet locally; it is **not** your private key.
- Private key/seed phrase must be backed up securely.

## 2. Remix IDE

- **Remix**: Web-based Integrated Development Environment for writing, testing, and deploying smart contracts in Solidity.
- Provides syntax highlighting, compilation, and debugging tools.
- Allows deploying to test networks or Ethereum mainnet.

## 3. Your First Smart Contract

- A minimal Solidity contract includes:
  - `pragma solidity` version declaration
  - Contract definition with state variables and functions
- Example: A simple storage contract that saves and retrieves a number.

## 4. Smart Contract Theory

- Smart contracts are immutable once deployed.
- Code is public and verifiable.
- Execution is triggered by transactions.

## 5. Deploying Smart Contracts

- Deploy via Remix, MetaMask, or scripts (e.g., Hardhat, Truffle).
- Deployment costs gas.
- Must specify constructor parameters if required.

## 6. Data Types

- **Value types**: `uint`, `int`, `bool`, `address`
- **Reference types**: arrays, structs, mappings
- Strings and bytes for text and raw data.

## 7. Operators & Type Conversions

- Arithmetic, comparison, logical, and bitwise operators.
- Implicit and explicit type conversions — explicit requires `type(value)` syntax.

## 8. Conditionals

- `if`, `else if`, `else` statements for branching logic.
- Conditional expressions with the ternary operator `condition ? a : b`.

## 9. Mappings

- Key-value storage structures in Solidity.
- Syntax: `mapping(keyType => valueType)`.
- Keys are not enumerable.

## 10. Functions and Access Modifiers

- Functions can be `public`, `private`, `internal`, `external`.
- State mutability: `view`, `pure`, `payable`.
- Access control can be implemented with modifiers.

## 11. Global Keywords

- `msg.sender`: Address of the caller.
- `msg.value`: Amount of ETH sent with the transaction.
- `block.timestamp`: Time of the current block.

## 12. Sending and Receiving ETH

- Functions marked `payable` can receive ETH.
- ETH can be sent using:
  - `transfer` (reverts on failure)
  - `send` (returns `bool`)
  - `call` (recommended in modern Solidity)

## 13. Exceptions and Errors

- `require`: Validates conditions and refunds remaining gas.
- `revert`: Immediately stops execution and reverts state.
- `assert`: Used for internal checks; consumes all gas on failure.

## 14. Constructors

- Special function run only once during deployment.
- Used to initialize state variables.

## 15. Self Destruct

- `selfdestruct(address)` removes contract code from the blockchain and sends remaining ETH to the given address.

## 16. Events

- Used for logging and emitting data for off-chain consumption.
- Declared with `event` keyword and triggered with `emit`.

## 17. Arrays

- Fixed-size or dynamic.
- Support indexing, `push`, `pop` operations.

## 18. Strings

- UTF-8 encoded text data.
- Comparison requires hashing (`keccak256`).

## 19. Loops

- `for`, `while`, `do while`.
- Gas limits make unbounded loops risky.

## 20. Gas Cost and Estimation

- Gas measures computational work; paid in ETH.
- High-complexity operations (e.g., writing to storage) consume more gas.
- Gas estimation tools in Remix or libraries (web3.js, ethers.js) can predict cost before sending a transaction.
