//var input = ['X','O'];
var input=[];
//var input = [$img1,$img2];
var customisedDisplay = {
  default: ['X','O'],
  image : ['src1','src2'],
  moustacheLips : ['src1','src2'],
}

var checkXO = function (b) {
  console.log(b);
    if ( ((b[0] === b[1]) && (b[0] === b[2]) && (b[0] !== '')) ||
         ((b[0] === b[3]) && (b[0] === b[6]) && (b[0] !== '')) ||
         ((b[3] === b[4]) && (b[3] === b[5]) && (b[3] !== '')) ||
         ((b[6] === b[7]) && (b[6] === b[8]) && (b[6] !== '')) ||
         ((b[1] === b[4]) && (b[1] === b[7]) && (b[1] !== '')) ||
         ((b[2] === b[5]) && (b[2] === b[8]) && (b[2] !== '')) ||
         ((b[0] === b[4]) && (b[0] === b[8]) && (b[0] !== '')) ||
         ((b[6] === b[4]) && (b[6] === b[2]) && (b[6] !== ''))  ) {
      return true;
    } else {
      return false;
    }

}
var scoreCalculation = function (score) {
  return score+=1;
}
var newGame = function(){
  var gridInit = ['','','','','','','','',''];
  return gridInit;
}
var sameGame = function (scorePlayer1,scorePlayer2) {

}
var checkIfEmpty = function(value){
  if (value !== ''){
    var message = 'Please use a different cell';
    return message;
  } else {
    var message ='';
    return message;
  }
}

var chooseDisplay = function () {

}
