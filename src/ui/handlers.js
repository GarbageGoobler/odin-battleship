export function initHandlers(appElement, ui, game) {
  // new game button
  const newGameButton = appElement.querySelector(".new-game-button");

  newGameButton.addEventListener("click", () => {
    const nextController = game.createController();

    game.setController(nextController);

    // clear old board visuals
    const cells = appElement.querySelectorAll(".cell");
    for (const cell of cells) {
      cell.textContent = "";
      cell.classList.remove("hit-cell", "miss-cell", "occupied-cell");
    }
    // paint fresh state
    ui.renderHumanShips(nextController.getState().human.gameboard);
    ui.renderStatus(nextController.getState());
  });

  // computer board
  const boards = appElement.querySelector(".game-boards");
  if (!boards) return;

  boards.addEventListener("click", (event) => {
    const cell = event.target.closest('.cell[data-board="computer"]');
    if (!cell) return;

    const controller = game.getController();
    const state = controller.getState();

    if (state.winner || state.currentTurn !== "human") return;

    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);

    // do the attack
    const humanResult = controller.handleHumanInput([x, y]);
    ui.renderStatus(controller.getState());

    if (humanResult === false) return;

    ui.renderAttack([x, y], "computer", humanResult);

    if (controller.getState().winner) return;

    // computer attacks back with time lag
    setTimeout(() => {
      const currentController = game.getController();
      const currentState = currentController.getState();
      if (currentState.winner || currentState.currentTurn !== "computer")
        return;
      const computerResult = currentController.handleComputerTurn();
      if (computerResult === false) return;
      ui.renderStatus(currentController.getState());
      ui.renderAttack(computerResult.coord, "player", computerResult.result);
    }, 600);
  });
}
