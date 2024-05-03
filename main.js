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
    return playerPick.innerHTML == 'X' || playerPick.innerHTML == 'O';
  }
};

const Players = {
  player:null,
  symbol:null,

  switchPlayers(player1, player2) {
    this.player = (this.player === player1) ? player2 : player1;
    this.symbol = (this.symbol === 'X') ? 'O': 'X';
  }
};

const Game = {
  gameOver:false,

  start() {
    const playerInputs = document.getElementById("playerInputs");
    const leftInstructions = document.getElementById("left-instructions");
    const rightInstructions = document.getElementById("right-instructions");
    const middleInstructions = document.getElementById("middle-instructions");
    const restartButton = document.getElementById("restartButton");
    const cells = document.getElementById("cells");

    let board = Gameboard.boardgame();

    let player1 = '';
    let player2 = '';
    
    // start button click
    document.getElementById("startButton").addEventListener("click", (e) => {
      document.getElementById("start").style.visibility = "hidden";
      document.getElementById("playerInputs").style.visibility = "visible";
    }, {once:true}); 

    //lets play button click
    document.getElementById("playButton").addEventListener("click", (e) => {
      player1 = document.getElementById("player1-name").value;
      player2 = document.getElementById("player2-name").value;

      if(player1 == player2 && player1 != '' && player2 != '') {
        window.alert("Player names cannot be the same.");
      } 
      else if (player1 == '' || player2 == '') {
        window.alert("Please enter in all fields.");
      }
      else {
        playerInputs.style.visibility = "hidden";
        leftInstructions.style.visibility = "visible";
        rightInstructions.style.visibility = "visible";
        middleInstructions.style.visibility = "visible";
        restartButton.style.visibility = "visible";
        cells.style.visibility = "visible";

        Players.player = null;
        Players.symbol = null;

        // player1 = document.getElementById("player1-name").value;
        // player2 = document.getElementById("player2-name").value;

        Players.switchPlayers(player1, player2);
    
        middleInstructions.innerHTML =  "Player " + Players.player + " turn!";
        leftInstructions.innerHTML = "<span class='logo'>X</span><br>Player " + player1;
        rightInstructions.innerHTML =  "<span class='logo'>O</span><br>Player " + player2;
      }
    });

    // click on cells
    cells.querySelectorAll("div").forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if(Game.gameOver) return;
  
        const cell = e.target;
        const index = parseInt(cell.id.split("-")[1]) - 1;
  
        if(!Gameboard.taken(cell)) {
          cell.innerHTML = Players.symbol;
          board[index] = Players.player;
  
          console.log(board);
  
          if(Gameboard.checkWins()) {
            middleInstructions.innerHTML = "Winner: Player " + Players.player;
            document.getElementById("restartButton").style.visibility = "visible";
            Game.gameOver = true;
          } else if(Gameboard.checkTie() && Gameboard.checkWins() == false) {
            middleInstructions.innerHTML = "Tie!";
            document.getElementById("restartButton").style.visibility = "visible";
            Game.gameOver = true;
          } else {
            Players.switchPlayers(player1, player2);
            // middleInstructions.innerHTML =  "Player " + Players.player + " turn!</br>" + "You are " + Players.symbol + ".";
            middleInstructions.innerHTML =  "Player " + Players.player + " turn!";
          }
        } 
      });
    });

    document.getElementById("restartButton").addEventListener("click", (e) => {
      Game.restart();
      Game.start();
    });   
  },

  restart() {
    Game.gameOver = false;

    Players.player = null;
    Players.symbol = null;

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
    document.getElementById("cells").style.visibility = "hidden";
    document.getElementById("left-instructions").style.visibility = "hidden";
    document.getElementById("middle-instructions").style.visibility = "hidden";
    document.getElementById("right-instructions").style.visibility = "hidden";
  }
};

Game.start();