// initial game data
let players = ["X", "0"];
let currentPlayer = players[0];
let grid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

// grab board cells in DOM
let cells = document.querySelectorAll("td");

// attach event listeners for clicking on cells
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
}


function handleClick(e) {
  let cell = e.target;
  if (!e.target.classList.contains("disabled")) {
    cell.innerText = currentPlayer;
    cell.classList.add("disabled");
  }
}

/**
 * Given a grid, checks for a winner. The game has a winner when
 * there is a row, column, or diagonal that are either all "X" or all "O".
 *
 * @param {Array} grid - in-memory tic tac toe board
 * @returns {Boolean} true if the game has a winner, false otherwise
 */
function checkForWinner(grid, player) {
  for (let i = 0; i < grid.length; i++) {
    // check rows
    if (grid[i][0] === player && grid[i][1] === player && grid[i][2] === player) {
      return true;
    }

    // check columns
    if (grid[0][i] === player && grid[1][i] === player && grid[2][i] === player) {
      return true;
    }
  }

  // check diagonals
  if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) {
    return true;
  }

  if (grid[0][2] === player && grid[1][1] === player && grid[2][0] === player) {
    return true;
  }

  // no winner
  return false;
}
