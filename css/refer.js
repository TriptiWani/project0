
var clickCounter = 0;
var XCounter = 0;
var OCounter = 0;

var winner = function(){
  if(clickCounter % 2 === 1 && checkingXO() === true) {
      // debugger;
    $('h2 span').text("X Wins!");
      console.log("X WINS");
  };
  if(clickCounter % 2 === 0 && checkingXO() === true){
      // debugger;
    $('h2 span').text("O Wins!");
      console.log("O WINS");
  };
};

var checkingXO = function( button ){
    var b1 = $("button").eq(0).text();
    var b2 = $("button").eq(1).text();
    var b3 = $("button").eq(2).text();
    var b4 = $("button").eq(3).text();
    var b5 = $("button").eq(4).text();
    var b6 = $("button").eq(5).text();
    var b7 = $("button").eq(6).text();
    var b8 = $("button").eq(7).text();
    var b9 = $("button").eq(8).text();

    if(b1 === b2 && b1 === b3 && b3 !== "" ||
      b4 === b5 && b4 === b6 && b6 !== "" ||
      b7 === b8 && b7 === b9 && b9 !== "" ||
      b1 === b4 && b1 === b7 && b7 !== "" ||
      b2 === b5 && b2 === b8 && b8 !== "" ||
      b3 === b6 && b3 === b9 && b9 !== "" ||
      b1 === b5 && b1 === b9 && b9 !== "" ||
      b7 === b5 && b7 === b3 && b3 !== ""){

      return true;
    } else {
      return false;
    }
};

var playerPicker = function(button) {
  if(clickCounter % 2 === 0) {
    $(button).text('X');
  } else {
    $(button).text('O');
  }
};

$('button').on('click', function () {
    if (checkingXO() === false) {
      // Here `this` refers to the specific element where this event was triggered.
      $(this).text('You clicked me');
      console.log("You clicked " + this.id)
      playerPicker( this );
      clickCounter ++;
      console.log(clickCounter);
      checkingXO(this);
      winner(this);
    }
});


// Make a function that checks after every click for the winning combinations, so a for loop that runs after every click. If the condition has been met, then the game is over.

//Make an array? That auto creates itself to keep track of which box has an X or O?
