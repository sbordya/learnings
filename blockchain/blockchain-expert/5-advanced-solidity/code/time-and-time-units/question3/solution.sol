pragma solidity >=0.4.22 <=0.8.17;

contract TimedAuction {
    address owner;
    uint expire;
    uint currentBid;
    address currentBidder;
    mapping(address => uint) bids;
    mapping(address => bool) bidders;
    address[] biddersList;

    event Bid(address indexed sender, uint amount, uint timestamp);
    constructor() {
        owner = msg.sender;
        expire = block.timestamp + 5 minutes;
    }
    
    function bid() external payable {
        require(block.timestamp < expire, "the auction expired");
        require(msg.value > currentBid, "you should beat the current bid");
        bids[currentBidder] += currentBid;
        currentBid = msg.value;
        currentBidder = msg.sender;
        if (!bidders[msg.sender]) {
            bidders[msg.sender] = true;
            biddersList.push(msg.sender);
        }
        emit Bid(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public {
        uint value = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).call{value: value}("");
    }

    function claim() public {
        require(msg.sender == owner, "only owner can do this");
        require(block.timestamp >= expire, "the auction is still active");
        for (uint i; i < biddersList.length; i++) {
            require(bids[biddersList[i]] == 0, "there are still unclaimed bids");
        }
        selfdestruct(payable(owner));
    }

    function getHighestBidder() public view returns (address) {
        return currentBidder;
    }
}
