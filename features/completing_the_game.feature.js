describe("Moving the ball", function() {
  var gameBoard, originalGameBoardStructure, ballDraggerGame;
  function InitializeGame(){
    ballDraggerGame = BallDragger.initialize(gameBoard);
    gameBoard.find("#start-button").click(ballDraggerGame.start);
  }

  function PressStart(){
    gameBoard.find("#start-button").click();
  }

  function MoveBallTo(locationKey){
    var locationLookup, location, locationPosition,
        ball, ballPosition, dx, dy,
        inside;
    var locationLookup = {
      "start": "#ball-start",
      "destination": "#ball-destination",
      "outside_destination": "#ball-not-destination"
    };

    location = gameBoard.find(locationLookup[locationKey]);
    ball = gameBoard.find("#ball");

    locationPosition = location.position();
    ballPosition = ball.position();
    dx = locationPosition.left - ballPosition.left;
    dy = locationPosition.top - ballPosition.top;

    ball.simulate("drag", { dx: dx, dy: dy });
  }

  function StatusShouldBe(result) {
    var statusDisplay = gameBoard.find("#results");

    expect(statusDisplay.text()).toEqual(result);
  }

  beforeEach(function() {
    originalGameBoardStructure = $("#game");
    gameBoard = originalGameBoardStructure.clone();
    originalGameBoardStructure.replaceWith(gameBoard);
  });

  beforeEach(function() {
    this.addMatchers(CustomMatchers);
  });

  afterEach(function(){
    gameBoard.replaceWith(originalGameBoardStructure);
  });


  describe("into the destination", function() {
    it("displays 'You Win!'", function() {
      InitializeGame();

      PressStart();

      MoveBallTo("destination");

      StatusShouldBe("You Win!");
    });
  });

  describe("outside the destination", function() {
    it("displays 'You Lose'", function() {
      InitializeGame();

      PressStart();

      MoveBallTo("outside_destination");

      StatusShouldBe("You Lose");
    });
  });
});
