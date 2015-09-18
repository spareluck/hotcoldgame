$(document).ready(function() {
	
	var count;
	var correctNum;
	var userGuess;
	var userGuessArray = []; 
	var makeGuess;
  var winnerMsg;
	var lastGuessDif;

  // Random Number Generator
  function randomNumber () {
    correctNum = Math.floor((Math.random() * 100 + 1));
    console.log(correctNum);
  }

  // Enter key submits guess
  function enterKey(e) {
    var key = e.which;
    if(key == 13) {
      guess();
    }
  }

  // Write guess count number to page
  function guessCount() {
  	$('p #count').text(count);
  }

	// Erase previous guess from text input box
	function userGuessReset() {
		$('#userGuess').val('').focus();
	}

	// Calculate the difference between last few guesses and correct number
	function numDif(num) {
		return Math.abs(userGuessArray[userGuessArray.length - num] - correctNum);
	}

  // Display hint to user
  function hint(string) {
    $('#feedback').text(string).css("font-size", "1.25em");
  }

  // Create user numbers guessed list that appears underneath number of guesses
  function userGuessList() {
    $('#guessList').append("<li>" + userGuess + "</li>");

    // JS html escape function

    userGuessArray.push(userGuess);
  }

  function makeGuessFun() {
    hint("Make your Guess!");
    userGuessReset();
    return false;
  }

  // put setTimeout inside function above.

  // Make sure the guess is correct input

	function correctInput() {
		userGuess = $("#userGuess").val();
    	
    if(userGuess === '') {
			hint('Please make a guess!');
      setTimeout(makeGuessFun, 2000);
		}
    else if(isNaN(userGuess)) {
      hint("That's not a number!");
      setTimeout(makeGuessFun, 2000);
    }
    else if(userGuess == 0 || userGuess > 100) {
      hint("Please enter a number between 1-100");
      setTimeout(makeGuessFun, 2000);
    }
		else {
       return true;
		}
    return false;
	}

  function duplicateGuess() {
    var indexOfLast = userGuessArray.length - 1;
    var lastGuess = userGuessArray[indexOfLast];
    var firstIndexOfLastGuess = userGuessArray.indexOf(lastGuess);

    if(firstIndexOfLastGuess != indexOfLast){
        $('#guessList li:last-child').css("background-color", "#777");
        $(".hotOrCold").text("You already guessed that number!").css({
          display: "block",
          backgroundColor: "#cc324b",
          fontSize: "1.25em",
          padding: "1em 0.4em"
        });
        $('#feedback').css("display", "none");

        // Have message and color disappear 
        setTimeout(function () {
          $(".hotOrCold").css("display", "none").text('');
          $('#feedback').css("display", "block");
          }, 2500);
        count -= 1;
        guessCount();
        return true;
      }
    return false;
  }
  
  function firstGuess() {
      $('#guessList li:last-child').css("background-color", "#777");
      hintBox();
  }

  // Display message when user guesses # correctly
  function correctGuess() {
    var correct = "You've guessed the correct number: ";
    var guessNum = "Number of guesses: ";
    
    $(".appended").html("<p>" + correct + correctNum + "</p>" + "<p>" + guessNum + count + "</p>");

    $(".appear").fadeIn(1000);
     $(".appear").delay(5000).fadeOut(1000);
  } 

   // Use calculated difference to give appropriate hint 
  function hintBox() {
    if(lastGuessDif >= 50) {
      hint("Ice Cold: More than 50 numbers off");
    }
    else if(lastGuessDif >= 30 && lastGuessDif <= 49) {
      hint("Cold: Between 30-49 numbers off");
    }
    else if(lastGuessDif >= 20 && lastGuessDif <= 29) {
      hint("Warm: Between 20-29 numbers off");
    }
    else if(lastGuessDif >= 10 && lastGuessDif <= 19) {
      hint("Hot: Between 10-19 numbers off");
    }
    else if(lastGuessDif >= 1 && lastGuessDif <= 9) {
      hint("Smoking Hot: Only 1-9 numbers off!");
    }
    else if (userGuess == correctNum){
      correctGuess();
      newGame();
      return false;
    }
    return false;
  }
  
	// Compare guess number to correct number and give feedback
	function hotOrCold() {
    lastGuessDif = numDif(1);
		var lastGuessDif2 = numDif(2);

    var isDuplicate = duplicateGuess();

    if(userGuessArray.length === 1) {
      firstGuess();
    }

		if(userGuessArray.length > 1 && lastGuessDif !== 0 && isDuplicate === false) {
		
      if (lastGuessDif < lastGuessDif2) { 
  			
        // Change color of guess li to orange
  			$('#guessList li:last-child').css("background-color", "#e74c3c");
  			
  			// Have warmer appear with orange background in hint box 
  			$(".hotOrCold").text("Warmer!").css({
  				display: "block",
  				backgroundColor: "#e74c3c"
  			});

  			$('#feedback').css("display", "none"); 

  			// Have warmer message and red color disappear 
  			setTimeout(function () {
    			$(".hotOrCold").css("display", "none").text('');
  				$('#feedback').css("display", "block");
  			}, 1500);			

  			hintBox();
  		} 
  		else {
  			$(".hotOrCold").text("Colder!").css({
  				display: "block",
  				backgroundColor: "#1a4e95"
        });
        
        $('#feedback').css("display", "none");

        // Have warmer message and color disappear 
        setTimeout(function () {
  				$(".hotOrCold").css("display", "none").text('');
				  $('#feedback').css("display", "block");
        }, 1500);			
        hintBox();
		  } 
    }
    else {
      hintBox();
    }
  }

	function guess() {
			
    var okInput = correctInput();

    // look up if math floor changes to number
    userGuess = Math.floor(userGuess);
    
    if(okInput === true) {
      userGuessList();

      count++
      guessCount();

  		hotOrCold();

  		userGuessReset();
    }
  }


  // Reset game without refreshing page
  function newGame() {
    randomNumber();
    userGuessReset();
    $('#guessList li').remove();
    userGuessArray = []; 
    count = 0;
    guessCount();
    hint("Make your Guess!");
  }

  function instead(callback) {
    return function() {
      callback();
      return false;
    }
  }

	// Blink congrats when user wins
	function blinker() {
  	$('.blink').fadeOut(500);
 		$('.blink').fadeIn(500);
	}	
	setInterval(blinker, 1000); //Runs every second
  	
  newGame();

  // Functionality of guess button
  $('#guessButton').on('click', instead(guess));

  // Function to Click on New Game button class = new
  $('li .new').on('click', newGame);

	/*--- Display information modal box ---*/
  $(".what").click(function(){
    $(".overlay").fadeIn(1000);
  });

  /*--- Hide information modal box ---*/
  $("a.close").click(function(){
  	$(".overlay").fadeOut(1000);
  }); 
});