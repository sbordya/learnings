pragma solidity >=0.4.22 <=0.8.17;

contract ShoppingList {
    struct Items {
        string[] itemsNames;
        mapping(string => bool) existingItems;
        mapping(string => uint) itemQuantities;
    }
    
    struct Lists {
        string[] listsNames;
        mapping(string => bool) existingLists;
        mapping(string => Items) listItems;
    }
    
    mapping(address => Lists) shoppingLists;

    function createList(string memory name) public {
        require(bytes(name).length > 0, "list name can't be empty");
        require(!shoppingLists[msg.sender].existingLists[name], "list already exists");
        shoppingLists[msg.sender].existingLists[name] = true;
        shoppingLists[msg.sender].listsNames.push(name);
    }

    function getListNames() public view returns (string[] memory) {
        return shoppingLists[msg.sender].listsNames;
    }

    function getItemNames(string memory listName)
        public
        view
        returns (string[] memory)
    {
        require(shoppingLists[msg.sender].existingLists[listName], "list doesn't exist");
        return shoppingLists[msg.sender].listItems[listName].itemsNames;
    }

    function addItem(
        string memory listName,
        string memory itemName,
        uint256 quantity
    ) public {
        require(shoppingLists[msg.sender].existingLists[listName], "list doesn't exist");
        shoppingLists[msg.sender].listItems[listName].itemQuantities[itemName] += quantity;
        if (!shoppingLists[msg.sender].listItems[listName].existingItems[itemName]) {
            shoppingLists[msg.sender].listItems[listName].existingItems[itemName] = true;
            shoppingLists[msg.sender].listItems[listName].itemsNames.push(itemName);
        }
    }
}
