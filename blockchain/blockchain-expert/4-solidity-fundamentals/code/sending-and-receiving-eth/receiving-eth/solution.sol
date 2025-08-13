pragma solidity >=0.4.22 <=0.8.17;

contract Balances {
    mapping(address => uint) moneySent;

    function getAmountSent(address addr) external view returns (uint) {
        return moneySent[addr];
    }

    receive() external payable {
        moneySent[msg.sender] += msg.value;
    }

    fallback() external payable {
        moneySent[msg.sender] += msg.value;
    }
}
