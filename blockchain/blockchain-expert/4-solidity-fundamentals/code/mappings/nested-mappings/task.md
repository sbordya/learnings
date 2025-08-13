# Nested Mappings

Write a smart contract named `DebtTracking` that declares a state variable `owing` which is of the type `mapping(address => mapping(address => uint))`. This nested mapping maps the addresses of people who are owed money with a mapping containing all of the addresses that owe this user money, and how much they owe. See below for an example.

If address `0x9bE29F2c838e646D809eCE62AC60da923C94806a` is owed `5 ether` from `0x86e382f34dEe09944C3bfe172095E95D5bb76e62` and `7 ether` from `0xa08F73261A7A1f533A50CB1DcfFEd9594b623FF5` then the mapping would look like this:  
`0x9bE29F2c838e646D809eCE62AC60da923C94806a: {0x86e382f34dEe09944C3bfe172095E95D5bb76e62: 5, 0xa08F73261A7A1f533A50CB1DcfFEd9594b623FF5: 7}`.

Complete the following functions on this smart contract.

- `addDebt(address toBePaidAddress, address payingAddress, uint amount)`: Adds the correct entry in the mapping to indicate that `payingAddress` owes `toBePaidAddress` `amount` ether.
- `payDebt(address toBePaidAddress, address payingAddress, uint amountPayed)`: updates the mapping accordingly to reduce the amount of debt owed by `payingAddress` to `toBePaidAddress` by the `amountPayed`. If `amountPayed` is greater than the amount that was owed then update the mapping accordingly such that `toBePaidAddress` owes `payingAddress` the difference/change.
- `getDebt(address toBePaidAddress, address payingAddress)`: returns the amount of ether that `payingAddress` owes `toBePaidAddress`.
