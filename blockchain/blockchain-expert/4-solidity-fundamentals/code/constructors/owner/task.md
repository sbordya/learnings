# Owner

Write a smart contract named `OnlyOwner` that only allows the address that deployed the smart contract to interact with it. If any address other than the owner tries to interact with the smart contract it should raise an exception/error. This smart contract should also contain a state variable that holds a `uint8` value that will be manipulated by the functions listed below. The starting value of the state variable should be `0`.

- `add(uint8 number)`: Adds `number` to the state variable (this function does not return anything).
- `subtract(uint8 number)`: Subtracts `number` from the state variable (this function does not return anything).
- `get()`: returns the value of the state variable keeping track of the `uint8` value.

Use the correct visibility modifiers and ensure only the owner of the contract can use the functions listed above. You may assume your functions will never encounter an overflow or underflow.
