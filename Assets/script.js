// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

// Assign query selector variables
var startQuiz = document.querySelector(".start-quiz");

//Assign other variables

    // Emptry array for high scores to be pushed in to from local storage
    var storedHighScores = []

    // Connects timeEl with timer in html
    var timeEl = document.querySelector(".timer");

    // Sets the seconds in the game for setTime function
    var secondsLeft = 5;

    // Other variables
    var userScore = []


// Assign variables to array for quiz questions
var quizQuestions = [
    {question: "What is the correct way to console log something?",
    answers: {
        a: "consoleLog()",
        b: "console.log()",
        c: "console.log[]"
    },
    correctAnswer: "b"
    },
    {question: "If you type the following code in the console window, what result will you get? 3 > 2 > 1 === false;",
    answers: {
        a: "True",
        b: "False",
    },
    correctAnswer: "a"
    },
    {question: "Javascript is a ___-side programming language.",
    answers: {
        a: "Client",
        b: "Server",
        c: "Both",
        d: "None"
    },
    correctAnswer: "c"
    },
]


// Create function to begin quiz
function begin(){
    // Call function to begin timer
    setTime();
    console.log(quizQuestions)
    // For loop to iterate through questions and answers


    // If: answer matches correct answer, display correct and go to next question <- !!! event listeners? !!!


    // Else if: timer deducts ten seconds

    
    // Else if: all questions are done, push seconds left to user score
}

// Timer function
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left.";

      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // End game !!!
      }
  
    }, 1000);
  }

// Call functions


// Get item/set item to store info to local storage


// Get items from local storage - push to empty array


// Display empty array in to high scores


// Create event listeners for start-quiz button
startQuiz.addEventListener("click", begin);