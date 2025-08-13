# TaxedItem

Write a base contract named `Item` and a child contract named `TaxedItem` that inherits from `Item`. The `Item` contract should represent a standard item and contain a constructor that requires a `string name` and a `uint price` be passed. This contract should store these values and implement the following functions.

## Functions for the `Item` contract

- `getName()`: a public function that returns the string name of the item.
- `getPrice()`: a public function that returns the `uint` price of the item. This function should be able to be overridden.

The `TaxedItem` contract should inherit from `Item` and contain a constructor that requires a `string name`, `uint price` and `uint tax`. It should properly call the parent constructor and override the `getPrice()` function to account for the fixed tax amount provided by the `tax` parameter passed to the constructor. To clarify, the price of a taxed item is simply the price plus the tax, both values will be passed through the constructor.

**Note:** make sure you use the exact names and types specified above otherwise your code will not pass our automated tests.
