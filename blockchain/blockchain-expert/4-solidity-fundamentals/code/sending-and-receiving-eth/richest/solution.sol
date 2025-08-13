pragma solidity >=0.4.22 <=0.8.17;

contract Richest {
    address richestAddress = address(0);
    mapping(address => uint) moneySent;
    mapping(address => bool) wereRichest;

    function becomeRichest() external payable returns(bool) {
        moneySent[msg.sender] += msg.value;
        if (moneySent[msg.sender] > moneySent[richestAddress]) {
            wereRichest[richestAddress] = true;
            richestAddress = msg.sender;
            return true;
        }
        return false;
    }

    function withdraw() external {
        if (wereRichest[msg.sender]) {
            address payable user = payable(msg.sender);
            uint value = moneySent[msg.sender];
            moneySent[msg.sender] = 0;
            wereRichest[msg.sender] = false;
            user.call{value: value}("");
        }
    }
    
    function getRichest() public view returns (address) {
        return richestAddress;
    }
}
