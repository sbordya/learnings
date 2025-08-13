pragma solidity >=0.4.22 <=0.8.17;

contract Friends {
    struct Node {
        mapping(address => bool) existingFriends;
        mapping(address => bool) existingRequests;
        mapping(address => uint) requestIndex;
        address[] friends;
        address[] requests;
    }
    mapping(address => Node) users;
    
    function getFriendRequests() public view returns(address[] memory) {
        return users[msg.sender].requests;
    }

    function getNumberOfFriends() public view returns(uint) {
        return users[msg.sender].friends.length;
    }

    function getFriends() public view returns(address[] memory) {
        return users[msg.sender].friends;
    }

    function sendFriendRequest(address friend) public {
        require(msg.sender != friend);
        require(!users[msg.sender].existingFriends[friend]);
        require(!users[msg.sender].existingRequests[friend]);
        require(!users[friend].existingRequests[msg.sender]);
        users[friend].existingRequests[msg.sender] = true;
        users[friend].requestIndex[msg.sender] = users[friend].requests.length;
        users[friend].requests.push(msg.sender);
    }

    function acceptFriendRequest(address friend) public {
        require(msg.sender != friend);
        require(users[msg.sender].existingRequests[friend]);
        require(!users[msg.sender].existingFriends[friend]);
        users[msg.sender].existingFriends[friend] = true;
        users[friend].existingFriends[msg.sender] = true;
        users[msg.sender].friends.push(friend);
        users[friend].friends.push(msg.sender);
        users[msg.sender].requests[users[msg.sender].requestIndex[friend]] = users[msg.sender].requests[users[msg.sender].requests.length - 1];
        users[msg.sender].requests.pop();
        users[msg.sender].existingRequests[friend] = false;
        users[msg.sender].requestIndex[friend] = 0;
    }
}
