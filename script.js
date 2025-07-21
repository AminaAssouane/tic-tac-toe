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

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setCell, resetBoard };
})();

// Starting game function
function startGame(name1, name2) {
  Gameboard.resetBoard();
  const player1 = Player(name1, "X");
  const player2 = Player(name2, "O");

  return { player1, player2 };
}

function playRound(player, index) {
  Gameboard.setCell(index, player.marker);
  console.log(
    `${player.name} put a ${player.marker} on the ${index} index on the board.`
  );
  return player;
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

function fullBoard(board) {
  return !board.includes("");
}

function endGame(currentPlayer) {
  if (markersAlign(Gameboard.getBoard())) {
    console.log(`${currentPlayer.name} won!`);
    return true;
  } else {
    if (fullBoard(Gameboard.getBoard())) {
      console.log("Its a tie!");
      return true;
    }
  }
  return false;
}

function playGame() {
  const Players = startGame("Amina", "Youcef");
  endGame(playRound(Players.player1, 0));
  endGame(playRound(Players.player2, 4));
  endGame(playRound(Players.player1, 3));
  endGame(playRound(Players.player2, 5));
  endGame(playRound(Players.player1, 6));
}


