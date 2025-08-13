pragma solidity >=0.4.22 <=0.8.17;

abstract contract SignUpBonus {
    mapping(address => bool) transactionsExist;
    mapping(address => uint) balances;
    
    function getBonusAmount() internal virtual returns (uint);
    function getBonusRequirements() internal virtual returns (uint);
    function deposit() public payable {
        if (!transactionsExist[msg.sender]) {
            if (msg.value >= getBonusRequirements()) {
                balances[msg.sender] += getBonusAmount();
            }
            transactionsExist[msg.sender] = true;
        }
        balances[msg.sender] += msg.value;
    }
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "amount greater than your balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).call{value: amount}("");
    }
    function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }
}

contract Bank is SignUpBonus {
    function getBonusAmount() internal override pure returns(uint) {
        return 150 wei;
    }
    function getBonusRequirements() internal override pure returns(uint) {
        return 1000 wei;
    }
}
