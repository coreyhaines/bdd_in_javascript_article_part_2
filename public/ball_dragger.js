var BallDragger = {
  initialize: function(gameBoard) {
    var field, startBox, startBoxPosition,
        destinationBox, destinationBoxPosition,
        resultDisplay, ball, game;
    field = gameBoard.find("#field");

    startBox = field.find("#ball-start");
    startBoxPosition = startBox.position();

    destinationBox = field.find("#ball-destination");

    ball = $("<div id='ball'></div>");
    resultDisplay = gameBoard.find("#results");


    function inside(element, thisContainer) {
      var elementPosition, thisContainerPosition;

      thisContainerPosition = thisContainer.position();
      elementPosition = element.position();

      console.log(elementPosition);
      console.log(thisContainerPosition);

      inside = (elementPosition.left >= thisContainerPosition.left) &&
      (elementPosition.left <= thisContainerPosition.left + thisContainer.width()) &&
      (elementPosition.top >= thisContainerPosition.top) &&
      (elementPosition.top <= thisContainerPosition.top + thisContainer.height());

      return inside;
    }

    function hasWon() {
      return inside(ball, destinationBox);
    }

    game = {
      start: function() {
        ball.appendTo(field);
        ball.css("left", startBoxPosition.left);
        ball.css("top", startBoxPosition.top);
      },
      ballDropped: function() {
        if(hasWon()){
          resultDisplay.text("You Win!");
        }else{
          resultDisplay.text("You Lose");
        }
      }
    };

    ball.draggable({containment:"#field",
                  stop: game.ballDropped});

    return game;
  }
};
