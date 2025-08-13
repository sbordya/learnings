# Ether Election 🟢

Write a smart contract named `EtherElection` that allows users to vote for the "Ether King". This smart contract will go through three main phases, namely, candidate enrollment, voting and rewards/payouts.

During the first phase users that wish to run for election will need to submit exactly `1` Ethereum. Once three users have enrolled as candidates the enrollment phase will end and the voting phase will start.

During the voting phase users will be able to submit a vote for one of the three candidates. Users that wish to vote will have to pay a fee of exactly `10,000 wei`. This fee will be non-refundable and held in the balance of the smart contract. Once any candidate receives exactly `5` votes they will be declared the winner and the voting phase will end.

In the final phase (once the winner has been declared) the winner will be able to withdraw `3` Ethereum from the contract as their prize for winning. Once the winner has withdrawn their prize the contract can be destroyed by the owner/deployer who should collect all of the fees paid by voters.

To implement this functionality write the following functions.

- `enroll()`: a function that allows exactly three users to enroll as candidates. If the caller of the function is not already a candidate and submits exactly `1` Ethereum they should be added as a candidate. This function should fail if it is not sent exactly `1` Ethereum or if all candidates have already been chosen.

- `vote(address candidate)`: this function should allow any users to vote for their favorite candidate by sending the correct fee of `10,000 wei`. Each user should only be allowed to vote one time. This function should fail if it does not receive exactly `10,000 wei`, if the user has already voted, if the address the user votes for is not a candidate or if the voting phase is done.

- `getWinner()`: this function should return who the winner of the election was. If the winner has not yet been decided this function should fail.

- `claimReward()`: this function should only be callable by the winner of the election and should send the winner `3` Ethereum when called. This function should fail if the winner has not yet been decided, if the winner has already received their reward or if it is called by an address that is not the winner.

- `collectFees()`: this function should destroy the smart contract, erasing it's state. It should send the remaining smart contract balance to the deployer/owner of the contract. This function should fail if it is called before the winner has been declared or if the winner has not withdrew their reward. Only the owner/deployer of the contract should be able to call this.

Note: candidates are allowed to vote and they may vote for themselves.
