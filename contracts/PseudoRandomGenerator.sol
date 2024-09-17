// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

pragma solidity ^0.8.0;

contract PseudoRandomGenerator {
    struct Player {
        uint256 position;
        bool isActive;  
        bool isRegistered;
    }

    // state variables
    uint256 public TotalSquaresNumber = 23; 
    uint256 public  winningPosition = TotalSquaresNumber; 
    address[] public players;
    uint256 public currentPlayerIndex;

    // Mappings
    mapping(address => Player) public playerInfo;
    

    // events
    event PlayerAddedSuccessfully();
    event DiceRolledSuccessfully(address indexed player, uint256 rolledValue);
    event PlayerMovedSuccessfully(address indexed player, uint256 newPosition);
    event GameWon(address indexed winner);

    modifier onlyPlayer() {
        require(playerInfo[msg.sender].isRegistered, "You are not a registered player");
        _;
    }

    function addPlayer() external {
        require(!playerInfo[msg.sender].isActive, "Player already registered");
        players.push(msg.sender);
        playerInfo[msg.sender] = Player({
            position: 1,
            isActive: true,
            isRegistered: true
        });
        emit PlayerAddedSuccessfully();
    }

    function rollDice() external onlyPlayer {
        require(players[currentPlayerIndex] == msg.sender, "Not your turn yet, wait for your turn ");

        uint256 rolledValue = (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 6) + 1;

        _movePlayer(msg.sender, rolledValue);

        emit DiceRolledSuccessfully(msg.sender, rolledValue);

        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }

    function _movePlayer(address player, uint256 rolledValue) internal {
        Player storage p = playerInfo[player];

        uint256 newPosition = p.position + rolledValue;
        if (newPosition >= winningPosition) {
            p.position = winningPosition;
            emit PlayerMovedSuccessfully(player, p.position);
            emit GameWon(player);
        } else {
            p.position = newPosition;
            emit PlayerMovedSuccessfully(player, p.position);
        }
    }

    function getCurrentPlayer() external view returns (address) {
        return players[currentPlayerIndex];
    }

    function getPlayerPosition(address player) external view returns (uint256) {
        return playerInfo[player].position;
    }
}

