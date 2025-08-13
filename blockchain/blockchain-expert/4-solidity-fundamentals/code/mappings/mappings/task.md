# Mappings

Write a smart contract named `Inventory` that declares a state variable named `quantities` that holds a `mapping` of `uint` to `int`. Each `uint` key will represent the id of a specific item, while each `int` value will be the quantity of that item in the inventory.

Implement the following functions in this smart contract. Do NOT change any of the function signatures.

- `addItem(uint itemId, uint quantity)`: Adds an item to the inventory by adding it to the `quantities` mapping. If the `itemId` already exists in the mapping it should increment the value associated with the `itemId` key by the passed quantity.
- `getQuantity(uint itemId) returns (int)`: Returns the quantity of the passed `itemId` that is currently stored in the `quantities` mapping. If there is no item with the given `itemId` it should return `-1`.
