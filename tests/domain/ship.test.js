import { Ship } from "../../src/domain/ship.js";

describe("Ship", () => {
  test.each([1, 2, 3, 4, 5])("stores length %i correctly", (length) => {
    const ship = new Ship(length);
    expect(ship.length).toBe(length);
  });

  test("starts with 0 hits for any length", () => {
    const ship = new Ship(5);
    expect(ship.hits).toBe(0);
  });

  test("hit increases hit count", () => {
    const ship = new Ship(5);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("ship with not enough hits is not sunk", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("ship with enough hits is sunk", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
