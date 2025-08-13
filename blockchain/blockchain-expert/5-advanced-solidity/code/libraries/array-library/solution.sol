pragma solidity >=0.4.22 <=0.8.17;

library Array {
    function indexOf(int[] memory numbers, int target) public pure returns(int) {
        for (uint i; i < numbers.length; i++) {
            if (numbers[i] == target) {
                return int(i);
            }
        }
        return -1;
    }

    function count(int[] memory numbers, int target) public pure returns(uint) {
        uint arrCount;
        for (uint i; i < numbers.length; i++) {
            if (numbers[i] == target) {
                arrCount++;
            }
        }
        return arrCount;
    }

    function sum(int[] memory numbers) public pure returns(int) {
        int arrSum;
        for (uint i; i < numbers.length; i++) {
            arrSum += numbers[i];
        }
        return arrSum;
    }
}
