# Friends

Write a smart contract named `Following` that keeps track of which addresses are following other addresses. The maximum amount of addresses one address can follow is `3`. Use a combination of the `mapping` and `address[]` array type to achieve this.

To complete this smart contract write the following functions.

- `follow(address toFollow)`: adds the `toFollow` address to the array of addresses the `msg.sender` is following if they are not already following `3` users. If `msg.sender` is already following the maximum number of addresses this function should raise an exception/error. It should be possible for one address to follow another address multiple times but an address should not be able to follow itself.
- `getFollowing(address addr)`: returns an array of addresses that the `addr` passed is following.
- `clearFollowing()`: removes all of the addresses that the `msg.sender` is following.

Use the correct visibility modifiers and any state variables you deem necessary.
