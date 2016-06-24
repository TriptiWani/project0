//var input = ['X','O'];
var scorePlayer1 = 0;
var scorePlayer2 = 0;
//var inputImg = [];
var customisedDisplay = {
  default: ['X','O'],
  image : [],
  moustacheLips : ['src1','src2'],
};
var checkXO = function (b){
	var combinationGrids = [];
	var resultCombination = [[0,1,2],[0,3,6],[3,4,5],[6,7,8],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
for ( var i =0 ; i < resultCombination.length ; i++ ) {
	for ( var j =0 ; j < 3 ; j++ ) {
		combinationGrids[j] = b[resultCombination[i][j]];
	}
	if ((combinationGrids[0] !== undefined) && (combinationGrids[0] !== '') && (combinationGrids[0] === combinationGrids[1]) && (combinationGrids[0] === combinationGrids[2]) && (combinationGrids[0] !== '')) {
		//console.log(combinationGrids);
  //  console.log();
  console.log(resultCombination[i]);
    return resultCombination[i];
	}
}
};
var scoreCalculation = function (score) {
  return score+=10;
};
