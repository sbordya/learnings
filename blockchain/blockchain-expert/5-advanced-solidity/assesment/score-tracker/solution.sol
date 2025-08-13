pragma solidity >=0.4.22 <=0.8.17;

abstract contract Game {
    string _homeTeam;
    string _awayTeam;
    uint _homeScore;
    uint _awayScore;

    constructor(string memory homeTeam, string memory awayTeam) {
        _homeTeam = homeTeam;
        _awayTeam = awayTeam;
    }

    function getWinningTeam() public view returns(string memory) {
        return _homeScore > _awayScore ? _homeTeam : _awayTeam;
    }
}

contract BasketballGame is Game {
    constructor(string memory homeTeam, string memory awayTeam) 
        Game(homeTeam, awayTeam) {}

    function homeTeamScored(uint score) public {
        require(score > 0 && score < 4);
        _homeScore += score;
    }

    function awayTeamScored(uint score) public {
        require(score > 0 && score < 4);
        _awayScore += score;
    }
}

contract SoccerGame is Game {
    constructor(string memory homeTeam, string memory awayTeam) 
        Game(homeTeam, awayTeam) {}

    function homeTeamScored() public {
        _homeScore++;
    }

    function awayTeamScored() public {
        _awayScore++;
    }
}
