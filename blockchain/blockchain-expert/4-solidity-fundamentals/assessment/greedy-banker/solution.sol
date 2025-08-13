pragma solidity >=0.4.22 <=0.8.17;

contract GreedyBanker {
    address owner;
    mapping(address => uint) deposits;
    mapping(address => bool) freeTransactionUsed;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        if (freeTransactionUsed[msg.sender]) {
            require(msg.value >= 1000 wei, "transaction should be from 1000 wei");
            deposits[msg.sender]+= msg.value - 1000 wei;
        } else {
            deposits[msg.sender]+= msg.value;
            freeTransactionUsed[msg.sender] = true;
        }  
    }

    fallback() external payable {
        freeTransactionUsed[msg.sender] = true;
    }

    function withdraw(uint256 amount) external {
        require(deposits[msg.sender] >= amount, "you don't have this amount");
        deposits[msg.sender] -= amount;
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "transaction failed");
    }

    function collectFees() external {
        require(msg.sender == owner, unicode"you are not the owner, пиздючка, убийца блин");
        (bool sent, ) = payable(owner).call{value: address(this).balance}("");
        require(sent, "transaction failed");
    }

    function getBalance() public view returns (uint256) {
        return deposits[msg.sender];
    }
}
