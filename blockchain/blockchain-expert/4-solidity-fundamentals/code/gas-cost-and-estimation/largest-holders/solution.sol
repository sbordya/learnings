pragma solidity >=0.4.22 <=0.8.17;

contract LargestHolder {
    uint[] balances;
    address[] holders;
    uint largestBalance;
    address largestHolder;
    uint startIndex;
    
    function submitBalances(
        uint256[] memory _balances,
        address[] memory _holders
    ) public {
        balances = _balances;
        holders = _holders;
    }

    function process() public {
        require(balances.length > 0, "balances were not submitted yet");
        require(startIndex < balances.length, "largest holder already found");
        uint endIndex = startIndex + 10;
        if (endIndex > balances.length) {
            endIndex = balances.length;
        }
        while (startIndex < endIndex) {
            if (balances[startIndex] > largestBalance) {
                largestBalance = balances[startIndex];
                largestHolder = holders[startIndex];
            }
            startIndex++;
        }
    }

    function numberOfTxRequired() public view returns (uint256) {
        require(balances.length > 0, "balances were not submitted yet");
        uint result = (balances.length - startIndex) / 10;
        if ((balances.length - startIndex) % 10 != 0) {
            result++;
        }
        return result;
    }

    function getLargestHolder() public view returns (address) {
        require(balances.length > 0, "balances were not submitted yet");
        require(startIndex == balances.length, "largest holder not found yet");
        return largestHolder;
    }
}
