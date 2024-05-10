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
  player1:'',
  player2:'',
  gameOver:false,

  start() {
    // start button click
    Game.startButtonClick();

    // play button click // cells click
    Game.playButtonClick();

    // restart button click
    document.getElementById("restartButton").addEventListener("click", (e) => {
      Game.restart();
      Game.start();
    }, { once: true });   
  },

  startButtonClick() {
    document.getElementById("startButton").addEventListener("click", (e) => {
      document.getElementById("start").style.visibility = "hidden";
      document.getElementById("playerInputs").style.visibility = "visible";
    }, {once:true}); 
  },

  playButtonClick() {
    const playerInputs = document.getElementById("playerInputs");
    const leftInstructions = document.getElementById("left-instructions");
    const rightInstructions = document.getElementById("right-instructions");
    const middleInstructions = document.getElementById("middle-instructions");
    const restartButton = document.getElementById("restartButton");
    const cells = document.getElementById("cells");

    const playButtonHandler = () => {
      Game.player1 = document.getElementById("player1-name").value;
      Game.player2 = document.getElementById("player2-name").value;

      if(Game.player1 == Game.player2 && Game.player1 != '' && Game.player2 != '') {
        window.alert("Player names cannot be the same.");
        console.log("names cannot be same");
      } 
      else if (Game.player1 == '' || Game.player2 == '') {
        window.alert("Please enter in all fields.");
        console.log("empty field");
      }
      else if (Game.player1.length > 9 || Game.player2.length > 9) {
        window.alert("10 character limit.");
        console.log("10 character limit");
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

        Players.switchPlayers(Game.player1, Game.player2);
    
        middleInstructions.innerHTML =  "Player " + Players.player + " turn!";
        leftInstructions.innerHTML = "<span class='logo'>X</span><br>Player " + Game.player1;
        rightInstructions.innerHTML =  "<span class='logo'>O</span><br>Player " + Game.player2;

        document.getElementById("playButton").removeEventListener("click", playButtonHandler);

        Game.cellClicked();
      }
    };
    document.getElementById("playButton").addEventListener("click", playButtonHandler);
  },

  cellClicked() {
    const middleInstructions = document.getElementById("middle-instructions");
    const cells = document.getElementById("cells");

    cells.querySelectorAll("div").forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if(Game.gameOver) return;
  
        const cell = e.target;
        const index = parseInt(cell.id.split("-")[1]) - 1;
  
        if(!Gameboard.taken(cell)) {
          cell.innerHTML = Players.symbol;
          Gameboard.board[index] = Players.symbol;
  
          if(Gameboard.checkWins()) {
            middleInstructions.innerHTML = "Winner: Player " + Players.player;
            document.getElementById("restartButton").style.visibility = "visible";
            Game.gameOver = true;
          } else if(Gameboard.checkTie() && Gameboard.checkWins() == false) {
            middleInstructions.innerHTML = "Tie!";
            document.getElementById("restartButton").style.visibility = "visible";
            Game.gameOver = true;
          } else {
            Players.switchPlayers(Game.player1, Game.player2);
            middleInstructions.innerHTML =  "Player " + Players.player + " turn!";
            console.log(Players.player);
          }
        } 
      });
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