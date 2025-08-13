# Blockchain Workplace 🟢

Write a smart contract named `Employee` and a smart contract that inherits from `Employee` named `Manager`. Managers share all the properties of employees but have subordinates which may be other managers or employees.

Each `Employee` instance is initialized (using the constructor) by passing a `string firstName`, `string lastName`, `uint hourlyPay` and a `uint department`, in this order. Use an enum to represent the valid departments of `Gardening`, `Clothing` and `Tools`, in that order. Each `Manager` instance is initialized the same as an employee.

The `Employee` contract should implement the following functions.

- `getWeeklyPay(uint hoursWorked)`: returns a `uint` representing the amount this employee should be paid based on their hourly rate and the `hours` worked. This function should factor in overtime pay. For every hour beyond `40` that the employee works they should be paid double their hourly rate. For example, if an employee makes $20/hour and works 42 hours they are paid $880.

- `getFirstName()`: returns a `string` representing the first name of the employee.

The `Manager` contract should implement the following functions.

- `addSubordinate(string firstName, string lastName, uint hourlyPay, Department department)`: this function takes the required arguments to create a new employee and adds this employee to this managers subordinates.

- `getSubordinates()`: this function should return a `string[]` containing the first names of all of its subordinates.

Note: you do not need to handle any edge cases like managers having duplicate subordinates.
