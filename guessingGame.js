/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber,
    guessArray
winningNumber = generateWinningNumber()
guessArray = []


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100) + 1
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = parseInt(document.getElementById('input').value, 10)
  document.getElementById('input').value = "";
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if (playersGuess < winningNumber) {return "lower"}
  else {return "higher"}
}
function guessMessage(){
  return "Your guess is "+ lowerOrHigher() + " and within " + Math.abs(winningNumber-playersGuess).toString()  + " digits of the winning number"
}
// Check if the Player's Guess is the winning number 

function checkGuess(){
  if (guessArray.includes(playersGuess)) {
    $('div.alert').html("<strong>Already tried that!</strong> Guess another number.")
    $('div.alert').attr("class","alert alert-warning")
  }
	else if(playersGuess === winningNumber) {
    $('div.alert').html("<strong>Congrats!</strong> You guessed the right number.")
    $('div.alert').attr('class','alert alert-success')
    $('div.progress-bar').attr('class','progress-bar progress-bar-success')
  }
  else {
    $('div.alert').text(guessMessage())
    guessArray.push(playersGuess)
    $('div.progress-bar').attr("style","width:"+(guessArray.length/5)*100+"%")
    if (guessArray.length >= 5) {
      $('div.alert').html("<strong>Sorry!</strong> You're all out of guesses.")
      $('div.alert').attr('class','alert alert-danger')
      $('div.progress-bar').attr('class','progress-bar progress-bar-danger')
    }
  }
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
  if (guessArray.length < 3) {
    var hintarraylength = 5;
  }
  else {
    hintarraylength = 3;
  }
  var hintarray = [];
  for (var i = 0; i < hintarraylength; i++) {
    var hintarraynum = Math.floor(Math.random() * 100) + 1;
    while (hintarraynum === winningNumber || guessArray.includes(hintarraynum) || hintarray.includes(hintarraynum)) {
      hintarraynum = Math.floor(Math.random() * 100) + 1;
    }
    hintarray.push(hintarraynum);
  }
  hintarray[2] = winningNumber;
  $('div.alert').text('The winning number is one of the following: '+ hintarray.join(', '))
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
  $('div.alert').html('<strong>Welcome!</strong> Please guess a number between 1 and 100.');
  guessArray = [];
  $('div.progress-bar').attr("style","width:"+(guessArray.length/5)*100+"%")
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
  $('button[attr=onclick]').click(function() {
    playersGuessSubmission()
    checkGuess()
  })
  $('button[attr=hint]').click(function() {
    provideHint()
  })
  $('button[attr=retry]').click(function() {
    playAgain();
  })
  $('input').keydown(function(event) {
    if (event.which == 13) {
      playersGuessSubmission()
      checkGuess()
    }
  })
})
