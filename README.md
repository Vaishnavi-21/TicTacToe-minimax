# Tic Tac Toe Minimax

## Introduction

Tic Tac Toe game implementation with minimax decision algorithm.
Single player game in which opponent will be an AI. AI will use minimax algorithm for making decision by traversing all possible moves ahead of current of his opponent.
While in Multi player game opponent won't be an AI.

## Usage

Game class will expose various methods to play game.

Get instance of game

```js
// single player
var g = game();

// multi player
var g = game(2);
```

Board placing

```js
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
```

Some of available methods

- player turn `turn`. return true: first player turn, false: second player/AI turn depends on game is single player or multi player

```js
// player turn
g.turn;
```

- player making move `makeMove(x, y)` where x and y is player move position

```js
// e.g.
g.makeMove(0, 1);

// result
this.board = [
    [null, true, null],
    [null, null, null],
    [null, null, null]
];
```

- `winner()` get winner.

```js
g.winner();
/* result
 *  0 : player 1 wins
 *  1 : player 2 wins / AI wins
 * -1 : tie
 */
```
- `minimax(player)`,  Minimax is used for AI for making decision for next move for AI. `player` will be `false` in case of AI's move.

```js
g.minimax(false);
```

For more other utility methods - [tic-tac-toe-minimax](https://github.com/pradeep1991singh/TicTacToe-minimax/blob/master/src/tic-tac-toe.minimax.js)