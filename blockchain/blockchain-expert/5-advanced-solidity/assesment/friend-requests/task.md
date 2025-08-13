# Friend Requests 🟢

Write a smart contract named `Friends` that allows users to send and accept friend requests. The following are rules this smart contract should adhere to.

- A user cannot cannot send more than one friend request to the same address.
- A user cannot send a friend request to a user that has sent them a friend request.
- A user cannot send a friend request to a user they are already friends with.
- A user cannot accept a friend request that doesn't exist or that they have already accepted.
- A user cannot send a friend request to themselves.

Use advanced solidity features like modifiers and structs when implementing the functions defined below.

- `getFriendRequests()`: returns `address[]` containing the addresses of users that have sent this user a request that they have yet to accept (i.e., don't return accepted requests).
- `getNumberOfFriends()`: returns a `uint` value representing the number of friends the calling user has.
- `getFriends()`: returns `address[]` containing the addresses of the calling users friends.
- `sendFriendRequest(address friend)`: sends a friend request to the provided `address`.
- `acceptFriendRequest(address friend)`: accepts a pending friend request.

Make sure all of the functions above are `public` and have the correct signature. You may add as many other functions, types, structs, enums etc. as you like.
