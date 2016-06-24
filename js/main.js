$(document).ready(function() {
    //Declaring the variables
    var clickCount = 0;
    var inputImg = [];
    var clickCounter = 0;
    var grid = [];
    //This variable will be used to display messages/notifications during the game
    var $message = $('#displayMessage');
    //This variable is used to pick images/avtars from the table
    var $imgIcon = $('.tableDisplay img');
    // Based on the avtar picked by the player, this function will add the particular class to the button
    // Argument a -> the button box played
    // num - to check which player is playing
    //input - the identifier
    var addImgClass = function(a, num, input) {
        var imgClass;
        if (inputImg[num] !== '') {
            imgClass = 'image' + inputImg[num];
        } else {
            imgClass = 'none';
        }
        //giving the value of identifier
        a.attr('identifier', input[num]);
        //adding the image class to display the avtar
        a.addClass(imgClass);
    };
    // This function is a get function to get the current grid set badsed on the identifier attribute
    var getGrids = function() {
        var $b0 = $('#b0').attr('identifier');
        var $b1 = $('#b1').attr('identifier');
        var $b2 = $('#b2').attr('identifier');
        var $b3 = $('#b3').attr('identifier');
        var $b4 = $('#b4').attr('identifier');
        var $b5 = $('#b5').attr('identifier');
        var $b6 = $('#b6').attr('identifier');
        var $b7 = $('#b7').attr('identifier');
        var $b8 = $('#b8').attr('identifier');

        var gridInputs = [$b0, $b1, $b2, $b3, $b4, $b5, $b6, $b7, $b8];
        return gridInputs;
    };
    // Function to be called when the option of playing in '2 players' mode is chosen
    var twoPlayers = function(two) {
        // If no avtar is chosen, the array will be set to default of X and O
        if ((inputImg).length === 0) {
            inputImg = ['X', 'O'];
        }
        if (clickCounter < 10) {
            // if this box has already been played
            if (two.hasClass('played')) {
                $message.html('Please use a different box');
            } else {
                clickCounter += 1;
                // checking the click counter to identify which player out of player 1 and 2 is playing
                if (clickCounter % 2 !== 0) {
                    //Display the message which player is playing
                    $message.html('Player 1 playing');
                    // Adding the classes of current player and removing the new class to understand that this box has been played
                    two.addClass('player1 played');
                    two.removeClass('new');
                    // Calling the addImgclass function to change the background of the button
                    addImgClass(two, '0', inputImg);
                    // to display that player 2 is in thoughts
                    $message.html('Player 2 thinking');
                } else {
                    //Display the message which player is playing
                    $message.html('Player 2 playing');
                    // Adding the classes of current player and removing the new class to understand that this box has been played
                    two.addClass('player2 played');
                    two.removeClass('new');
                    // Calling the addImgclass function to change the background of the button
                    addImgClass(two, '1', inputImg);
                    // to display that player 1 is in thoughts
                    $message.html('Player 1 thinking');
                }
                // Getting the current set og grids by calling getGrids function
                grid = getGrids();
                // Calling checkWinner to find if the desired combination of grids is achieved
                checkWinner(grid);
                // Tie situation
                if ((clickCounter === 9) && (($('button.new').length) === 0) && (($('button.blink_me').length) === 0)) {
                    $message.html('Tie');
                    swal({
                        title: "Ooops!",
                        text: "Tie!"
                    });
                    swal({
                        title: "Press Continue if you want to continue",
                        text: "Press NEW if you want a new grid!"
                    });
                }
            }
        }
    };
    // Checking the winner by calling logic function checkXO with the set of current grids
    var checkWinner = function(grid) {
        var winningGrid = checkXO(grid);
        if (winningGrid) {
            if (winningGrid.length > 0) {
                var winningId;
                //Adding the winner class and blinkme class for winning grids to animate
                for (var i = 0; i < winningGrid.length; i++) {
                    winningId = '#b' + winningGrid[i];
                    $(winningId).addClass('blink_me winner');
                }
                //To check if winning grid belongs to player1 and update scores
                if ($(winningId).hasClass('player1')) {
                    scorePlayer1 = scoreCalculation(scorePlayer1);
                    $('#score-player1 p:last-child').html(scorePlayer1);
                    $message.html('Congratulations! Player 1 won');
                    swal({
                        title: "Congratulations!",
                        text: "Player 1 won!"
                    });
                    swal({
                        title: "Press Continue if you want to continue!",
                        text: "Press NEW if you want a new grid"
                    });
                } else if ($(winningId).hasClass('player2')) {
                    //To check if winning grid belongs to player2 and update scores
                    scorePlayer2 = scoreCalculation(scorePlayer2);
                    $('#score-player2 p:last-child').html(scorePlayer2);
                    $message.html('Congratulations! Player 2 won');
                    swal({
                        title: "Congratulations!",
                        text: "Player 2 won!"
                    });
                    swal({
                        title: "Press Continue if you want to continue!",
                        text: "Press NEW if you want a new grid"
                    });
                } else {
                    //To display messages winning grid belongs to AI
                    scorePlayer2 = scoreCalculation(scorePlayer2);
                    $('#score-player2 p:last-child').html(scorePlayer2);
                    $message.html('Congratulations! AI won');
                    swal({
                        title: "Congratulations!",
                        text: "AI won!"
                    });
                    swal({
                        title: "Press Continue if you want to continue!",
                        text: "Press NEW if you want a new grid"
                    });
                }
            }
        }

    };
    // function to reset the grids on New or continue
    var resetGrids = function() {
        $('button.box').attr('identifier', '');
        $('button.box').removeClass();
        $('div.grid > button').addClass('box new');
        $message.html('');
    };
    //function to be invoked if the game is to be played in '1player' mode
    var onePlayer = function(one) {
        if ((inputImg).length === 0) {
            inputImg = ['X', 'Computer'];
        }
        if (one.hasClass('played')) {
            $message.html('Please use a different box');
        } else {
            $message.html('AI thinking');
            one.addClass('player1 played');
            one.removeClass('new');
            addImgClass(one, '0', inputImg);

            setTimeout(function() {
                grid = getGrids();
                checkWinner(grid);
                //Logic how AI will choose the grid to be played
                var $computerPlayer = $('.grid > :not(.played)').first();
                $computerPlayer.addClass('player2 ai played');
                $computerPlayer.removeClass('new');
                $computerPlayer.attr('identifier', 'ai');

                if (!($('button.box').hasClass('winner'))) {
                    $message.html('Player 1 thinking');
                    grid = getGrids();
                    checkWinner(grid);
                }
            }, 1000);

            if ((clickCounter === 9) && (($('button.new').length) === 0) && (($('button.blink_me').length) === 0)) {
                $message.html('Tie');
                swal({
                    title: "Oooops!",
                    text: "Tie!"
                });
                swal({
                    title: "Press Continue if you want to continue!",
                    text: "Press NEW if you want a new grid"
                });
            }
        }
    };
    // set of functions to be performed when a new game is to be played
    $('#new').on('click', function() {
        resetGrids();
        inputImg = [];
        clickCount = 0;
        clickCounter = 0;
        scorePlayer1 = 0;
        scorePlayer2 = 0;
        $('.score p').html(0);
        $('.score img').remove();
        // once the game is set to new, display the options to choose game and players avtar
        $('.avtar,chooseAvtar,.chooseGame,.tableDisplay img').fadeIn();
        $($('article')).addClass('hidden');

    });
    //set of actions to be performed if the game needs to be continued
    $('#continue').on('click', function() {
        resetGrids();
        clickCounter = 0;
    });
    //if the player doesnot wish to choose an avtar
    $('#no').on('click', function() {
        var inputImg = [];
        $('.chooseAvtar,.chooseGame,.tableDisplay img').fadeOut();
        $($('article.hidden,.scoreDisplay')).removeClass('hidden');
        //$('.scoreDisplay').fadeIn();
    });
    //if the player wishes to choose avtar
    $('#pick').on('click', function() {
      swal({
          title: "Cool!",
          text: "Pick now!"
      });
    });
    // here the actual game starts.. when user clicks to choose the mode to be played
    $('button.box').on('click', function() {
        if ($('body').hasClass('onePlayerGame')) {
            if (!($('button.box').hasClass('winner'))) {
                onePlayer($(this));
            }
        } else {
            twoPlayers($(this));
        }
    });
    // depending on the game mode, this function proceeds
    $('button.chooseGame').on('click', function() {
        if ($(this).attr('id') === 'one') {
            // add class of one player game if it is player v/s AI
            $('body').addClass('onePlayerGame');
            var $imageAI = $("<img>").attr("src", 'images/bb8.jpeg');
            $imageAI.attr('id', 'ai');
            //append the AI image in fornt of player 2
            $('#score-player2').prepend($imageAI);
            // picking the avtar for player 1
            swal({
                title: "Player 1!",
                text: "Pick your avtar!"
            });
            $('.chooseAvtar').removeClass('hidden');
            // to choose a display avtar for player 1
            $imgIcon.on('click', function() {
                var iconSrc = $(this).attr('src');
                // creating the image
                var $image = $("<img>").attr("src", iconSrc);
                $image.attr('id', $(this).attr('id'));
                inputImg[0] = $(this).attr('id');
                //prepending the image
                $('#score-player1').prepend($image);
                // once the avtars are selected, fade out the chooseGame, avtar display
                $('.chooseAvtar,.chooseGame,.tableDisplay img').fadeOut();
                $($('article.hidden,.scoreDisplay')).removeClass('hidden');
                //$('.scoreDisplay').fadeIn();
            });

        } else {
            //two players game
            swal({
                title: "Hey!",
                text: "Pick your avtar!"
            });
            $('.chooseAvtar').removeClass('hidden');
            var clickCount = 0;
            //Adding images, image class and background
            $imgIcon.on('click', function() {
                clickCount++;
                var iconSrc = $(this).attr('src');
                var $image = $("<img>").attr("src", iconSrc);
                $image.attr('id', $(this).attr('id'));
                if (clickCount === 1) {
                    inputImg[0] = $(this).attr('id');
                    $('#score-player1').prepend($image);
                } else {
                    if (inputImg[0] === $(this).attr('id')) {
                        swal({
                            title: "Hey You!",
                            text: "Cannot choose same avtaar!"
                        });
                    } else {
                        inputImg[1] = $(this).attr('id');
                        $('#score-player2').prepend($image);
                        // once the avtars are selected, fade out the chooseGame, avtar display
                        $('.chooseAvtar,.chooseGame,.tableDisplay img').fadeOut();
                        $($('article.hidden,.scoreDisplay')).removeClass('hidden');
                        //$('.scoreDisplay').fadeIn();
                    }
                }
            });
        }
    });

});
