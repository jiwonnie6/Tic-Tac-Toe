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
    // return playerPick.innerHTML !== "";
    return playerPick.innerHTML == 'X' || playerPick.innerHTML == 'O';
  }
};

const Players = {
  player:null,
  symbols:{},

  switchPlayers(player1, player2) {
    this.player = (this.player === player1) ? player2 : player1;
  }
};

const Game = {
  gameOver:false,

  start() {
    console.log("game started");
    const leftInstructions = document.getElementById("left-instructions");
    const cells = document.getElementById("cells");

    let board = Gameboard.boardgame();

    let player1 = '';
    let player2 = '';

    Players.symbols[player1] = '';
    Players.symbols[player2] = '';
    
    // start button click
    document.getElementById("startButton").addEventListener("click", (e) => {
      // console.log('start button clicked');
      console.log("Before starting the game - Player: ", Players.player);
      document.getElementById("start").style.visibility = "hidden";
      document.getElementById("playerInputs").style.visibility = "visible";
    }, {once:true}); 

    //lets play button click
    document.getElementById("playButton").addEventListener("click", (e) => {
      document.getElementById("playerInputs").style.visibility = "hidden";
      document.getElementById("left-instructions").style.visibility = "visible";

      console.log('playbutton clicked');
      player1 = document.getElementById("player1-name").value;
      player2 = document.getElementById("player2-name").value;

      console.log("player1 = " + player1);
      console.log("player2 = " + player2);

      Players.symbols[player1] = 'X';
      Players.symbols[player2] = 'O';

      console.log("player1 symbol = " + Players.symbols[player1]);
      console.log("player2 symbol = " + Players.symbols[player2]);

      console.log("Before switching players - Player: ", Players.player);
      Players.switchPlayers(player1, player2);
      leftInstructions.innerHTML =  "Player " + Players.player + " turn!</br>" + "You are " + Players.symbols[Players.player] + ".";
      console.log("After switching players - Player: ", Players.player);
    });
    
    // click on cells
    cells.addEventListener("click", (e) => {
      if(Game.gameOver) return;

      console.log("cell is clicked");

      const cell = e.target;
      const index = parseInt(cell.id.split("-")[1]) - 1;

      if(!Gameboard.taken(cell)) {
        console.log("cell is not taken");
        cell.innerHTML = Players.symbols[Players.player];
        board[index] = Players.player;

        console.log(board);
        
        if(Gameboard.checkWins()) {
          leftInstructions.innerHTML = "Winner: Player " + Players.player;
          console.log("winner= player" + Players.player);
          document.getElementById("restartButton").style.visibility = "visible";
          Game.gameOver = true;
        } else if(Gameboard.checkTie() && Gameboard.checkWins() == false) {
          leftInstructions.innerHTML = "Tie!";
          document.getElementById("restartButton").style.visibility = "visible";
          Game.gameOver = true;
        } else {
          console.log("beofre switching players - Player: ", Players.player);
          Players.switchPlayers(player1, player2);
          console.log("After switching players - Player: ", Players.player);
          leftInstructions.innerHTML = "Player " + Players.player + " turn!</br>" + "You are " + Players.symbols[Players.player] + ".";;
        }
      } 
      // else {
      //     console.log("cell is taken.");
      //     leftInstructions.innerHTML = "Pick a different box! It is still player " + Players.player + " turn!";
      // }
    });

    document.getElementById("restartButton").addEventListener("click", (e) => {
      Game.restart();
      // Game.start();
    });   
  },

  restart() {
    Game.gameOver = false;

    Players.player = null;
    Players.symbols = {};

    const cells = document.getElementById("cells");
    cells.querySelectorAll("div").forEach((cell, index) => {
      cell.innerHTML = "";
      cell.classList.remove("winning-combination");

      Gameboard.board[index] = '';
    });

    document.getElementById("player1-name").value = "";
    document.getElementById("player2-name").value = "";

    document.getElementById("left-instructions").innerHTML = "";

    document.getElementById("start").style.visibility = "visible";
    document.getElementById("playerInputs").style.visibility = "hidden";
    document.getElementById("restartButton").style.visibility = "hidden";
    document.getElementById("left-instructions").style.visibility = "hidden";

    // Players.player = 'player1';
    Game.start();
  }
};

Game.start();