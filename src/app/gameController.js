import { Player } from "../domain/player.js";

export function createGameController(autoPopulate = true) {
  const human = new Player("human");
  const computer = new Player("computer");
  let currentTurn = "human"; // start with human
  let winner = null;
  let message = "Your turn";

  if (autoPopulate) {
    populatePlayerShips(human);
    populatePlayerShips(computer);
  }

  function getState() {
    return {
      human,
      computer,
      currentTurn,
      winner,
      message,
    };
  }

  function handleHumanInput([x, y]) {
    if (winner || currentTurn !== "human") return false;

    const result = human.attack(computer.gameboard, [x, y]);
    if (result === false) {
      message = "Already attacked that coordinate.";
      return false;
    }

    message = result === "hit" ? "Hit!" : "Miss.";

    if (computer.gameboard.allShipsSunk()) {
      winner = "human";
      message = "You win!";
      return result;
    }

    currentTurn = "computer";
    return result;
  }

  function handleComputerTurn() {
    if (winner || currentTurn !== "computer") return false;

    const randomCoord = computer.chooseRandomAttackCoordinate();

    const result = computer.attack(human.gameboard, randomCoord);

    message = result === "hit" ? "Computer hits!" : "Computer misses.";

    if (human.gameboard.allShipsSunk()) {
      winner = "computer";
      message = "You lose!";
      return { coord: randomCoord, result };
    }

    currentTurn = "human";
    return { coord: randomCoord, result };
  }

  return { getState, handleHumanInput, handleComputerTurn };
}

function populatePlayerShips(player) {
  const gameboard = player.gameboard;
  const shipLengths = [2, 3, 3, 4, 5];

  for (const shipLength of shipLengths) {
    let orientation = "";
    const effectiveEdgeSize = [gameboard.boardSize, gameboard.boardSize];

    if (Math.random() < 0.5) {
      orientation = "horizontal";
      effectiveEdgeSize[1] -= shipLength;
    } else {
      orientation = "vertical";
      effectiveEdgeSize[0] -= shipLength;
    }

    let placeShipResult = false;

    while (!placeShipResult) {
      const x = Math.floor(Math.random() * effectiveEdgeSize[0]);
      const y = Math.floor(Math.random() * effectiveEdgeSize[1]);

      placeShipResult = player.gameboard.placeShip(
        [x, y],
        shipLength,
        orientation,
      );
    }
  }
}
