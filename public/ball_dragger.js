var BallDragger = {
  initialize: function(gameBoard) {
    var field, ball, game,
        startBox, startBoxPosition,
        destinationBox, destinationBoxPosition;

    field = gameBoard.find("#field");

    startBox = field.find("#ball-start");
    startBoxPosition = startBox.position();
    destinationBox = field.find("#ball-destination");
    destinationBoxPosition = destinationBox.position();

    ball = $("<div id='ball'></div>");

    function ballIsInsideDestination() {
      ballPosition = ball.position();

      inside = (ballPosition.left >= destinationBoxPosition.left) &&
        (ballPosition.left <= destinationBoxPosition.left + destinationBox.width()) &&
        (ballPosition.top >= destinationBoxPosition.top) &&
        (ballPosition.top <= destinationBoxPosition.top + destinationBox.height());

      return inside;
    }

    game = {
      start: function() {
        ball.appendTo(field);
        ball.css("left", startBoxPosition.left);
        ball.css("top", startBoxPosition.top);
      },
      processEndGame: function processEndGame(event, ui) {
        var resultDisplay = gameBoard.find("#results");
        if(ballIsInsideDestination()){
          resultDisplay.text("You Win!");
        }else{
          resultDisplay.text("You Lose!");
        }
      }
    };

    ball.draggable({containment:"#field",
                  stop: game.processEndGame});

    return game;
  }
};
