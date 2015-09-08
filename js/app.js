$(document).ready(function(){
	
	var count;
	var correctNum;
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
  		count = 0;
  		guessCount();
  	};
  	//Erase previous guess from text input box
  	function userGuessReset() {
  		$('#userGuess').val('').focus();
  	}

  	// Logic to compare user's guess
  	function guess () {
  		var userGuess = $("#userGuess").val();
	
		// Make sure the guess is correct input
		if(userGuess === '') {
  			alert('Please make a guess!');
  			userGuessReset();
  			return false
  		}
  		else if(isNaN(userGuess)) {
  			alert("That's not a number!")
  			userGuessReset();
  			return false
  		}

  		else {
  			userGuess = Math.floor(userGuess);
  		}

		$('#guessList').append("<li>" + userGuess + "</li>");
		
		var userGuessArray = []; 

 		$('#guessList li').each(function() {
 			userGuessArray.push($(this).text())
 		});

 		console.log(userGuessArray)

 		count++;
		guessCount();

 		var numDif = Math.abs(userGuessArray[userGuessArray.length -1] - correctNum);
 		var guessDif = Math.abs(correctNum - userGuessArray[userGuessArray.length-2])
		
 		if(userGuessArray.length > 1 && numDif != 0){
			if(numDif < guessDif){
				alert('Warmer!');
			} 	
			else {
				alert('Colder!')
			}
		}

		// >= 50 Ice Cold
		if(numDif >= 50) {
			alert("Ice Cold. You're more than 50 numbers off.");
		}
		// 30 - 49 Cold
		else if(numDif >= 30 && numDif <= 49) {
			alert("Cold. You're between 30-49 numbers off.");
		}
		// 20-29 warm
		else if(numDif >= 20 && numDif <= 29) {
			alert("Warm. You are between 20-29 numbers off.");
		}
		// 10-19 hot
		else if(numDif >= 10 && numDif <= 19) {
			alert("Hot. You're between 10-19 numbers off.");
		}
		// 1-10 smoking hot
		else if(numDif >= 1 && numDif <= 9) {
			alert("Smoking hot. You are between 1-9 numbers off! You're almost there!");
		}
		else if (numDif === 0) {
			alert("That's correct. The number is: " + correctNum + ". Congratulations! Number of guesses: " + count);
			newGame();
			return false;
		}

		userGuessReset();
		return false;
  	}

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

