pragma solidity >=0.4.22 <=0.8.17;

contract FancyShirts {
    enum Size {
        Small,
        Medium,
        Large
    }

    enum Color {
        Red,
        Green,
        Blue
    }

    struct Shirt {
        Size size;
        Color color;
    }

    mapping(address => mapping(Size => mapping(Color => uint))) customerShirts;
    
    function getShirtPrice(Size size, Color color) public pure returns (uint) {
        uint8 sizePrice = size == Size.Large ? 20 : size == Size.Medium ? 15 : 10;
        uint8 colorPrice = color == Color.Red ? 0 : 5;
        return sizePrice + colorPrice;
    }

    function buyShirt(Size size, Color color) public payable {
        uint price = getShirtPrice(size, color);
        require(msg.value % price == 0, "price is not correct");
        customerShirts[msg.sender][size][color] += msg.value / price;
    }

    function getShirts(Size size, Color color) public view returns (uint) {
        return customerShirts[msg.sender][size][color];
    }
}
