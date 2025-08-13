pragma solidity >=0.4.22 <=0.8.17;

contract Employee {
    enum Department {
        Gardening,
        Clothing,
        Tools
    }

    string _firstName;
    string _lastName;
    uint _hourlyPay;
    Department _department;

    constructor(string memory firstName, string memory lastName, uint hourlyPay, uint department) {
        _firstName = firstName;
        _lastName = lastName;
        _hourlyPay = hourlyPay;
        _department = Department(department);
    }

    function getWeeklyPay(uint hoursWorked) public view returns(uint) {
        uint normalHours = hoursWorked > 40 ? 40 : hoursWorked;
        uint overtimeHours = hoursWorked > 40 ? hoursWorked - 40 : 0;
        return normalHours * _hourlyPay + overtimeHours * _hourlyPay * 2;
    }

    function getFirstName() public view returns(string memory) {
        return _firstName;
    }
}

contract Manager is Employee {
    Employee[] subordinates;
    string[] subordinatesFirstNames;

    constructor(string memory firstName, string memory lastName, uint hourlyPay, uint department) 
        Employee(firstName, lastName, hourlyPay, department) {}

    function addSubordinate(string calldata firstName, string calldata lastName, uint hourlyPay, Department department) public {
        subordinates.push(new Employee(firstName, lastName, hourlyPay, uint(department)));
        subordinatesFirstNames.push(firstName);
    }

    function getSubordinates() public view returns(string[] memory) {
        return subordinatesFirstNames;
    }
}
