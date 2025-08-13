# Voting

Write a smart contract named `Voting` that allows people to vote for their favorite number. Each person only gets one vote and must vote for a number in the range of `1 - 5` (inclusive). Your contract should keep track of the number of votes for each number and be able to determine which number has the most number of votes.

To write this smart contract implement the following methods.

- `getVotes(uint8 number)`: returns the number of votes for the passed `number`. If `number` is not in the range of `1-5` this function call should fail.
- `vote(uint8 number)`: allows a user to vote for the passed `number`. This function call should fail if the user has already voted or they pass an invalid number.
- `getCurrentWinner()`: this function should return the number that currently has the most votes. If two numbers have the same number of votes it should return the number that received the most recent vote. If no numbers have received any votes this function should return `1`.
