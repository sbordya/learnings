# Module Summary: Solidity Advanced Concepts

## 1. Math and Arithmetic

- Solidity supports integer types (`uint`, `int`) of various bit lengths (e.g., `uint8`, `uint256`).
- No floating-point numbers are implemented as of Solidity 0.8.17.
- **Arithmetic operations**: addition `+`, subtraction `-`, multiplication `*`, division `/`, modulo `%`.
- **Overflow/underflow**:
  - Pre-0.8.0: values wrap around without reverting.
  - 0.8.0 and later: checked arithmetic reverts on overflow/underflow by default.
- Use `unchecked { ... }` to disable overflow checks when safe.

## 2. Time and Time Units

- Solidity supports time units:
  - `seconds`, `minutes`, `hours`, `days`, `weeks`.
- Example: `1 days` equals `86400` seconds.
- **`block.timestamp`** returns the timestamp of the current block.

## 3. Structs

- Custom data types that group variables.
- Can be stored in storage, memory, or passed between functions.
- Example:
  ```solidity
  struct Person {
      string name;
      uint age;
  }
  ```

## 4. Modifiers

- Functions that change the behavior of other functions.
- Often used for:
  - Access control (e.g., onlyOwner)
  - Preconditions (require)
- Example:

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

## 5. Enums

- User-defined type for a finite set of constants.
- Example:

```solidity
enum Status { Pending, Shipped, Delivered }
```

## 6. Inheritance

- Solidity supports single and multiple inheritance.
- Function overriding requires virtual in the base contract and override in the derived contract.
- Use is keyword:

```solidity
contract Child is Parent { ... }
```

## 7. Abstract Contracts

- Contracts with at least one function without an implementation.
- Cannot be deployed directly.
- Serve as templates for derived contracts.

## 8. Interfaces

- Define function signatures without implementation.
- Functions are implicitly external and virtual.
- Cannot have state variables or constructors.

## 9. Libraries

- Reusable pieces of code that can be linked to contracts.
- Two types:
  - Deployed libraries: deployed separately and linked.
  - Embedded libraries: copied into the contract’s bytecode.

## 10. Contract Storage

- Storage: Persistent data stored on-chain.
- Memory: Temporary data storage during execution.
- Calldata: Non-modifiable, temporary data for function inputs.

## 11. Optimizing Gas Costs

- Minimize storage writes — they are the most expensive operations.
- Use smaller integer types only when packed in a struct to save space.
- Use calldata for external function parameters instead of memory when possible.
- Avoid unnecessary computations and loops.
