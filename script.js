// Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

// Gameboard module
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setCell = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const getCell = (index) => {
    return board[index];
  };

  const fullBoard = (board) => {
    return !board.includes("");
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setCell, getCell, fullBoard, resetBoard };
})();

// Display the board on the webpage
const DisplayController = (() => {
  const startGame = () => {
    let startButton = document.getElementById("startGame");
    startButton.addEventListener("click", () => {
      let name1 = prompt("What is the first player name : ");
      let name2 = prompt("What is the second player name : ");

      const player1 = Player(name1, "X");
      const player2 = Player(name2, "O");
      let currentPlayer = player1;

      fillBoard();
      addMark(currentPlayer, { player1, player2 });
    });
  };

  const fillBoard = () => {
    let cell;
    for (let index = 0; index < 9; index++) {
      cell = document.getElementById(index);
      cell.innerText = Gameboard.getCell(index);
    }
  };

  const addMark = (currentPlayer, { player1, player2 }) => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.innerText === "") {
          cell.innerText = currentPlayer.marker;
          Gameboard.setCell(cell.id, currentPlayer.marker);
          console.log(
            `${currentPlayer.name} put a ${currentPlayer.marker} on the ${cell.id} index on the board.`
          );
          let end = endGame(currentPlayer);

          currentPlayer = switchPlayers(currentPlayer, { player1, player2 });
        }
      });
    });
  };

  const reset = () => {
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
      Gameboard.resetBoard();
      fillBoard();
    });
  };

  return { startGame, fillBoard, addMark, reset };
})();

// Switching players function
function switchPlayers(currentPlayer, { player1, player2 }) {
  if (currentPlayer === player1) return player2;
  else return player1;
}

function markersAlign(board) {
  if (board[0] === board[1] && board[1] === board[2] && board[0] !== "")
    return true;
  if (board[3] === board[4] && board[4] === board[5] && board[3] !== "")
    return true;
  if (board[6] === board[7] && board[7] === board[8] && board[6] !== "")
    return true;
  if (board[0] === board[3] && board[3] === board[6] && board[0] !== "")
    return true;
  if (board[1] === board[4] && board[4] === board[7] && board[1] !== "")
    return true;
  if (board[2] === board[5] && board[5] === board[8] && board[2] !== "")
    return true;
  if (board[0] === board[4] && board[4] === board[8] && board[0] !== "")
    return true;
  if (board[2] === board[4] && board[4] === board[6] && board[2] !== "")
    return true;
  return false;
}

function endGame(currentPlayer) {
  if (markersAlign(Gameboard.getBoard())) {
    console.log(`${currentPlayer.name} won!`);
    return true;
  } else {
    if (Gameboard.fullBoard(Gameboard.getBoard())) {
      console.log("Its a tie!");
      return true;
    }
  }
  return false;
}

function reset() {
  const reset = document.getElementById("reset");
  reset.addEventListener("click", () => {
    Gameboard.resetBoard();
    DisplayController.fillBoard();
  });
}

DisplayController.startGame();
DisplayController.reset();
