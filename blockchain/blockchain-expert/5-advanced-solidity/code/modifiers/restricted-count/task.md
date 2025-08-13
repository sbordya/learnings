# Restricted Count

Write a smart contract named `RestrictedCount` that allows the owner/deployer of a smart contract to manipulate the value of a count variable. This contract should simply keep track of a count. The count should start at zero and have a maximum value of `100` and a minimum value of `-100`. Use modifiers to check all preconditions on the functions listed below.

To complete this smart contract implement the following functions. Ensure each function you write is `public`, has the same name, same parameters and same return values as what is specified below. Recall, these functions should only be callable by the owner/deployer of the contract.

- `getCount()`: a function that returns an `int` representing the current count.
- `add(int value)`: a function that adds the passed `value` to the count. This function should fail if adding the `value` causes the count to be greater than the maximum or less than the minimum value.
- `subtract(int value)`: a function that subtracts the passed `value` from the count. This function should fail if subtracting the `value` causes the count to be greater than the maximum or less than the minimum value.
