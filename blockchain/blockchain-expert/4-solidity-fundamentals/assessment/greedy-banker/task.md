# Greedy Banker 🟢

Write a smart contract named `GreedyBanker` that acts as a bank account for users. It should allow users to deposit funds by sending ether directly to the contract address via the `receive` function and to withdraw their funds using a function you'll implement named `withdraw`. The catch is, the deployer of this smart contract is greedy and wants to collect a fee from users when they make a deposit.

Each address that deposits to the smart contract should get exactly one free deposit, afterwards a fee of `1000 wei` should be charged for each deposit. The fees collected by this smart contract should be stored such that the owner can withdraw/collect them at their convenience. If a user has used up their free deposit and attempts to send less money than `1000 wei` (the fee) their deposit should fail. All of this logic should be handled in the `receive` function.

If a user incorrectly sends funds (i.e., the transaction triggers the `fallback` function), all the funds received should be added to the current fees collected and become withdrawable by the owner/deployer of the contract.

As well as the functionality listed above, implement the following functions.

- `withdraw(uint amount)`: a function that allows users to withdraw funds. Assuming the amount they request to withdraw is valid they should be sent that amount. If the user attempts to withdraw more funds then they have available this function should fail. Withdrawals are free (i.e. they don't cost the user a fee).

- `getBalance()`: a function that returns the callers current withdrawable balance.

- `collectFees()`: a function that can only be called by the deployer/owner of the smart contract. This function should send the owner all received fees. Make sure this function is not exploitable.

Recall, every deposit costs the user `1000 wei`, make sure to adjust the users balance correctly to handle these fees.

Note: Make sure to protect against re-entrance attacks and other smart contract exploits.
