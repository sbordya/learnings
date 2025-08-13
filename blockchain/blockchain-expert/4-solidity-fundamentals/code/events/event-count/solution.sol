pragma solidity >=0.4.22 <=0.8.17;

contract EventEmitter {
    uint counter = 0;

    event Called(uint count, address sender);
    
    function count() public {
        counter++;
        emit Called(counter, msg.sender);
    }
}
