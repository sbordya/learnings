pragma solidity >=0.4.22 <=0.8.17;

contract GridMaker {
    function make2DIntGrid(
        uint256 rows,
        uint256 cols,
        int256 value
    ) public pure returns (int256[][] memory) {
        int256[][] memory result = new int256[][](rows);
        for (uint i; i < rows; i++) {
            int256[] memory row = new int256[](cols);
            for (uint j; j < cols; j++) {
                row[j] = value;
            }
            result[i] = row;
        }
        return result;
    }

    function make2DAddressGrid(uint256 rows, uint256 cols)
        public
        view
        returns (address[][] memory)
    {
        address[][] memory result = new address[][](rows);
        for (uint i; i < rows; i++) {
            address[] memory row = new address[](cols);
            for (uint j; j < cols; j++) {
                row[j] = msg.sender;
            }
            result[i] = row;
        }
        return result;
    }
}
