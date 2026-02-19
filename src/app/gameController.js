import { Player } from "../domain/player.js";

export function createGameController() {
  const human = new Player("human");
  const computer = new Player("computer");
  let currentTurn = "human"; // start with human
  let winner = null;
  let message = "Your turn";

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
      return result;
    }

    currentTurn = "human";
    return result;
  }

  return { getState, handleHumanInput, handleComputerTurn };
}
