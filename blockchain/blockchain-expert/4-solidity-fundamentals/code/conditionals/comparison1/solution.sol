pragma solidity >=0.4.22 <=0.8.17;

contract Comparison {
    function compare(int256 a, int256 b) public pure returns (int256) {
        if (a == b) {
            return 0;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return -1;
        }
    }
}
