const prompt = require("prompt-sync")({ sigint: true });

const Gameboard = {
  board:[ 
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
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
    // wins = this.winnings;

    for(win of this.winnings) {
      const [a, b, c] = win;

      if(this.board[a] !== ' ' && this.board[a] === this.board[b] && this.board[b] === this.board[c]){
        return true;
      }
    }
    return false;
  },

  checkTie() {
    for(board of this.board) {
      if(board === ' ') {
        return false;
      }
    }
    return true;
  },

  taken(playerPick) {
    return this.board[playerPick] != ' ';
  },

  invalidInput(playerPick) {
    if(playerPick > 9 || playerPick < 0){
      return true;
    }
  }

};

const Players = {

  player: 'X',

  switchPlayers() {
    if (Players.player === 'X') {
      Players.player = 'O';
    }
    else {
      Players.player = 'X'
    }
  }
};

const Game = {
  start() {

    let board = Gameboard.boardgame();

    while(!Gameboard.checkTie()){

      console.log(board);

      let pick = prompt("player " + Players.player + " choose a number (0-8): ");

      if(Gameboard.taken(pick) == true || Gameboard.invalidInput(pick) == true) {
        console.log('invalid input or you cannot choose this space. pick a different cell.');
      }
      else {
        board[pick] = Players.player;

        if(Gameboard.checkWins() == true) {
          console.log(board);
          console.log('player ' + Players.player + ' won');
          break;
        }

        Players.switchPlayers();
      }
    }

    if(Gameboard.checkTie() == true && Gameboard.checkWins() == false) {
      console.log(board);
      console.log('this game is a tie');
    } 
  }
};

Game.start();
