pragma solidity >=0.4.22 <=0.8.17;

contract Comparison {
    function compare(int256 a, int256 b) public pure returns (int256) {
        return a < b ? -1 : int8(a > b ? 1 : 0);
    }
}
