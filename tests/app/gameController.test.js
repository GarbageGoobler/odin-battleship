import { createGameController } from "../../src/app/gameController.js";
import { Player } from "../../src/domain/player.js";

describe("gamecontroller", () => {
  test("has getState method with correct keys", () => {
    const state = createGameController().getState();

    expect(Object.keys(state)).toEqual(
      expect.arrayContaining([
        "human",
        "computer",
        "currentTurn",
        "winner",
        "message",
      ]),
    );
  });

  test("getState returns correct object types", () => {
    const state = createGameController().getState();

    expect(state.human).toBeInstanceOf(Player);
    expect(state.computer).toBeInstanceOf(Player);
    expect(typeof state.currentTurn).toBe("string");
    expect(state.winner).toBeNull();
    expect(typeof state.message).toBe("string");
  });

  test("has handleHumanInput method", () => {
    const controller = createGameController();
    expect(typeof controller.handleHumanInput).toBe("function");
  });

  test("handleHumanInput returns hit for occupied coordinate", () => {
    const controller = createGameController();
    const state = controller.getState();

    state.computer.gameboard.placeShip([0, 0], 2, "horizontal");
    expect(controller.handleHumanInput([0, 0])).toBe("hit");
  });

  test("handleHumanInput returns miss for empty coordinate", () => {
    const controller = createGameController();
    const state = controller.getState();

    state.computer.gameboard.placeShip([9, 9], 1, "horizontal");

    expect(controller.handleHumanInput([4, 4])).toBe("miss");
  });

  test("handleHumanInput returns false when it is not human turn", () => {
    const controller = createGameController();
    const state = controller.getState();

    state.computer.gameboard.placeShip([9, 9], 1, "horizontal");

    controller.handleHumanInput([2, 2]);

    expect(controller.handleHumanInput([3, 3])).toBe(false);
    expect(state.computer.gameboard.attackedCoordinates.size).toBe(1);
  });

  test("handleHumanInput updates message and turn after valid miss", () => {
    const controller = createGameController();
    const state = controller.getState();

    state.computer.gameboard.placeShip([9, 9], 1, "horizontal");

    expect(controller.handleHumanInput([0, 0])).toBe("miss");
    expect(controller.getState().message).toBe("Miss.");
    expect(controller.getState().currentTurn).toBe("computer");
  });

  test("handleHumanInput sets winner when all computer ships are sunk", () => {
    const controller = createGameController();
    const state = controller.getState();

    state.computer.gameboard.placeShip([0, 0], 1, "horizontal");

    expect(controller.handleHumanInput([0, 0])).toBe("hit");
    expect(controller.getState().winner).toBe("human");
    expect(controller.getState().message).toBe("You win!");
  });
});
