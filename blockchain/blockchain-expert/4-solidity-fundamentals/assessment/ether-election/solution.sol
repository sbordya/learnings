pragma solidity >=0.4.22 <=0.8.17;

contract EtherElection {
    address owner;
    mapping(address => uint) candidates;
    mapping(address => bool) candidatesRegistered;
    mapping(address => bool) voted;
    uint8 candidatesCount;
    address winner;
    bool prizeTaken;

    constructor() {
        owner = msg.sender;
    }
    
    function enroll() public payable {
        require(!candidatesRegistered[msg.sender], "you already registered");
        require(candidatesCount < 3, "3 candidates already registered");
        require(msg.value == 1 ether, "deposit 1 ether");
        candidatesRegistered[msg.sender] = true;
        candidatesCount++;
    }

    function vote(address candidate) public payable {
        require(winner == address(0), "winner already selected");
        require(candidatesCount == 3, "3 candidates not yet registered");
        require(candidatesRegistered[candidate], "this candidate was not enrolled");
        require(!voted[msg.sender], "you already voted");
        require(msg.value == 10000 wei, "deposit 10000 wei");
        candidates[candidate]++;
        voted[msg.sender] = true;
        if (candidates[candidate] == 5) {
            winner = candidate;
        }
    }

    function getWinner() public view returns (address) {
        require(winner != address(0), "winner not yeat selected");
        return winner;
    }

    function claimReward() public {
        require(msg.sender == winner, "you are not the winner");
        require(!prizeTaken, "prize already taken");
        prizeTaken = true;
        payable(winner).call{value: 3 ether}("");
    }

    function collectFees() public {
        require(msg.sender == owner, "you are not the owner");
        require(prizeTaken, "prize not yet taken");
        selfdestruct(payable(owner));
    }
}
