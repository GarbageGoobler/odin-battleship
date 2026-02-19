import { Player } from "../domain/player.js";

export function createGameController() {
  const human = new Player("human");
  const computer = new Player("computer");
}
