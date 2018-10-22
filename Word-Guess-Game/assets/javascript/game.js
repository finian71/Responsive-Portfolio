var samuraijackCharacters = ["ASHI", "JACK", "AKU", "SCOTSMAN"];
var totalGuesses = 3;       // number of tries
var userGuesses = [];       // letters the user guessed
var computerPick;           // array number the machine choose randomly
var wordGuessed = [];       // This will be the word we actually build to match the current word
var guessesLeft = 0;        // How many tries the player has left
var finishedGame = false;   // Flag for 'press any key to try again'     
var wins = 0;               //wins
var losses = 0;             //losses

// key entered sound
var keySound = new Audio('./assets/sounds/typewriter-key-1.wav');

// start the game
function startGame() {
    guessesLeft = totalGuesses;

    //grab a random number from the Characters array  (number of words)
    computerPick = Math.floor(Math.random() * (samuraijackCharacters.length));

    if(samuraijackCharacters[computerPick] == samuraijackCharacters[0]) {
        $('.clue').html("<img src='assets/images/Ashi.jpg' width='300'/>");
    }else if(samuraijackCharacters[computerPick] == samuraijackCharacters[1]) {
        $('.clue').html("<img src='assets/images/Jack.jpg' width='300'/>");
    }else if(samuraijackCharacters[computerPick] == samuraijackCharacters[2]) {
         $('.clue').html("<img src='assets/images/Aku.jpg' width='300'/>");
    }else if(samuraijackCharacters[computerPick] == samuraijackCharacters[3]) {
        $('.clue').html("<img src='assets/images/Scotsman.jpg' width='300'/>");
    }else($('.clue').text('neither of these'));
    
    // Clear out arrays
    userGuesses = [];
    wordGuessed = [];

    //build the word with blanks
    for (var i = 0; i < samuraijackCharacters[computerPick].length; i++) {
        wordGuessed.push("_");
    }   

    //gamewin, gameover, title 
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    //refresh the screen
    refreshScreen();
};

//  Updates the display on the HTML Page
function refreshScreen() {

    document.getElementById("gameWins").innerText = wins;
    document.getElementById("gameLosses").innerText = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < samuraijackCharacters[computerPick].length; i++) {
        if(samuraijackCharacters[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};

//check if all letters have been entered.
function checkWin() {
    if(wordGuessed.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finishedGame = true;
    }
};

//check if the user is out of guesses
function checkLoss()
{
    if(guessesLeft <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        losses++;
        finishedGame = true;
    }
}

//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Event listener
document.onkeydown = function(event) {
    //if the game is finished, restart it.
    if(finishedGame) {
        startGame();
        finishedGame = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            refreshScreen();
            checkWin();
            checkLoss();
        }
    }
};