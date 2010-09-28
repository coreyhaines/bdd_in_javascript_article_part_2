describe("BallDragger#start", function() {
  var gameBoard, originalGameBoardStructure, ballDraggerGame;

  beforeEach(function() {
    originalGameBoardStructure = $("#game");
    gameBoard = originalGameBoardStructure.clone();
    originalGameBoardStructure.replaceWith(gameBoard);

    ballDraggerGame = BallDragger.initialize(gameBoard);
  });

  beforeEach(function() {
    this.addMatchers(CustomMatchers);
  });

  afterEach(function(){
    gameBoard.replaceWith(originalGameBoardStructure);
  });

  describe("with no ball on field", function() {
    it("creates a ball in the start box", function() {
      var ball, startBox;
      ballDraggerGame.start();

      ball = gameBoard.find("#field #ball");
      startBox = gameBoard.find("#field #ball-start");

      expect(ball).toBeInside(startBox);
    });
  });
});

xdescribe("BallDragger#dropped", function(){
  var gameBoard, originalGameBoardStructure, ballDraggerGame;

  beforeEach(function() {
    originalGameBoardStructure = $("#game");
    gameBoard = originalGameBoardStructure.clone();
    originalGameBoardStructure.replaceWith(gameBoard);

    ballDraggerGame = BallDragger.initialize(gameBoard);
  });

  afterEach(function(){
    gameBoard.replaceWith(originalGameBoardStructure);
  });

  describe("ball is in the destination", function() {
    it("sets the results display to 'You Win'", function() {
      var ball, destinationBox, resultDisplay;
      ballDraggerGame.start();

      ball = gameBoard.find("#field #ball");
      destinationBox = gameBoard.find("#field #ball-destination");

      ball.css("left", destinationBox.position().left + 2);
      ball.css("top", destinationBox.position().top + 2);

      ballDraggerGame.ballDropped();

      resultDisplay = gameBoard.find("#results");
      expect(resultDisplay.text()).toEqual("You Win!");
    });
  });

  describe("ball is not in the destination", function() {
    it("sets the results display to 'You Lose'", function() {
      var ball, notDestinationBox, resultDisplay;

      ballDraggerGame.start();

      ball = gameBoard.find("#field #ball");
      notDestinationBox = gameBoard.find("#field #ball-not-destination");

      ball.css("left", notDestinationBox.position().left + 2);
      ball.css("top", notDestinationBox.position().top + 2);

      ballDraggerGame.ballDropped();

      resultDisplay = gameBoard.find("#results");
      expect(resultDisplay.text()).toEqual("You Lose");
    });
  });
});
