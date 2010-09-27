var SpecHelpers = {};

SpecHelpers.Initialize = function(gameBoard){
  var ballDraggerGame;
  ballDraggerGame = BallDragger.initialize(gameBoard);
  gameBoard.find("#start-button").click(ballDraggerGame.start);
  return {board: gameBoard, game: ballDraggerGame};
};

SpecHelpers.useClonedFixture = function(suite, selector) {
  var originalElement, clonedElement;
  suite.beforeEach(function() {
    originalElement = $(selector);
    clonedElement = originalElement.clone();
    originalElement.replaceWith(clonedElement);
  });

  suite.afterEach(function() {
    clonedElement.replaceWith(originalElement);
  });

  return clonedElement;
};
