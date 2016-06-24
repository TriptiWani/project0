$(document).ready(function(){
  var clickCount = 0;
  var inputImg = [];
  var clickCounter = 0;
  var grid = [];
  var $message = $('#displayMessage');
  var $imgIcon = $('.tableDisplay img');
    var addImgClass = function(a,num,input) {
      var imgClass;
      if (inputImg[num] !== '')  {
        imgClass = 'image'+inputImg[num];
      } else {
        imgClass = 'none';
      }
      a.attr('identifier',input[num]);
      a.addClass(imgClass);
    };
  var getGrids = function () {
    var $b0 = $('#b0').attr('identifier');
    var $b1 = $('#b1').attr('identifier');
    var $b2 = $('#b2').attr('identifier');
    var $b3 = $('#b3').attr('identifier');
    var $b4 = $('#b4').attr('identifier');
    var $b5 = $('#b5').attr('identifier');
    var $b6 = $('#b6').attr('identifier');
    var $b7 = $('#b7').attr('identifier');
    var $b8 = $('#b8').attr('identifier');

    var gridInputs = [$b0,$b1,$b2,$b3,$b4,$b5,$b6,$b7,$b8];
    return gridInputs;
  };
  var twoPlayers = function (two) {
    if ((inputImg).length === 0){
      inputImg = ['X','O'];
    }
    if (clickCounter < 10){
      if (two.hasClass('played')){
        $message.html('Please use a different box');
      } else {
        clickCounter+= 1;
        if ( clickCounter % 2 !== 0 ) {
            $message.html('Player 1 playing');
            two.addClass('player1 played');
            two.removeClass('new');
            addImgClass(two,'0',inputImg);
            $message.html('Player 2 thinking');
        } else  {
            $message.html('Player 2 playing');
            two.addClass('player2 played');
            two.removeClass('new');
            addImgClass(two,'1',inputImg);
            $message.html('Player 1 thinking');
        }
        grid =getGrids();
        checkWinner(grid);
        if (  (clickCounter === 9) && (($('button.new').length) === 0) && (($('button.blink_me').length) === 0) )  {
          $message.html('Tie');
          alert('Press Continue if you want to continue'+ '\n' +
                'Press NEW if you want a new grid');
        }
      }
    }
  };
  var checkWinner =  function(grid) {
    var winningGrid = checkXO(grid);
    if (winningGrid){
      if (winningGrid.length > 0) {
        var winningId;
        for (var i = 0; i < winningGrid.length; i++) {
            winningId = '#b'+winningGrid[i];
            $(winningId).addClass('blink_me winner');
        }
        if ( $(winningId).hasClass('player1')){
          scorePlayer1 = scoreCalculation(scorePlayer1);
          $('#score-player1 p:last-child').html(scorePlayer1);
          $message.html('Congratulations! Player 1 won');
          alert('Press Continue if you want to continue'+ '\n' +
                'Press NEW if you want a new grid');
        } else if ( $(winningId).hasClass('player2')){
          scorePlayer2 = scoreCalculation(scorePlayer2);
          $('#score-player2 p:last-child').html(scorePlayer2);
          $message.html('Congratulations! Player 2 won');
          alert('Press Continue if you want to continue'+ '\n' +
                'Press NEW if you want a new grid');
        }  else {
          scorePlayer2 = scoreCalculation(scorePlayer2);
          $('#score-player2 p:last-child').html(scorePlayer2);
          $message.html('Congratulations! AI won');
          alert('Press Continue if you want to continue'+ '\n' +
                'Press NEW if you want a new grid');
        }
      }
    }

  };
  var resetGrids = function  () {
    $('button.box').attr('identifier','');
    $('button.box').removeClass();
    $('div.grid > button').addClass('box new');
     $message.html('');
  };
var onePlayer = function(one) {
  if((inputImg).length === 0){
      inputImg = ['X','Computer'];
  }
    if (one.hasClass('played')){
    $message.html('Please use a different box');
    } else {
      $message.html('AI thinking');
      one.addClass('player1 played');
      one.removeClass('new');
      addImgClass(one,'0',inputImg);

      setTimeout(function() {
        grid =getGrids();
        checkWinner(grid);

        var $computerPlayer = $('.grid > :not(.played)').first();
        $computerPlayer.addClass('player2 ai played');
        $computerPlayer.removeClass('new');
        $computerPlayer.attr('identifier','ai');
        grid =getGrids();
        checkWinner(grid);
        if(!($('button.box').hasClass('winner'))){
            $message.html('Player 1 thinking');
        }
    },1000);

      if (  (clickCounter === 9) && (($('button.new').length) === 0) && (($('button.blink_me').length) === 0) )  {
        $message.html('Tie');
        alert('Press Continue if you want to continue'+ '\n' +
              'Press NEW if you want a new grid');
      }
    }
};
$('#new').on('click',function() {
  resetGrids();
  inputImg= [];
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
$('#continue').on('click',function() {
  resetGrids();
  clickCounter = 0;
});
$('#no').on('click',function() {
  var inputImg = [];
  $('.chooseAvtar,.chooseGame,.tableDisplay img').fadeOut();
  $($('article.hidden,.scoreDisplay')).removeClass('hidden');
 //$('.scoreDisplay').fadeIn();
});
$('#pick').on('click',function() {
  alert('Pick now!');
});
    $('button.box').on('click',function () {
      if ($('body').hasClass('onePlayerGame')){
          if(!($('button.box').hasClass('winner'))){
              onePlayer($(this));
          }
      } else {
        twoPlayers($(this));
      }
    });
    $('button.chooseGame').on('click',function() {
      if ($(this).attr('id') === 'one') {
        // add class of one player game if it is player v/s AI
        $('body').addClass('onePlayerGame');
        var $imageAI = $("<img>").attr("src",'images/bb8.jpeg');
        $imageAI.attr('id','ai');
        //append the AI image in fornt of player 2
        $('#score-player2').prepend($imageAI);
        // picking the avtar for player 1
        alert('Player 1 , Pick your avtar');
        $('.chooseAvtar').removeClass('hidden');
        // to choose a display avtar for player 1
        $imgIcon.on('click',function() {
          var iconSrc = $(this).attr('src');
          // creating the image
          var $image = $("<img>").attr("src",iconSrc);
          $image.attr('id',$(this).attr('id'));
          inputImg[0] = $(this).attr('id');
          //prepending the image
          $('#score-player1').prepend($image);
          // once the avtars are selected, fade out the chooseGame, avtar display
          $('.chooseAvtar,.chooseGame,.tableDisplay img').fadeOut();
          $($('article.hidden,.scoreDisplay')).removeClass('hidden');
          //$('.scoreDisplay').fadeIn();
        });

      } else {
        alert('Pick your avtar');
        $('.chooseAvtar').removeClass('hidden');
        var clickCount = 0;
        $imgIcon.on('click',function() {
          clickCount++;
          var iconSrc = $(this).attr('src');
          var $image = $("<img>").attr("src",iconSrc);
          $image.attr('id',$(this).attr('id'));
          if ( clickCount === 1 ) {
            inputImg[0] = $(this).attr('id');
            $('#score-player1').prepend($image);
          } else {
            if (inputImg[0] === $(this).attr('id')){
              alert('Cannot choose same avtaar');
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
