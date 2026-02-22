import "./styles.css";
import { createGameController } from "./app/gameController.js";
import { renderUI } from "./ui/render.js";
import { initHandlers } from "./ui/handlers.js";

const appElement = document.querySelector("#app");

if (appElement) {
  let controller = createGameController();
  const ui = renderUI(appElement);

  ui.renderLayout();
  ui.renderStatus(controller.getState());
  ui.renderHumanShips(controller.getState().human.gameboard);

  initHandlers(appElement, ui, {
    getController: () => controller,
    setController: (next) => (controller = next),
    createController: () => createGameController(),
  });
}
