// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers

// WHEN the game is over
// THEN I can save my initials and my score

// Assign query selector variables
var startQuiz = document.querySelector(".start-quiz");
var quizQuestions = document.querySelector("#questions");
var quizAnswers = document.querySelector("#possible-answers");
var hiddenCorrect = document.querySelector("#hidden-correct");
var displayScore = document.querySelector(".display-score");

//Assign other variables

// Emptry array for high scores to be pushed in to from local storage
var storedHighScores = [];

// Connects timeEl with timer in html
var timeEl = document.querySelector(".timer");

// Sets the seconds in the game for setTime function
var secondsLeft = 50;

// Other variables
var possibleAnswers = [];
var userAnswer = [];
var userScore = 0;
var questionOnQuiz = "";
var questionIndex = 0;
var currentQuestion = null;

// Assign variables to array for quiz questions
var questions = [
  {
    question: "What is the correct way to console log something?",
    answers: {
      a: "consoleLog()",
      b: "console.log()",
      c: "console.log[]",
    },
    correctAnswer: "b",
  },

  {
    question:
      "If you type the following code in the console window, what result will you get? 3 > 2 > 1 === false;",
    answers: {
      a: "True",
      b: "False",
    },
    correctAnswer: "a",
  },

  {
    question: "Javascript is a ___-side programming language.",
    answers: {
      a: "Client",
      b: "Server",
      c: "Both",
      d: "None",
    },
    correctAnswer: "c",
  },

  {
    question:
      "Which of the following will write the message “Hello, World!” in an alert box?",
    answers: {
      a: "alertBox(“Hello, World!”);",
      b: "alert('Hello, World!');",
      c: "msgAlert(“Hello, World!”);",
      d: "log(“Hello, World!”);",
    },
    correctAnswer: "b",
  },

  {
    question: "How do you find the minimum of x and y using JavaScript?",
    answers: {
      a: "min(x,y);",
      b: "Math.min(x,y)",
      c: "Math.min(xy)",
      d: "min(xy);",
    },
    correctAnswer: "b",
  },

  {
    question:
      "Which is the correct “if” statements to execute certain code if “x” is equal to 2?",
    answers: {
      a: "if(x 2)",
      b: "if(x = 2)",
      c: "if(x == 2)",
      d: "if(x != 2 )",
    },
    correctAnswer: "c",
  },

  {
    question: "What will the code return? Boolean(3 < 7)",
    answers: {
      a: "True",
      b: "False",
      c: "NaN",
      d: "SyntaxError",
    },
    correctAnswer: "a",
  },
];

// Create function to begin quiz
function begin() {
  // Call function to begin timer
  setTime();
  // Hide start button upon clicking begin quiz
  startQuiz.style.display = "none";
  nextQuestion();
}

// For loop to iterate through questions and answers
function nextQuestion() {
  currentQuestion = questions[questionIndex];
  quizQuestions.textContent = currentQuestion.question;

  var answerKeys = Object.keys(currentQuestion.answers);

  quizAnswers.innerHTML = "";
  // For loop to iterate through current answers
  for (let i = 0; i < answerKeys.length; i++) {
    var answerBtn = document.createElement("button");

    // For every answer, create a button with the text content by iterateing through the answer key index (a, b, c, d)
    answerBtn.textContent = currentQuestion.answers[answerKeys[i]];

    answerBtn.addEventListener("click", selectAnswer);
    quizAnswers.appendChild(answerBtn);
  }
  questionIndex++;
}

function selectAnswer(event) {
  userAnswer = event.target;

  // If: answer matches correct answer, display "correct" and go to next question
  if (
    userAnswer.textContent ===
    currentQuestion.answers[currentQuestion.correctAnswer]
  ) {
    alert("Correct! +10 points");
    userScore = userScore + 10;
  }

  // Else if: timer deducts ten seconds
  else if (
    userAnswer.textContent !=
    currentQuestion.answers[currentQuestion.correctAnswer]
  ) {
    secondsLeft = secondsLeft - 10;
  }

  if (questionIndex < questions.length && secondsLeft > 0) {
    nextQuestion();
  }

  // Else render results
  else if (
    questionIndex == questions.length ||
    secondsLeft == 0 ||
    secondsLeft < 0
  ) {
    showResults();
  }
}

function showResults() {
  quizQuestions.style.display = "none";
  quizAnswers.style.display = "none";
  userScore = userScore + secondsLeft;
  console.log(userScore);
  //
  //
  //
  //
  //
}

// Timer function
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left.";

    if (
      secondsLeft === 0 ||
      secondsLeft < 0 ||
      questionIndex == questions.length
    ) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Call functions

// Get item/set item to store info to local storage

// Get items from local storage - push to empty array

// Display empty array in to high scores

// Create event listeners for start-quiz button
startQuiz.addEventListener("click", begin);
