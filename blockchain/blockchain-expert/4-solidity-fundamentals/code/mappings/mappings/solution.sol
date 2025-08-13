pragma solidity >=0.4.22 <=0.8.17;

contract Inventory {
    mapping(uint => int) quantities;

    function addItem(uint256 itemId, uint256 quantity) public {
        quantities[itemId] += int(quantity);
    }

    function getQuantity(uint256 itemId) public view returns (int256) {
        return quantities[itemId] == 0 ? -1 : quantities[itemId];
    }
}
