# Multiple Depositors

Complete the smart contract `Competitors` that only accepts deposits from the first two addresses to send Ethereum to the contract. Each depositor should only be able to send exactly `1` ether to the contract at a time. Once the smart contract has received `3` ether from the depositors the depositor who deposited the most ether should be able to withdraw `3` ether from the contract.

Complete this smart contract by implementing the following functions, as well as writing the appropriate constructor. Ensure your smart contract is secure from `fallback` function exploits.

- `deposit()`: a payable function that only allows the first two addresses to call the function to deposit funds to the smart contract. The first two depositors should be able to deposit multiple times. The only accepted deposit amount is `1` ether. Once the sum of the deposits totals `3` ether no more deposits should be accepted.
- `withdraw()`: allows the depositor who deposited the most ether to withdraw `3` ether. This function should only be callable once the contract has received exactly `3` ether.
- `destroy()`: If the depositor that deposited the most ether has withdrew their funds this function should call `selfdestruct` and send the smart contract balance to the address who deployed it. This function should only be callable by the address that deployed the smart contract.

You may add as many state variables as necessary but do **not** add any functions.
