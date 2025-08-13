pragma solidity >=0.4.22 <=0.8.17;

interface Comparable {
    function greaterThan(Comparable other) external returns(bool);
    function lessThan(Comparable other) external returns(bool);
    function equalTo(Comparable other) external returns(bool);
    function getValue() external returns(int);
}

contract Vector is Comparable {
    int256 a;
    int256 b;

    constructor(int256 _a, int256 _b) {
        a = _a;
        b = _b;
    }

    function getValue() public view override returns (int256) {
        return a + b;
    }

    function greaterThan(Comparable other) external override returns(bool) {
        return getValue() > other.getValue();
    }
    function lessThan(Comparable other) external override returns(bool) {
        return getValue() < other.getValue();
    }
    function equalTo(Comparable other) external override returns(bool) {
        return getValue() == other.getValue();
    }
}
