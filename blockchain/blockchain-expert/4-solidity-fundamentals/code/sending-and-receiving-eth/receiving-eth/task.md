# Receiving Ethereum

Write a smart contract named `Balances`. This contract should track the amount of ether received from any address that sends ether to the contract. To do this implement both a `receive` and `fallback` function as well as a `getAmountSent` function as described below.

- `getAmountSent(address addr)`: returns the amount of ether in `wei` that `addr` has sent to the contract.

Make sure to use the correct visibility modifiers for all your functions and state variables.
