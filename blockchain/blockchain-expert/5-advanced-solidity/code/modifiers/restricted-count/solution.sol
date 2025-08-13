pragma solidity >=0.4.22 <=0.8.17;

contract RestrictedCount {
    address owner;
    int count;

    constructor() {
        owner = msg.sender;
    }
    
    modifier ownerModifier {
        require(msg.sender == owner, "you are not the owner");
        _;
    }

    modifier operationModifier(int value) {
        require(value >= -100 && value <= 100);
        _;
    }

    function getCount() public view ownerModifier returns (int) {
        return count;
    }

    function add(int value) public ownerModifier operationModifier(count + value) {
        count += value;
    }

    function subtract(int value) public ownerModifier operationModifier(count - value) {
        count -= value;
    }
}