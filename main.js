// const prompt = require("prompt-sync")({ sigint: true });

// const Gameboard = {
//   board:[ 
//     " ", " ", " ",
//     " ", " ", " ",
//     " ", " ", " "
//   ],

//   winnings:[
//     // rows
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],

//     // columns
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],

//     // diagonals
//     [0, 4, 8],
//     [2, 4, 6]
//   ],

//   boardgame() {
//     return this.board;
//   },

//   checkWins() {
//     // wins = this.winnings;

//     for(win of this.winnings) {
//       const [a, b, c] = win;

//       if(this.board[a] !== ' ' && this.board[a] === this.board[b] && this.board[b] === this.board[c]){
//         return true;
//       }
//     }
//     return false;
//   },

//   checkTie() {
//     for(board of this.board) {
//       if(board === ' ') {
//         return false;
//       }
//     }
//     return true;
//   },

//   taken(playerPick) {
//     return this.board[playerPick] != ' ';
//   },

//   invalidInput(playerPick) {
//     if(playerPick > 9 || playerPick < 0){
//       return true;
//     }
//   }

// };

// const Players = {

//   player: 'X',

//   switchPlayers() {
//     if (Players.player === 'X') {
//       Players.player = 'O';
//     }
//     else {
//       Players.player = 'X'
//     }
//   }
// };

// const Game = {
//   start() {

//     let board = Gameboard.boardgame();

//     while(!Gameboard.checkTie()){

//       console.log(board);

//       let pick = prompt("player " + Players.player + " choose a number (0-8): ");

//       if(Gameboard.taken(pick) == true || Gameboard.invalidInput(pick) == true) {
//         console.log('invalid input or you cannot choose this space. pick a different cell.');
//       }
//       else {
//         board[pick] = Players.player;

//         if(Gameboard.checkWins() == true) {
//           console.log(board);
//           console.log('player ' + Players.player + ' won');
//           break;
//         }

//         Players.switchPlayers();
//       }
//     }

//     if(Gameboard.checkTie() == true && Gameboard.checkWins() == false) {
//       console.log(board);
//       console.log('this game is a tie');
//     } 
//   }
// };

// Game.start();



const Gameboard = {
  board:[ 
    document.getElementById("cell-1").innerHTML, document.getElementById("cell-2").innerHTML, document.getElementById("cell-3").innerHTML,
    document.getElementById("cell-4").innerHTML, document.getElementById("cell-5").innerHTML, document.getElementById("cell-6").innerHTML,
    document.getElementById("cell-7").innerHTML, document.getElementById("cell-8").innerHTML, document.getElementById("cell-9").innerHTML,
  ],

  winnings:[
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonals
    [0, 4, 8],
    [2, 4, 6]
  ],

  boardgame() {
    return this.board;
  },

  checkWins() {
    for(win of this.winnings) {
      const [a, b, c] = win;

      if(this.board[a] !== '' && this.board[a] === this.board[b] && this.board[b] === this.board[c]){
        return true;
      }
    }
    return false;
  },

  checkTie() {
    for(const board of this.board) {
      if(board === '') {
        return false;
      }
    }
    return true;
  },

  taken(playerPick) {
    return playerPick.innerHTML === 'X' || playerPick.innerHTML === 'O';
  }
};

const Players = {

  player: 'X',

  switchPlayers() {
    this.player = (this.player === 'X') ? 'O' : 'X';
  }
};

const Game = {
  gameOver: false,

  start() {
    const leftInstructions = document.getElementById("left-instructions");
    const rightInstructions = document.getElementById("right-instructions");
    const cells = document.getElementById("cells");

    let board = Gameboard.boardgame();

    leftInstructions.innerHTML = "Player " + Players.player + " turn!";

    function cellsClicked(e) {
      if (this.gameOver) return;

      // const cell = e.target.id;
      // const index = parseInt(cell.split("-")[1]) - 1;

      // const clickedCell = document.getElementById(cell);

      const cell = e.target;
      const index = parseInt(cell.id.split("-")[1]) - 1;

      leftInstructions.innerHTML = "Player " + Players.player + " turn!";

      if(!Gameboard.taken(cell)) {
        cell.innerHTML = Players.player;
        board[index] = Players.player;

        console.log(board);
        
        if(Gameboard.checkWins()) {
          rightInstructions.innerHTML = "Winner: Player " + Players.player;
          leftInstructions.innerHTML = '';
          this.gameOver = true;
        }
        else if(Gameboard.checkTie() && Gameboard.checkWins() == false) {
          rightInstructions.innerHTML = "Tie!";
          leftInstructions.innerHTML = '';
          this.gameOver = true;
        } else {
          Players.switchPlayers();
          leftInstructions.innerHTML = "Player " + Players.player + " turn!";
        }
      } else {
        leftInstructions.innerHTML = "Pick a different box! Player " + Players.player + " turn!";
      }

    };

    cells.addEventListener("click", cellsClicked);
  }
};

Game.start();