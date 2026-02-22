import "./styles.css";
import { renderUI } from "./ui/render.js";
import { createGameController } from "./app/gameController.js";

const appElement = document.querySelector("#app");

if (appElement) {
  const controller = createGameController();
  const ui = renderUI(appElement);

  ui.renderLayout();
  ui.renderState(controller.getState());
  ui.renderHumanShips(controller.getState().human.gameboard);
}
