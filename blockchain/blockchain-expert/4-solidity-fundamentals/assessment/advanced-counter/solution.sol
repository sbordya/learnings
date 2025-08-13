pragma solidity >=0.4.22 <=0.8.17;

contract AdvancedCounter {
    mapping(address => mapping(string => int)) counters;
    mapping(address => mapping(string => bool)) countersExist;
    mapping(address => uint8) countersAmount;
    
    function createCounter(string memory id, int256 value) public {
        require(countersAmount[msg.sender] < 3, "max 3 counters already created");
        counters[msg.sender][id] = value;
        countersExist[msg.sender][id] = true;
        countersAmount[msg.sender]++;
    }

    function deleteCounter(string memory id) public {
        require(countersExist[msg.sender][id], "there is no counter with this id");
        delete counters[msg.sender][id];
        countersExist[msg.sender][id] = false;
        countersAmount[msg.sender]--;
    }

    function incrementCounter(string memory id) public {
        require(countersExist[msg.sender][id], "there is no counter with this id");
        counters[msg.sender][id]++;
    }

    function decrementCounter(string memory id) public {
        require(countersExist[msg.sender][id], "there is no counter with this id");
        counters[msg.sender][id]--;
    }

    function getCount(string memory id) public view returns (int256) {
        require(countersExist[msg.sender][id], "there is no counter with this id");
        return counters[msg.sender][id];
    }
}
