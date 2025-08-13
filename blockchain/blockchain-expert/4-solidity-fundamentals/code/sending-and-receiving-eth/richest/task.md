# Richest

Write a smart contract named `Richest` that keeps track of the user who has sent the most ether to the contract. Every time a new user becomes the "richest" the Ethereum sent by the previous richest user should be refunded to that user. When the contract is first deployed the richest user should be the zero address.

Be sure to implement the withdrawal pattern such that no re-entrance attack is possible.

To implement this functionality complete the following functions on this smart contract.

- `becomeRichest`: a function that accepts ether and updates the richest user if they have sent more Ethereum than the previous richest user. This function should return `true` if the user successfully became the richest, otherwise it should return `false`. If a user sends Ethereum to this function and does not become the richest they should **not** be refunded their Ethereum or be able to withdraw it.
- `withdraw`: a function that allows users who were previously the richest to withdraw their funds. The current richest user should not be able to withdraw any funds. Be sure to protect against re-entrance attacks.
- `getRichest`: a function that returns the address of the current richest user.

Make sure to use the correct visibility modifiers for your functions such that they are callable from outside of the contract. You may declare any state variables you like/need.

You do not need to handle edge case scenarios like if the richest user sends multiple sets of transactions to the smart contract while they are still the richest user.

Note: This example is a variation of the `WithdrawlContract` shown in the official Solidity documentation.
