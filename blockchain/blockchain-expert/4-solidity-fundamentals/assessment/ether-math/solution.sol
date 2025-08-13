pragma solidity >=0.4.22 <=0.8.17;

contract EtherMath {
    address owner;
    uint reward;
    int target;
    int[] numbers;
    mapping(int => bool) validNumbers;
    address[] voters;
    mapping(address => bool) participatedVoters;
    mapping(address => uint) unclaimedReward;
    

    constructor() {
        owner = msg.sender;
    }
    function submitChallenge(int256[] memory array, int256 targetSum)
        public
        payable
    {
        require(msg.sender == owner, "only owner can submit the challenge");
        require(reward == 0, "challenge already submitted");
        require(msg.value > 0, "send some crypto as a prize");
        numbers = array;
        target = targetSum;
        reward = msg.value;
        for (uint i; i < numbers.length; i++) {
            validNumbers[numbers[i]] = true;
        }
    }

    function submitSolution(int256[] memory solution) public {
        require(reward > 0, "challenge not yet submitted");
        require(msg.sender != owner, "owner can't participate");
        require(!participatedVoters[msg.sender], "you already submitted your solution");
        participatedVoters[msg.sender] = true;
        voters.push(msg.sender);
        int sum;
        bool invalidSubmission;
        for (uint i; i < solution.length; i++) {
            if (!validNumbers[solution[i]]) {
                invalidSubmission = true;
                break;
            }
            sum += solution[i];
        }
        
        if (sum == target && !invalidSubmission) {
            for (uint i; i < numbers.length; i++) {
                validNumbers[numbers[i]] = false;
            }
            for (uint i; i < voters.length; i++) {
                participatedVoters[voters[i]] = false;
            }
            delete voters;
            delete numbers;
            unclaimedReward[msg.sender] += reward;
            reward = 0;
        }
    }

    function claimRewards() public {
        require(unclaimedReward[msg.sender] > 0, "there is nothing to withdraw");
        uint value = unclaimedReward[msg.sender];
        unclaimedReward[msg.sender] = 0;
        payable(msg.sender).call{value: value}("");
    }
}
