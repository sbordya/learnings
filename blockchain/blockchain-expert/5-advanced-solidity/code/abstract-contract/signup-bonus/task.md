# Sign Up Bonus

Write an abstract contract named `SignUpBonus` that acts like a bank account, allowing users to deposit and withdraw funds. It should keep track of the balances of each depositor and incentivize users to deposit funds by providing a sign up bonus. This contract should implement the following functions.

- `getBonusAmount()`: an internal abstract function that returns a `uint` representing the sign up bonuses users should receive. This function must be implemented by any child/derived contracts.
- `getBonusRequirements()`: an internal abstract function that returns a `uint` representing the minimum deposit amount required to receive a sign up bonus. This function must be implemented by any child/derived contracts.
- `deposit()`: a public payable function that allows a user to deposit any amount of ether. If this is the user's first deposit and they deposit an amount greater than or equal to the requirement returned from `getBonusRequirement()` they should receive a sign up bonus equivalent to that returned by `getBonusAmount()`. This sign up bonus should simply be added to their account balance that is tracked by the smart contract.
- `withdraw(uint amount)`: a public function that allows a user to withdraw the specified `amount`. This function should fail if the user attempts to withdraw more funds then they have available. If the user passes a valid `amount` their balance should be adjusted accordingly and they should be sent the specified funds.
- `getBalance()`: a public function that returns the balance of the caller as a `uint`.

You may assume that this contract will always have a sufficient balance to handle sign up bonuses. You do not need to write a `receive` or `fallback` function.

After writing the `SignUpBonus` contract write a contract named `Bank` that inherits from `SignUpBonus` and implements the abstract functions. This contract should give a sign up bonus of `150 wei` if the user's first deposit is at least `1000 wei`.

**Note:** Ensure that all your function names, visibility modifiers, parameters and return types are the same as specified above otherwise your code will not pass our automated tests.
