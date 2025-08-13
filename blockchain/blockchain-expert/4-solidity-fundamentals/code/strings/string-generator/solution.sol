pragma solidity >=0.4.22 <=0.8.17;

contract StringGenerator {
    bytes letters;
    mapping(address => bool) submitted;
    function addCharacter(string memory character) public {
        require(letters.length < 5, "max limit of 5 characters already submitted");
        require(!submitted[msg.sender], "you already submitted a letter");
        bytes memory letter = bytes(character);
        require(letter.length == 1, "string should be of one character");
        letters.push(letter[0]);
        submitted[msg.sender] = true;
    }

    function getString() public view returns (string memory) {
        return string(letters);
    }
}
