pragma solidity >=0.4.22 <=0.8.17;

contract Competitors {
    address owner;
    uint balance;
    bool withdrawn;
    address winner;
    address player1;
    address player2;
    mapping(address => uint) payments;

    constructor() {
        owner = msg.sender;
    }
    
    function deposit() public payable {
        require(msg.value == 1 ether, "only 1 ether deposit allowed");
        require(balance < 3 ether, "deposit limit of 3 ether reached");

        if (player1 == address(0)) {
            player1 = msg.sender;
        } else if (player2 == address(0)) {
            player2 = msg.sender;
        } else {
            require(
                msg.sender == player1 || msg.sender == player2,
                "you are not one of the two players"
            );
        }
        
        balance += msg.value;
        payments[msg.sender] += msg.value;
        if (payments[msg.sender] > payments[winner]) {
            winner = msg.sender;
        }
    }

    function withdraw() public {
        require(balance == 3 ether, "balance not reached 3 ether yet"); 
        require(msg.sender == winner, "you are not the winner");
        require(!withdrawn, "money already withdrawn");
        withdrawn = true;
        (bool sent, ) = payable(winner).call{value: balance}("");
        require(sent, "withdraw failed");
    }

    function destroy() public {
        require(owner == msg.sender, "you are not the owner");
        require(withdrawn, "money not yet withdrawn");
        selfdestruct(payable(owner));
    }
}
