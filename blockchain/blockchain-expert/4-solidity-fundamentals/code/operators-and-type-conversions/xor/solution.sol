pragma solidity >=0.4.22 <=0.8.17;

contract LogicGates {
    function and(bool a, bool b) public pure returns (bool) {
        return a && b;
    }

    function or(bool a, bool b) public pure returns (bool) {
        return a || b;
    }

    function not(bool a) public pure returns (bool) {
        return !a;
    }

    function xor(bool a, bool b) public pure returns (bool) {
        return a != b;
    }
}
