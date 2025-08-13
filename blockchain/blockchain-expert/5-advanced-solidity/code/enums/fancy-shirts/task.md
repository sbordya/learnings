# Fancy Shirts

Write a smart contract named `FancyShirts` that allows users to purchase different types of shirts. When purchasing shirts users will enter their preferred color and size and must send the exact amount of ether according to the price of their selection. If a purchase is successful then the user's shirt will be added to their closet which will be stored in the smart contract.

The valid sizes of shirt are Small, Medium and Large, while the valid colors are Red, Green and Blue. Small shirts cost 10 wei, Medium cost 15 wei and Large cost 20 wei. The standard shirt color is Red which comes at no additional cost, selecting either Green or Blue adds an additional 5 wei to the price. To represent the options above create a `Size` and `Color` enum that contain the options in the order they were listed (i.e., use the order Small, Medium, Large and Red, Green, Blue). Make sure the order of your options are correct otherwise your contract will fail the automated tests.

To complete this smart contract write the following `public` functions.

- `getShirtPrice(Size size, Color color)`: a function that returns the price of buying a shirt (in wei) with the given `size` and `color`.
- `buyShirt(Size size, Color color)`: a payable function that allows a user to purchase a shirt with the given `size` and `color`. This function should fail if the user does not send exactly the correct amount of ether corresponding to the price of the shirt.
- `getShirts(Size size, Color color)`: a function that returns the number of shirts the calling user has purchased that match the passed `size` and `color`.

**Hint:** it may be useful to use a struct to keep track of shirts users have purchased.
