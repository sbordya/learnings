# Comparable Interface

Write an interface named `Comparable` that declares the following abstract functions.

- `greaterThan(Comparable other)`: a function that returns a `bool` representing whether the calling contract is greater than the `other` contract.
- `lessThan(Comparable other)`: a function that returns a `bool` representing whether the calling contract is less than the `other` contract.
- `equalTo(Comparable other)`: a function that returns a `bool` representing whether the calling contract is equal to the `other` contract.
- `getValue()`: a function that returns an `int` value.

After writing this contract modify the `Vector` contract such that it implements the interface. Use the already provided `getValue()` function to determine the value of a vector when comparing them. For example, Vector `A` is greater than Vector `B` if `A.getValue()` returns a larger value than `B.getValue()`.

**Note:** you can override an external function with a public function.  
**Note 2:** there are no automated tests for this question. Please check your answer against the provided solution.
