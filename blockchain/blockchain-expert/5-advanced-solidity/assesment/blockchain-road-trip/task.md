# Blockchain Road Trip 🟢

Write an interface named `Driveable` that defines the following functions. Note that the descriptions for the functions are for when you implement them in a contract.

Use the correct visibility modifiers based on your experience with interfaces.

- `startEngine()`: a function that puts the driveable contract into the started state.

- `stopEngine()`: a function that puts the driveable contract into the stopped state.

- `fuelUp(uint litres)`: a function that adds the provided `litres` to the gas tank. This should only be callable when the driveable contract is in a stopped state. This function should fail if adding the provided `litres` causes the tank to exceed capacity.

- `drive(uint kilometers)`: a function that drives the car `kilometers` distance and adjusts the remaining gas accordingly. This function should only be callable in the started state. This function should fail if the gas remaining is not sufficient to drive the provided `kilometers`. Assume the provided kilometers will always utilize a non-fractional number of litres (i.e., no need to handle rounding errors when using division).

- `kilometersRemaining() view returns (uint)`: a function that returns the driveable kilometers remaining based on the fuel level.

Next, write an `abstract` contract named `GasVehicle` that implements the `Driveable` interface. This contract should also define the following abstract functions (i.e., do not implement these functions).

- `getKilometersPerLitre()`: a public function that returns a `uint` representing the number of kilometers that can be driven with one litre of gas.

- `getFuelCapacity()`: a public function that returns a `uint` representing the maximum fuel tank capacity in litres.

Lastly, write a `Car` contract that inherits from `GasVehicle` and is initialized by passing a `uint fuelTankSize` and a `uint kilometersPerLitre`, in that order. This contract should override the appropriate functions.

Note: the `Car` should start with `0` litres of gas and be in the stopped state.
