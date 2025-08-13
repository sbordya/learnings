# Advanced Counter 🟢

Write a smart contract named `AdvancedCounter` that allows multiple users to keep track of their own independent counters. Each counter will be represented by a `string` id and will be specific to each user/account that interacts with the smart contract. Each user should have a limit of `3` counters. Each counter should store an `int` value.

For example, account with address `0xabc...` may have three counters with ids `"a"`, `"b"`, `"c"`. Each counter should be able to be manipulated independently of all other counters by using the functions below. To clarify, if another address, say `0xbb...`, had a counter with id `"a"` this would be a separate counter from the counter with id `"a"` that is controlled by `0xabc...`. Each address should only be able to control their own counters.

To write this smart contract implement the functions defined below.

- `createCounter(string id, int value)`: this function should set the counter with the passed `id` to that passed `value` for the address that called this function. This function should fail if the user already has `3` counters (the maximum allowed) or if the passed counter `id` already exists for this user.

- `deleteCounter(string id)`: this function should delete the counter with the passed `id` for the address that called this function. After the deletion the address should be able to create another counter with the same or a new id. This function should fail if called with an `id` for a counter that does not exist.

- `incrementCounter(string id)`: this function should increment the counter with the passed `id` by `1` for the address that called this function. This function should fail if called with an `id` for a counter that does not exist (i.e., it has not been created yet or it was deleted).

- `decrementCounter(string id)`: this function should decrement the counter with the passed `id` by `1` for the address that called this function. This function should fail if called with an `id` for a counter that does not exist (i.e., it has not been created yet or it was deleted).

- `getCount(string id)`: this function should return the value of the counter with the passed `id` for the address that called this function. This function should fail if called with an `id` for a counter that does not exist (i.e., it has not been created yet or it was deleted).

You are welcome to create any additional functions and use as many storage variables as you deem necessary.
