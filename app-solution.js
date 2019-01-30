// initial game data
let players = ["X", "0"];
let currentPlayer = players[0];
let grid = [["", "", ""], ["", "", ""], ["", "", ""]];

// grab elements from DOM
let cells = document.querySelectorAll("td");
let table = document.querySelector("table");
let statusArea = document.querySelector("#status");

// attach event listeners for clicking on cells
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
}

// tell the player whose turn it is
setStatus(`${currentPlayer}'s turn.`);

/**
 * Handles clicking on a cell within the game board.
 * Checks to make sure the square is unoccupied;
 * if so, it places the current player's marker and checks for a winner.
 * If the game isn't over, swaps the current player.
 *
 * @param {Object} e - event object
 */
function handleClick(e) {
  let cell = e.target;
  if (!e.target.classList.contains("disabled")) {
    // update the view
    cell.innerText = currentPlayer;
    cell.classList.add("disabled");

    // sync up the in-memory board
    let coords = cell.id.split("|")
    grid[coords[1]][coords[0]] = currentPlayer;

    // check if we're in an end game state
    if (checkForWinner()) {
      endGame(`${currentPlayer} won!`);
    } else if (checkForTie()) {
      endGame("It's a tie!");
    } else {
      togglePlayer();
    }
  }
}

/**
 * Set a visible status in the DOM. Used to show whose turn it is,
 * and when the game is over.
 * 
 * @param {String} text - text to put in the status element
 */
function setStatus(text) {
  statusArea.innerText = text;
}

/**
 * Disables the game board with a message.
 */
function endGame(text) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add("disabled");
  }
  setStatus(text);
}

/**
 * Toggles the current player, based on the global players variable.
 */
function togglePlayer() {
  if (currentPlayer === players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
  setStatus(`${currentPlayer}'s turn.`);
}

/**
 * Checks for a tie based on grid state.
 * A tie exists if the grid is full.
 * 
 * Note that this runs after checkForWinner,
 * so we can assume in this function that we know there is no winner. 
 */
function checkForTie() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "") return false; 
    }
  }
  return true;
}

/**
 * Checks for a winner based on grid state. The game has a winner when
 * there is a row, column, or diagonal that are either all "X" or all "O".
 *
 * @returns {Boolean} true if the game has a winner, false otherwise
 */
function checkForWinner() {
  for (let i = 0; i < grid.length; i++) {
    // check rows
    if (
      grid[i][0] === currentPlayer &&
      grid[i][1] === currentPlayer &&
      grid[i][2] === currentPlayer
    ) {
      return true;
    }

    // check columns
    if (
      grid[0][i] === currentPlayer &&
      grid[1][i] === currentPlayer &&
      grid[2][i] === currentPlayer
    ) {
      return true;
    }
  }

  // check diagonals
  if (
    grid[0][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    return true;
  }

  if (
    grid[0][2] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[2][0] === currentPlayer
  ) {
    return true;
  }

  // no winner
  return false;
}
