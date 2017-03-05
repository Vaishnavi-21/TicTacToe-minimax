
$(document).ready(function() {

    var g =  game();

    function updateMove() {
        updateButtons(g.board);
        
        var winner = g.winner(g.board);
        
        $("#winner")
          .text(winner == 1 ? "You Won!" : (winner == 0) ? "AI Won!" : winner == -1 
                                ? "Tie!" : "");
    }

    function updateButtons(board) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                $("#x" + i + "y" + j)
                  .text(board[i][j] == true ? "X" : board[i][j] == false 
                                                  ? "O" : "");
            }
        }
    }    

    updateMove();

    $("button").click(function() {
        var cell = $(this).attr("id");
        var row = cell[1];
        var col = cell[3];
        if (g.playersCount == 2 || g.turn) {
            g.board[row][col] = true;
            updateMove(g.makeMove(row, col));
            g.show();
        }
    });

    $("#restart").click(function() {
      updateMove(g.restart());
    });

});