export function initHandlers(appElement, ui, game) {
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
}
