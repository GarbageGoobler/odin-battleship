import { Player } from "../../src/domain/player.js";
import { Gameboard } from "../../src/domain/gameboard.js";

describe("player", () => {
  test.each(["human", "computer"])("stores type: %s", (type) => {
    const player = new Player(type);
    expect(player.type).toBe(type);
  });

  test("creates a gameboard instance", () => {
    const player = new Player("human");
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("each player gets their own gameboard", () => {
    const p1 = new Player("human");
    const p2 = new Player("computer");
    expect(p1.gameboard).not.toBe(p2.gameboard);
  });

  test("attacks that hit/miss returns hit/miss", () => {
    const p1 = new Player("human");
    const p2 = new Player("computer");

    p2.gameboard.placeShip([0, 0], 3, "vertical");

    expect(p1.attack(p2.gameboard, [0, 0])).toBe("hit");
    expect(p1.attack(p2.gameboard, [1, 1])).toBe("miss");
  });

  test("attack random available coordinate in empty board", () => {
    const p1 = new Player("human");
    const p2 = new Player("computer");

    const [x, y] = p2.chooseRandomAttackCoordinate();

    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThanOrEqual(9);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThanOrEqual(9);
  });

  test("computer only picks available coordinates", () => {
    const p1 = new Player("human");
    const p2 = new Player("computer");

    for (let x = 0; x < p1.gameboard.boardSize; x++) {
      for (let y = 0; y < p1.gameboard.boardSize; y++) {
        if (x === 9 && y === 9) continue;
        p2.attack(p1.gameboard, [x, y]);
      }
    }

    expect(p2.chooseRandomAttackCoordinate()).toEqual([9, 9]);
  });
});
