$(document).ready(function(){
	
	var count;
	var correctNum;
	var userGuess;
	var userGuessArray = []; 
	var winnerMsg;
	var lastGuessDif;
	newGame();

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

  	//Erase previous guess from text input box
  	function userGuessReset() {
  		$('#userGuess').val('').focus();
  	}

  	//Calculate the difference between guesses and correct number
  	function numDif(num) {
  		return Math.abs(userGuessArray[userGuessArray.length - num] - correctNum);
  	}

	// Make sure the guess is correct input
  	function correctInput() {
  		userGuess = $("#userGuess").val();
		var makeGuess = hint("Make your Guess!");
		if(userGuess === '') {
  			hint('Please make a guess!');
  			setTimeout(function () {
    				makeGuess;
				}, 2000);
  			userGuessReset();
  			return false
  		}
  		else if(isNaN(userGuess)) {
  			hint("That's not a number!");
  			setTimeout(function () {
    				makeGuess;
				}, 2000);
  			userGuessReset();
  			return false
  		}
  		else {
  			return userGuess = Math.floor(userGuess);
  		}
  	}

  	// Create user numbers guessed list that appears underneath number of guesses
  	function userGuessList() {

		$('#guessList').append("<li>" + userGuess + "</li>");

 		$('#guessList li:last-child').each(function() {
 			userGuessArray.push($(this).text())
 		});

 		console.log(userGuessArray)
  	}

  	//Display hint to user
  	function hint(string) {
  		$('#feedback').text(string).css("font-size", "1.25em")
  	}

  	//Compare guess number to correct number and give feedback
  	function hotOrCold() {
  		var lastGuessLi = $('#guessList li:last-child');
		var warmOrCold = $(".hotOrCold");
 		var feedback = $('#feedback');
  		lastGuessDif = numDif(1);
 		var lastGuessDif2 = numDif(2);
 		if(userGuessArray.length == 1){
 			lastGuessLi.css("background-color", "#777");
 			hintBox();
 		}

 		if(userGuessArray.length > 1 && lastGuessDif != 0){
			if(lastGuessDif < lastGuessDif2){
				//Change color of guess li to orange
				lastGuessLi.css("background-color", "#e74c3c")
				
				//have warmer appear with orange background in hint box 
				warmOrCold.text("Warmer!").css({
					display: "block",
					backgroundColor: "#e74c3c"
				});
				feedback.css("display", "none") 

				//have warmer message and color disappear 
				setTimeout(function () {
    				warmOrCold.css("display", "none").text('');
					feedback.css("display", "block")
				}, 1500);			

				hintBox();
			} else if (lastGuessDif - lastGuessDif2 == 0) {
				lastGuessLi.css("background-color", "#777")
				warmOrCold.text("You already guessed that number!").css({
					display: "block",
					backgroundColor: "#cc324b",
					fontSize: "1.25em",
					padding: "1em 0.4em"
				});
				feedback.css("display", "none");

				//have message and color disappear 
				setTimeout(function () {
    				warmOrCold.css("display", "none").text('');
					feedback.css("display", "block")
				}, 2500);
				count -= 1;
				guessCount();
			}
			else {
				warmOrCold.text("Colder!").css({
					display: "block",
					backgroundColor: "#1a4e95"
				});
				feedback.css("display", "none") 

				//have warmer message and color disappear 
				setTimeout(function () {
    				warmOrCold.css("display", "none").text('');
					feedback.css("display", "block")
				}, 1500);			

				hintBox();
			} 
		}
		hintBox();
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
		return false
	}
  	
  	function guess() {
  		
		if(correctInput()) {
			userGuessList();

			count++;
			guessCount();

 			hotOrCold();

			userGuessReset();
			return false;
  		}
  	}

  	// Display message when user guesses # correctly
  	function correctGuess() {
  		var correct = "You've guessed the correct number: "
  		var guessNum = "Number of guesses: "
  		
  		$(".appended").html("<p>" + correct + correctNum + "</p>" + "<p>" + guessNum + count + "</p>");

  		$(".appear").fadeIn(1000);
		$(".appear").delay(5000).fadeOut(1000);
	}	

  	// Blink congrats when user wins
  	function blinker() {
    	$('.blink').fadeOut(500);
   		$('.blink').fadeIn(500);
	}	
	setInterval(blinker, 1000); //Runs every second
  	
  	// Functionality of guess button
  	$('#guessButton').on('click', guess);

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

