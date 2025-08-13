pragma solidity >=0.4.22 <=0.8.17;

contract Item {
    string itemName;
    uint itemPrice;
    
    constructor(string memory name, uint price) {
        itemName = name;
        itemPrice = price;
    }
    
    function getName() public view returns (string memory) {
        return itemName;
    }

    function getPrice() public virtual view returns(uint) {
        return itemPrice;
    }
}

contract TaxedItem is Item {
    uint itemTax;
    
    constructor(string memory name, uint price, uint tax) Item(name, price) {
        itemTax = tax;
    }

    function getPrice() public override view returns(uint) {
        return super.getPrice() + itemTax;
    }
}
