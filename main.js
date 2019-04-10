// Global Variables:

//word list things 
let wordList = ['mickey', 'minnie', 'donald', 'daisy', 'goofy', 'pluto'];

let letterInChoosenWord = [];

//computer guess
let computerWord = ''

//factor in blanks 

let numBlanks = 0;

//mix of blanks ans solved letters
let blanksAndSuccesses = [];

//wrong guess 
let wrongGuess = [];

//letters quessed

let letters = "";

//counters 
let win = 0;
let lose = 0;
let guessleft = 10;

//Functions: 
//Start game --->
const startGame = () => {
    //
    numGuess = 9;

    //pick word 
    computerWord = wordList[Math.floor(Math.random() * wordList.length)];

    //breaking out into individual letters
    lettersInChosenWord = computerWord.split("");

    //counting letters in word
    numBlanks = letterInChoosenWord.length;

    //log
    console.log(computerWord);

    //Reset quesses each round 
    blanksAndSuccesses = [];
    wrongGuess = [];

    for (let i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }
    //reprints guesses left
    document.getElementById("guesses-left").innerHTML = guessleft;
    //Prints blanks
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    //clears wrong guesses from previous round
    document.getElementById("wrong-guesses").innerHTML = wrongGuess.join(" ");


};

//check letters 
const checkLetters = (letter) => {
    //boolean check 
    let letterInWord = false;

    //loop though the letters 
    for (let i = 0; i < numBlanks; i++) {
        //if statement 
        if (computerWord[i] === letter) {
            
            letterInWord = true;
        }
    }
    //letter in word check
    if (letterInWord) {
        //loop though letters
        for (let j = 0; j < numBlanks; j++) {
            //add letter to blanks
            if (computerWord[j] === letter) {
                blanksAndSuccesses[j] = letter;
            }
        }
        //log to see if it works 
        console.log(blanksAndSuccesses);
    } else {
        // add to list of wrong letters. 
        wrongGuess.push(letter)
        //subtract from  guesses
        numGuess--;
    }

};

const roundFinished = () => {
    console.log("WinCount: " + win + " | LossCount: " + lose + " | NumGuesses: " + numGuess);
    //post to the page: 
    document.getElementById("guesses-left").innerHTML = numGuess;
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuess.join(" ");

    if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        //update counter 
        win++;
        //update counter on screen
        document.getElementById("win-counter").innerHTML = win;

        //restart game 
        startGame();

    } else { //repeat above but for loss
        lose++;
        document.getElementById("loss-counter").innerHTML = lose;
        startGame();
    }

};

//main start up
startGame()

document.onkeyup = function (event) {

    // Converts all key clicks to lowercase letters.
    letter = String.fromCharCode(event.which).toLowerCase();

    // Runs the code to check for correct guesses.
    checkLetters(letter);

    // Runs the code that ends each round.
    roundFinished();
};
