pragma solidity >=0.4.22 <=0.8.17;

contract Voting {
    mapping(uint8 => uint) votes;
    mapping(address => bool) voters;
    uint8 currentWinner = 1;
    
    function getVotes(uint8 number) external view returns (uint) {
        require(number >= 1 && number <= 5, "Number should be between 1 and 5");
        return votes[number];
    }

    function vote(uint8 number) external {
        require(!voters[msg.sender], "User already voted");
        require(number >= 1 && number <= 5, "Number should be between 1 and 5");
        votes[number] += 1;
        voters[msg.sender] = true;
        if (votes[number] >= votes[currentWinner]) {
            currentWinner = number;
        }
    }

    function getCurrentWinner() public view returns (uint8) {
        return currentWinner;
    }
}
