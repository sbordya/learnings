# Shopping List

Write a smart contract named `ShoppingList` that allows users to create and keep track of their shopping list. To complete this smart contract create multiple structs (as you deem necessary) and implement the following functions.

Each user that interacts with the `ShoppingList` contract should be able to have multiple shopping lists. Each shopping list should be accessible using a `string` name. Each shopping list should be able to store multiple items. Each item will have a name and a quantity.

- `createList(string memory name)`: creates a new shopping list for the user calling the function. If the list name passed is empty or it already exists this function should fail.
- `getListNames()`: returns a `string` array containing the names of all the lists the calling user has.
- `addItem(string memory listName, string memory itemName, uint itemQuantity)`: adds an item with the specified name and quantity to the specified list. This function should fail if the given `listName` does not exist.
- `getItemNames(string memory listName)`: returns a `string` array containing the names of all of the items in the specified list. This function should fail if the list with the given name does not exist.

**Hint:** converting strings to bytes and checking if the length of the bytes object is 0 can be a good way to determine if a string is empty.
