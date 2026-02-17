import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.ships = [];
    this.occupied = new Map();
    this.attackedCoordinates = new Set();
    this.boardSize = 10;
  }

  placeShip([x, y], length, direction) {
    if (direction !== "horizontal" && direction !== "vertical") return false;

    const dx = direction === "horizontal" ? 1 : 0;
    const dy = direction === "vertical" ? 1 : 0;

    const keys = [];

    for (let i = 0; i < length; i++) {
      const nx = x + dx * i;
      const ny = y + dy * i;

      // validate in bounds
      if (nx < 0 || nx >= this.boardSize || ny < 0 || ny >= this.boardSize) {
        return false;
      }

      const key = `${nx},${ny}`;
      //validate free
      if (this.occupied.has(key)) return false;

      keys.push(key);
    }

    const ship = new Ship(length);
    this.ships.push(ship);
    for (const key of keys) {
      this.occupied.set(key, ship);
    }

    return true;
  }

  receiveAttack([x, y]) {
    const key = `${x},${y}`;
    if (this.attackedCoordinates.has(key)) return false;

    this.attackedCoordinates.add(key);

    if (this.occupied.has(key)) {
      const ship = this.occupied.get(key);
      ship.hit();
      return "hit";
    }

    return "miss";
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
