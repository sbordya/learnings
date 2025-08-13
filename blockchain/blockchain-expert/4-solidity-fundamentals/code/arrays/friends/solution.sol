pragma solidity >=0.4.22 <=0.8.17;

contract Following {
    mapping(address => address[]) following;
    
    function follow(address toFollow) external {
        require(toFollow != msg.sender, "it's not allowed to follow yourself");
        require(following[msg.sender].length < 3, "max limit of 3 to follow reached");
        following[msg.sender].push(toFollow);
    }

    function getFollowing(address addr) external view returns (address[] memory) {
        return following[addr];
    }

    function clearFollowing() external {
        delete following[msg.sender];
    }
}
