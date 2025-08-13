pragma solidity >=0.4.22 <=0.8.17;

interface Driveable {
    function startEngine() external;
    function stopEngine() external;
    function fuelUp(uint litres) external;
    function drive(uint kilometers) external;
    function kilometersRemaining() external view returns(uint);
}

abstract contract GasVehicle is Driveable {
    enum EngineState {
        Stop,
        Start
    }
    EngineState engineState;
    uint fuel;

    function startEngine() public {
        engineState = EngineState.Start;
    }
    function stopEngine() public {
        engineState = EngineState.Stop;
    }
    function fuelUp(uint litres) public {
        require(engineState == EngineState.Stop);
        require(fuel + litres <= getFuelCapacity());
        fuel += litres;
    }
    function drive(uint kilometers) public {
        require(engineState == EngineState.Start);
        require(kilometersRemaining() >= kilometers);
        fuel -= kilometers / getKilometersPerLitre();
    }
    function kilometersRemaining() public view returns(uint) {
        return getKilometersPerLitre() * fuel;
    }

    function getKilometersPerLitre() public virtual view returns(uint);
    function getFuelCapacity() public virtual view returns(uint);
}

contract Car is GasVehicle {
    uint fuelTankSize;
    uint kilometersPerLitre;

    constructor(uint _fuelTankSize, uint _kilometersPerLitre) {
        fuelTankSize = _fuelTankSize;
        kilometersPerLitre = _kilometersPerLitre;
    }

    function getKilometersPerLitre() public override view returns(uint) {
        return kilometersPerLitre;
    }
    function getFuelCapacity() public override view returns(uint) {
        return fuelTankSize;
    }
}
