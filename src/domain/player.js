import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(type) {
    this.gameboard = new Gameboard();
    this.type = type;

    const allCoords = [];
    for (let x = 0; x < this.gameboard.boardSize; x++) {
      for (let y = 0; y < this.gameboard.boardSize; y++) {
        allCoords.push([x, y]);
      }
    }

    this.shotsAvailable = allCoords;
  }

  attack(gameboard, [x, y]) {
    const attackResult = gameboard.receiveAttack([x, y]);
    if (!attackResult) return false;

    const shotIndex = this.shotsAvailable.findIndex(
      ([cx, cy]) => cx === x && cy === y,
    );

    // ensures shotIndex was found
    if (shotIndex !== -1) this.shotsAvailable.splice(shotIndex, 1);
    return attackResult;
  }

  // for computer
  chooseRandomAttackCoordinate() {
    const randomIndex = Math.floor(Math.random() * this.shotsAvailable.length);
    return this.shotsAvailable[randomIndex];
  }
}
