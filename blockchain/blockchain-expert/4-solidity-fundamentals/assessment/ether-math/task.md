# Ether Math 🟢

Write a smart contract named `EtherMath` that provides mathematical challenges for users. If a user successfully solves the mathematical challenge they will receive the reward provided by the creator of the challenge.

The owner/deployer of the contract will submit an array of integers and a single integer representing a desired sum. They will also send a non-zero amount of ether to provide as a reward. The goal for participants will be to determine which values from the array to use to create the sum (this is the challenge). You may assume all challenges submitted will always have at least one valid solution.

Once the array of integers, sum and reward have been submitted any participant may attempt to solve the challenge by submitting their solution. Their solution will simply be an array containing integers found in the original array that sum to the target sum. They may reuse integers from the array. Each user should only receive one guess/submission per challenge.

If a user submits the correct solution they should be able to withdraw the provided reward and the contract should reset, allowing the owner to submit another challenge and users to guess the answer for this new challenge. Only one user can receive the reward for submitting the correct answer and users can only submit answers if a challenge has been set.

To write this smart contract implement the following functions. These functions should adhere to the behavior defined above.

- `submitChallenge(int[] memory array, int targetSum)`: a function that allows the owner to set a challenge. This function can only be called when no challenge has been set or the previous challenge has been solved. This function should fail if it is called by someone who is not the owner or if the owner fails to send a non-zero ether reward.

- `submitSolution(int[] memory solution)`: this function should allow each user to submit exactly one solution for the current challenge. If a user submits the correct solution the challenge should reset and they should be able to withdraw the reward for this challenge. This function should fail if called by a user that has already submitted a solution for the current challenge or if no challenge is set.

- `claimRewards()`: this function should allow users to claim any rewards they have received (from one or multiple challenges) by sending them the reward ether amount.
