# Fizz Buzz 🟢

Write a smart contract named `FizzBuzz` that implements the famous Fizz Buzz algorithm, but with a twist. Rather than returning strings "Fizz" and "Buzz" you'll emit events.

The FizzBuzz problems is a famous algorithm style coding question where you are tasked to iterate through a sequence of integers and print "Fizz" if the integer is divisible by `3`, "Buzz" if divisible by `5` and "FizzBuzz" if the integer is divisible by both `3` and `5`.

For this question your contract will need to keep track of a count and emit custom events each time the count is changed. The events will be as follows.

- `Fizz(address sender, uint indexed count)`
- `Buzz(address sender, uint indexed count)`
- `FizzAndBuzz(address sender, uint indexed count)`

To implement this functionality define the events specified above and emit the correct one each time the count of the contract is changed. The count will be changed by calling the function defined below. Your function should emit a maximum of one event per call.

- `increment()`: this function should simply increment the internal count of the contract by one and emit the correct event based on the **new** value of the count. For example, if the count before calling the function is `2` then the function would change the count to `3` and emit `Fizz`. If the new count is not divisible by `3` or `5` no event should be emitted.

Note: the count should start at `0`.
