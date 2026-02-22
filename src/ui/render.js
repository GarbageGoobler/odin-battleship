export function renderUI(appElement) {
  function renderLayout() {
    const controls = document.createElement("div");
    controls.className = "game-controls";

    const gameBoards = document.createElement("div");
    gameBoards.className = "game-boards";

    const statusDisplay = document.createElement("p");
    statusDisplay.className = "status-display";
    statusDisplay.textContent = "Your turn";

    const newGameButton = document.createElement("button");
    newGameButton.type = "button";
    newGameButton.className = "new-game-button";
    newGameButton.textContent = "New Game";

    const playerBoard = createBoard("player");
    const computerBoard = createBoard("computer");

    controls.append(statusDisplay, newGameButton);
    gameBoards.append(playerBoard, computerBoard);
    appElement.append(controls);
    appElement.append(gameBoards);
  }

  function renderHumanShips(humanGameBoard) {
    for (const key of humanGameBoard.occupied.keys()) {
      const [x, y] = key.split(",");

      const cell = appElement.querySelector(
        `.cell[data-board="player"][data-x="${x}"][data-y="${y}"]`,
      );

      if (cell) cell.classList.add("occupied-cell");
    }
  }

  function renderStatus(state) {
    const statusDisplay = appElement.querySelector(".status-display");
    if (!statusDisplay) return;
    statusDisplay.textContent = state.message;
  }

  function renderAttack([x, y], boardName, result) {
    const cell = appElement.querySelector(
      `.cell[data-board="${boardName}"][data-x="${x}"][data-y="${y}"]`,
    );

    if (!cell) return;

    if (result === "hit") {
      cell.textContent = "X";
      cell.classList.add("hit-cell");
    } else if (result === "miss") {
      cell.textContent = "•";
      cell.classList.add("miss-cell");
    }
  }

  function createBoard(boardName) {
    const boardSection = document.createElement("section");
    boardSection.className = "board-section";

    const boardTitle = document.createElement("h2");
    boardTitle.className = "board-title";
    boardTitle.textContent =
      boardName === "computer" ? "Computer Board" : "Human Board";

    const grid = document.createElement("div");
    grid.className = "board-grid";

    // hard coding boardSize cos I can't be bothered
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "cell";
        cell.dataset.board = boardName;
        cell.dataset.x = String(x);
        cell.dataset.y = String(y);
        grid.append(cell);
      }
    }

    boardSection.append(boardTitle, grid);
    return boardSection;
  }

  return { renderLayout, renderStatus, renderHumanShips, renderAttack };
}
