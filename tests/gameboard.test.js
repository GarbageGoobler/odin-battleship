import { Gameboard } from "../src/gameboard.js";

describe("gameboard", () => {
  test("can place a ship and sink it by attacking all coordinates", () => {
    const board = new Gameboard();

    board.placeShip([2, 3], 3, "vertical");

    expect(board.receiveAttack([2, 3])).toBe("hit");
    expect(board.receiveAttack([2, 4])).toBe("hit");
    expect(board.receiveAttack([2, 5])).toBe("hit");

    expect(board.allShipsSunk()).toBe(true);
  });
});
