# Largest Holders

Complete the smart contract named `LargestHolder` by implementing the functions defined below. This smart contract will be responsible for processing two large array structures, one containing `address`'s and the other containing `uint`'s. Each corresponding index will represent the balance of an arbitrary Ethereum account (i.e., index 1 in the `uint` array represents the balance of the address stored at index 1 in the `address` array). In order to process these large structures you will need to perform subcomputations and will require multiple transactions be sent to the contract.

The goal of this smart contract will be to determine the address of the two largest Ether holders using the passed arrays. The largest holder is the address that contains the largest corresponding value in the passed `uint` array.

When implementing these functions imagine you can do at most `10` iterations of a `for` or `while` loop for each provided transaction.

- `submitBalances(uint[] memory _balances, address[] memory _holders)`: this function must be called first, before any other function can be called. It should store the appropriate storage values (from the two arrays) and determine the number of transactions that will be required to process the structures (recall, you can only do 10 iterations per transaction). You may assume each address in the passed `_holders` array will be unique and that there will never be a tie for the largest holder. You may also assume the length of the the two passed arrays will be the same.
- `process()`: this function will be called multiple times to process the arrays passed to `submitBalances` and determine the addresses of the two largest holders. It should iterate through portions of the arrays (or other data structures you decide to create) and keep track of where it left off. Once the addresses of the largest holders have been determined this function should not be callable (i.e., it should fail when called). This function should raise an exception/error if called when the balances have not yet been submitted.
- `numberOfTxRequired()`: this function should return the **current** number of transactions still required to process the values passed to `submitBalances`. This function should raise an exception/error if called when the balances have not yet been submitted.
- `getLargestHolder`: this function should return the addresses of the largest holder. This function should raise an exception/error if called when the largest holders have not been determined or if the balances have not yet been submitted.

To solve this problem you will likely need to store multiple values in storage.
