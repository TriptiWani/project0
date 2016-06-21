$(document).ready(function(){
  var imgSrcInput = function(a,num) {
    var src = ['url(images/eatSmiley.jpg)','url(images/drinkSmiley.jpg)']
    //var src = 'url(../images/eatSmiley.jpg'
    console.log(src);
    var imgClass = 'image'+num;

  //  var src1 = ($('.'+ imgClass).css('background-image')).replace('url("file:///Users/Tripti/Projects/Proj/ticTacToe/images/','').replace('.jpg")','');
    input[num] = (src[num].replace('url(images/','')).replace('.jpg)','');
    a.val(input[num]);
    a.addClass(imgClass);
    a.css({'background-image': src[num]});
    a.css({'font-size':0});
    console.log(input);
  }

  var getGrids = function () {
    var $b1 = $('#b1').val();
    var $b2 = $('#b2').val();
    var $b3 = $('#b3').val();
    var $b4 = $('#b4').val();
    var $b5 = $('#b5').val();
    var $b6 = $('#b6').val();
    var $b7 = $('#b7').val();
    var $b8 = $('#b8').val();
    var $b9 = $('#b9').val();

    var gridInputs = [$b1,$b2,$b3,$b4,$b5,$b6,$b7,$b8,$b9];
    return gridInputs;
  }

  var clickCounter = 0;
  var grid = [];
  var scorePlayer1 = 0;
  var scorePlayer2 = 0;
  var $message = $('#displayMessage');

  $('input').on('click',function () {
      console.log($(this).val());
      var message = checkIfEmpty($(this).val());
      if (message){
      $message.html(message);
      alert(message);// not working
    }
    clickCounter+= 1;
    if ( clickCounter % 2 !== 0 ) {
        $message.html('Player 1 turn');
        //$(this).val(input[0]); - for X O
      //  $(this).append($img);
        //$(this).addClass('image1'); // for images
        imgSrcInput($(this),'0');
        grid = getGrids();
        console.log(grid);
        if (checkXO(grid)){
          scorePlayer1+=10;
          $('#score-player1 p:last-child').html(scorePlayer1);
          alert('Player 1 wins');
        };
    } else  {
        $message.html('Player 2 turn');
        //$(this).addClass('image2');
        imgSrcInput($(this),'1');
        grid =getGrids();
        console.log(grid);
        if(checkXO(grid)) {
          scorePlayer2+=10;
          $('#score-player2 p:last-child').html(scorePlayer2);
          alert('Player 2 wins');
        };
    }
  })
})
var $imgIcon = $('.tableDisplay img');
  $imgIcon.on('click',function() {
    console.log('Image Picked');
    var iconSrc = $(this).attr('src');
    customisedDisplay.image.push() = iconSrc;
    console.log(customisedDisplay.image)
  }
);

/*


// creating the array for img src values
var imgSrcInput = function(a) {
  a.addClass('image1');
  var src1 = ($('.image1').css('background-image')).replace('url("file:///Users/Tripti/Projects/Proj/ticTacToe/images/','').replace('.jpg")','');
  input[0] = src1;
  $(this).val(input[0]);
}
var src1 = ($('.image1').css('background-image')).replace('url("file:///Users/Tripti/Projects/Proj/ticTacToe/images/','').replace('.jpg")','')
 input[0] = src1;
$(this).val(input[0]);

*/
