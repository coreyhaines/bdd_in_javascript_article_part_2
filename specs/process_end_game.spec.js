describe("BallDragger#processEndGame", function() {
  var gameBoard, originalGameBoardStructure, ballDraggerGame;

  beforeEach(function() {
    originalGameBoardStructure = $("#game");
    gameBoard = originalGameBoardStructure.clone();
    originalGameBoardStructure.replaceWith(gameBoard);
  });

  afterEach(function(){
    gameBoard.replaceWith(originalGameBoardStructure);
  });

  beforeEach(function() {
    ballDraggerGame = BallDragger.initialize(gameBoard);
  });

  function setBallDown(intoThisSelector) {
    var ball, intoThis;

    ball = gameBoard.find("#field #ball");
    intoThis = gameBoard.find(intoThisSelector);

    ball.css("left", intoThis.position().left + 2);
    ball.css("top",  intoThis.position().top + 2);
  }

  describe("ball is in the destination", function() {
    it("sets the results display to 'You Win!'", function() {
      var ball, destinationBox, resultDisplay;
      ballDraggerGame.start();

      setBallDown("#field #ball-destination");

      ballDraggerGame.processEndGame();

      resultDisplay = gameBoard.find("#results");
      expect(resultDisplay.text()).toEqual("You Win!");
    });
  });

  describe("ball is outside the destination", function() {
    it("sets the results display to 'You Lose!'", function() {
      var ball, destinationBox, resultDisplay;
      ballDraggerGame.start();

      setBallDown("#field #ball-outside-destination");

      ballDraggerGame.processEndGame();

      resultDisplay = gameBoard.find("#results");
      expect(resultDisplay.text()).toEqual("You Lose!");
    });
  });
});
