# String Generator

Write a smart contract named `StringGenerator` that allows users to collaboratively generate a string. The smart contract should implement the functions defined below such that each user may submit a single character to add to the string. Once the string reaches a length of `5` it should not allow any new character to be added.

- `addCharacter(string character)`: a function that accepts a single character and adds it to the existing `string`/`bytes` type stored in the contract. This function should raise an error/exception if a user submits a string that is not a single character, if the current string's length is `5` or if the user has already added a character.
- `getString()`: a public function that returns the current string stored in the contract. This function must return a `string`.

To implement these functions you will have to use a combination of both `string` and `bytes` types.

You may add as many state variables as necessary but do **not** add any functions.
