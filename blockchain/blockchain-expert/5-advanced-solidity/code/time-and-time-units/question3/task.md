# Question 3

Write a contract named `TimedAuction` that runs an auction for exactly 5 minutes. Once the 5 minutes has passed the winner of the auction can be determined and the owner/deployer of the contract can claim the winning bid. The 5 minute "timer" should start immediately after the contract is deployed. To complete this smart contract write the following functions and emit the following events.

## Functions

- `bid()`: a payable function that accepts a bid from a user. This function should fail if the bid is less than or equal to the current bid or if the auction is over. If a bid is valid it should emit the `Bid` event. Note that since each bid is unique a user could outbid themselves by sending a larger amount, in that case they should be able to withdraw their previous bid amount(s).
- `withdraw()`: allows a user to withdraw any bid amounts they have sent that is not currently the highest bid.
- `claim()`: this function should destroy the contract and send the winning bid amount to the owner/deployer of the contract. This function should fail if called by anyone other than the owner/deployer or if the auction has not yet ended. This function should also fail if all users have not yet withdrawn their previous bids.
- `getHighestBidder()`: this function should return the address of the current highest bidder.

## Events

- `Bid(address indexed sender, uint256 amount, uint256 timestamp);`
