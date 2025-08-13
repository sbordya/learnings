pragma solidity >=0.4.22 <=0.8.17;

contract MathUtils {
    function floor(int256 value) public pure returns (int256) {
        return value - value % 10;
    }

    function ceil(int256 value) public pure returns (int256) {
        value = value < 0 ? value - 9 : value + 9;
        return value - value % 10;
    }

    function average(int256[] memory values, bool down)
        public
        pure
        returns (int256)
    {
        if (values.length == 0) {
            return 0;
        }
        int sum = 0;
        for (uint i; i < values.length; i++) {
            sum += values[i];
        }
        sum /= int(values.length);
        return down ? floor(sum) : ceil(sum);
    }
}
