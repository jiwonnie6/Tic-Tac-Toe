const Gameboard = {
  board:[ 
    document.getElementById("cell-1").innerHTML, document.getElementById("cell-2").innerHTML, document.getElementById("cell-3").innerHTML,
    document.getElementById("cell-4").innerHTML, document.getElementById("cell-5").innerHTML, document.getElementById("cell-6").innerHTML,
    document.getElementById("cell-7").innerHTML, document.getElementById("cell-8").innerHTML, document.getElementById("cell-9").innerHTML
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

      if(this.board[a] !== '' && this.board[a] === this.board[b] && this.board[b] === this.board[c]) {

        // document.getElementById(`cell-${a}`).classList.add("winning-combination");
        // document.getElementById(`cell-${b}`).classList.add("winning-combination");
        // document.getElementById(`cell-${c}`).classList.add("winning-combination");
        document.querySelector(`[data-index="${a}"]`).classList.add("winning-combination");
        document.querySelector(`[data-index="${b}"]`).classList.add("winning-combination");
        document.querySelector(`[data-index="${c}"]`).classList.add("winning-combination");
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
    return playerPick.innerHTML !== '';
  }
};

const Players = {
  player: null,

  switchPlayers(player1, player2) {
    this.player = (this.player === player1) ? player2 : player1;
  }
};

const Game = {
  gameOver: false,

  start() {
    const leftInstructions = document.getElementById("left-instructions");
    const rightInstructions = document.getElementById("right-instructions");
    const cells = document.getElementById("cells");

    let board = Gameboard.boardgame();

    document.getElementById("playButton").addEventListener("click", (e) => {
      console.log('playbutton clicked');
      const player1 = document.getElementById("player1-name").value;
      const player2 = document.getElementById("player2-name").value;

      Players.switchPlayers(player1, player2);
      leftInstructions.innerHTML = "Player " + Players.player + " turn!";

      function cellsClicked(e) {
        if (this.gameOver) return;
  
        const cell = e.target;
        const index = parseInt(cell.id.split("-")[1]) - 1;
  
        if(!Gameboard.taken(cell)) {
          cell.innerHTML = Players.player;
          board[index] = Players.player;
  
          console.log(board);
          
          if(Gameboard.checkWins()) {
            rightInstructions.innerHTML = "Winner: Player " + Players.player;
            leftInstructions.innerHTML = '';
            this.gameOver = true;
          } else if(Gameboard.checkTie() && Gameboard.checkWins() == false) {
            rightInstructions.innerHTML = "Tie!";
            leftInstructions.innerHTML = '';
            this.gameOver = true;
          } else {
            Players.switchPlayers(player1, player2);
            leftInstructions.innerHTML = "Player " + Players.player + " turn!";
          }
        } else {
          leftInstructions.innerHTML = "Pick a different box! Player " + Players.player + " turn!";
        }
      };
      cells.addEventListener("click", cellsClicked.bind(this));
    });
  }
};

Game.start();