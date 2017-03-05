/**
 *
 * tic-tac-toe.minimax.js
 * ========================================== *
 *  
 * title: Tic Tac Toe Game
 * description: tic tac toe minimax
 * version: 0.0.1
 * 
 * ========================================== *
 */

'use strict';

var game = (function() {

  function Game(playersCount) {
    if (this instanceof Game) {

      /**
       * board size 3x3
       * this.board = 3
       */
      this.size = 3;

      /**
       *  board placing =
       *  x/y |  y0  |  y1  |  y2  |
       *  --------------------------
       *   x0 | x0y0 | x0y1 | x0y2 |
       *   x1 | x1y0 | x1y1 | x1y2 |
       *   x2 | x2y0 | x2y1 | x2y2 |
       */
      this.board = [
          [null, null, null],
          [null, null, null],
          [null, null, null]
      ];

      /** 
       *  playersCount = number of players
       *  1: 1 player and AI playing
       *  2: 1 player and 2 player playing  
       */
      this.playersCount = playersCount || 1;

      /**
       * player turn
       * turn = true : player 1 turn
       * turn = false : player 2 turn Or AI turns      
       */
      this.turn = true;

      // number of nodes
      this.nodes = 0;      
    } else {
      return new Game(playersCount);
    }
  }

  Game.prototype = {
    // set board to all null
    restart: function() {
       this.board = this.board.map(function(b) {
          return b.fill(null);
        });
        this.turn = true;
        return this.board;
    },

    /**
     * winner = 
     *  0 : player 1 wins
     *  1 : player 2 wins / AI wins
     * -1 : tie
     */   
    winner: function() {
        var playerSet = [true, false];
        var fullBoard = true;
        for (var k = 0; k < playerSet.length; k++) {
            var p = playerSet[k];
            
            // check board diagonally and anti-diagonally
            var diagonal = true;
            var antiDiagonal = true;
            for (var x = 0; x < 3; x++) {
                if (this.board[x][x] != p) {
                    diagonal = false;
                }
                if (this.board[2 - x][x] != p) {
                    antiDiagonal = false;
                }

                // check board rows and columns
                var row = true;
                var column = true;
                for (var y = 0; y < 3; y++) {
                    if (this.board[x][y] != p) {
                        row = false;
                    }

                    if (this.board[y][x] != p) {
                        column = false;
                    }

                    if (this.board[x][y] == null) {
                        fullBoard = false;
                    }
                }
                if (row || column) {
                    return p ? 1 : 0;
                }
            }
            if (diagonal || antiDiagonal) {
                return p ? 1 : 0;
            }
        }

        // full board check
        if (fullBoard) {
            return -1;
        }
        return null;
    },    

    // player making move
    makeMove: function(x, y) {
      console.log(this.nodes);
      if (this.playersCount == 2) {
        this.board[x][y] = this.turn;
        this.turn = !this.turn;
        return this.board;
      } else {
        this.board = this._makeAIMove(); 
        this.turn = true;              
        return this.board;
      }     
    },

    // AI move
    _makeAIMove: function() {
      this.nodes = 0;
      return this.minimax(false)[1];
    },

    // minimax decision algorithm
    minimax: function(player) {
        this.nodes++;
        var winner = this.winner(this.board);
        if (winner != null) {
            switch(winner) {
                case 1:
                    return [1, this.board] // AI wins
                case 0:
                    return [-1, this.board] // opponent wins
                case -1:
                    return [0, this.board]; // Tie
            }
        } else {
            var nextVal = null; // Next states
            var nextBoard = null;
            
            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    if (this.board[x][y] == null) {
                        this.board[x][y] = player;
                        var value = this.minimax(!player)[0];
                        if ((player && (nextVal == null || value > nextVal)) 
                            || (!player && (nextVal == null || value < nextVal))) {
                              nextBoard = this.board.map(function(arr) {
                                  return arr.slice();
                              });
                              nextVal = value;
                        }
                        this.board[x][y] = null;
                    }
                }
            }
            return [nextVal, nextBoard];
        }
    },

    // get current player 
    player: function() {
      return (this.turn) ? 1 : (this.playersCount == 2 && !this.turn) ? 2 : "AI"; 
    },

    // show board state
    show: function() {
      console.log('-------------')
      console.log('x/y|y0,y1,y2|')
      console.log('-------------')
      console.log(' x0| '+this.board[0][0]+', '+this.board[0][1]+', '+this.board[0][2]+'|')
      console.log(' x1| '+this.board[1][0]+', '+this.board[1][1]+', '+this.board[1][2]+'|')
      console.log(' x2| '+this.board[2][0]+', '+this.board[2][1]+', '+this.board[2][2]+'|')
    }      

  };

  return Game;

})();