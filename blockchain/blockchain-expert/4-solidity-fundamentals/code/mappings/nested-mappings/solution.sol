pragma solidity >=0.4.22 <=0.8.17;

contract DebtTracking {
    mapping(address => mapping(address => uint)) owing;

    function addDebt(
        address toBePaidAddress,
        address payingAddress,
        uint256 amount
    ) public {
        owing[toBePaidAddress][payingAddress] += amount;
    }

    function payDebt(
        address toBePaidAddress,
        address payingAddress,
        uint256 amount
    ) public {
        uint prev_amount = owing[toBePaidAddress][payingAddress];
        if (prev_amount < amount) {
            owing[toBePaidAddress][payingAddress] = 0;
            owing[payingAddress][toBePaidAddress] = amount - prev_amount;
        } else {
            owing[toBePaidAddress][payingAddress] = prev_amount - amount;
        }
    }

    function getDebt(address toBePaidAddress, address payingAddress)
        public
        view
        returns (uint256)
    {
        return owing[toBePaidAddress][payingAddress];
    }
}
