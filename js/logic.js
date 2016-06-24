// This js file contains only logic, no jQuery stuff
// Creating the variables to record scores of the players
var scorePlayer1 = 0;
var scorePlayer2 = 0;
// Function to check the combination of X and O to get the winning grids
var checkXO = function(b) {
    var combinationGrids = [];
    //Array of Array of winning getGrids
    var resultCombination = [
        [0, 1, 2],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];
    for (var i = 0; i < resultCombination.length; i++) {
        for (var j = 0; j < 3; j++) {
            combinationGrids[j] = b[resultCombination[i][j]];
        }
        if ((combinationGrids[0] !== undefined) && (combinationGrids[0] !== '') && (combinationGrids[0] === combinationGrids[1]) && (combinationGrids[0] === combinationGrids[2]) && (combinationGrids[0] !== '')) {
            //Returns the winning grids
            return resultCombination[i];
        }
    }
};
//This function calculates the score of the players after the game by taking the previous score as an argument
var scoreCalculation = function(score) {
    return score += 10;
};