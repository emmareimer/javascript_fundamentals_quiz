// Assign query selector variables
var startQuiz = document.querySelector(".start-quiz");
var quizQuestions = document.querySelector("#questions");
var quizAnswers = document.querySelector("#possible-answers");
var goBack = document.getElementById("go-back");
var clearButton = document.getElementById("clear");
var yesOrNo = document.getElementById("yes-correct");

// Connects timeEl with timer in html
var timeEl = document.querySelector(".timer");

// Sets the seconds in the game for setTime function
var secondsLeft = 60;

// Other variables
var possibleAnswers = [];
var userAnswer = [];
var userScore = 0;
var questionIndex = 0;
var currentQuestion = null;
var userFinalScore = "";
var userInitials = JSON.parse(localStorage.getItem("initials"));

// If nothing in user storage, use info in array
if (userInitials === null) {
  userInitials = [];
}

var userScoreArr = JSON.parse(localStorage.getItem("score"));

if (userScoreArr === null) {
  userScoreArr = [];
}

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
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "<scripting>",
      b: "<js>",
      c: "<javascript>",
      d: "<script>",
    },
    correctAnswer: "d",
  },

  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: {
      a: "<head>",
      b: "<body>",
      c: "It doesn't matter; <head> or <body>",
      d: "None of the above",
    },
    correctAnswer: "b",
  },

  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: {
      a: "<script name='xxx.js'>",
      b: "<script href='xxx.js'>",
      c: "<script src='xxx.js'>",
    },
    correctAnswer: "c",
  },

  {
    question: "How do you create a function in JavaScript?",
    answers: {
      a: "function:myFunction()",
      b: "function=myFunction()",
      c: "function myFunction ()",
    },
    correctAnswer: "c",
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

  {
    question: "What is the correct way to write a JavaScript array?",
    answers: {
      a: "var colors = (1:'red', 2:'green', 3:'blue'",
      b: "var colors = ['red', 'green', 'blue'",
      c: "var colors = 1(red) 2(green) 3(blue)",
      d: "var colors = 'red', 'green', 'blue'",
    },
    correctAnswer: "b",
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

// Function to see if user selects the correct answer
function selectAnswer(event) {
  userAnswer = event.target;

  // If: answer matches correct answer, display "correct" and go to next question
  if (
    userAnswer.textContent ===
    currentQuestion.answers[currentQuestion.correctAnswer]
  ) {
    // Display yas correct
    yesOrNo.innerHTML = "Yasss! +10 points for you, Glen Coco!";
    // Add 10 points to score
    userScore = userScore + 10;
  }

  // Else if: timer deducts ten seconds
  else if (
    userAnswer.textContent !=
    currentQuestion.answers[currentQuestion.correctAnswer]
  ) {
    // Display wrong
    yesOrNo.innerHTML = "Wrong! -10 seconds!";
    // Deduct 10 seconds
    secondsLeft = secondsLeft - 10;
  }

  // Calls next question function
  if (questionIndex < questions.length && secondsLeft > 0) {
    nextQuestion();
  }

  else if (secondsLeft <= 0) {
    showResults();
  }

  // Else render results
  else if (questionIndex == questions.length || secondsLeft === 0) {
    showResults();
  }
}

function showResults() {
  // Hides questions and answers
  quizQuestions.style.display = "none";
  quizAnswers.style.display = "none";

  // Calculates score
  userScore = userScore + secondsLeft;

  if (userScore < 0) {
    userScore = 0;
  }

  // Adds score to the body of the html and unhides initial form
  userFinalScore.innerHTML = "";
  userFinalScore = "Your score: " + userScore;

  document.getElementById("display-score").textContent = userFinalScore;
  document.getElementById("form").style.visibility = "visible";

  // Event listener for submit button in form - calls submit score function
  var userSubmitScore = document.getElementById("submit");
  userSubmitScore.addEventListener("click", submitScore);
}

// Submit score function
function submitScore(event) {
  event.preventDefault();

  document.getElementById("form").style.visibility = "hidden";
  yesOrNo.innerHTML = "";

  var userSubmitScore = document.getElementById("submit");
  userSubmitScore.style.visibility = "hidden";

  // Set score and initials to local storage, option 1
  userScoreArr.push(userScore);
  localStorage.setItem("score", JSON.stringify(userScoreArr));

  // Set initials to local storage, option 1
  var userInitialsInput = document.getElementById("initials");
  userInitials.push(userInitialsInput.value);

  localStorage.setItem("initials", JSON.stringify(userInitials));

  // Clears the initial input value
  userInitialsInput.value = "";

  // Event listener for clear button
  clearButton.addEventListener("click", function () {
    localStorage.clear();
    document.querySelectorAll(".table-row").forEach((e) => e.remove());
  });

  renderMessage();

  // Send scores to the table
  function renderMessage() {
    // High score table visible
    var visibleTable = document.getElementById("table");
    visibleTable.style.visibility = "visible";
    // Clear button visible
    var clearForm = document.getElementById("clear");
    clearForm.style.visibility = "visible";
    // Go back button visible
    goBack.style.visibility = "visible";

    // Create a for loop that creates and append a table row for each high score
    for (let i = 0; i < userInitials.length; i++) {
      var newTableRow = document.createElement("tr");
      newTableRow.classList.add("table-row");
      var tableDataOne = document.createElement("td");
      var tableDataTwo = document.createElement("td");

      tableDataOne.innerHTML = userInitials[i];
      tableDataTwo.innerHTML = userScoreArr[i];

      newTableRow.append(tableDataOne, tableDataTwo);

      visibleTable.appendChild(newTableRow);
    }
  }
}

// Timer function
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left.";

    if (secondsLeft <= 0 || questionIndex == questions.length) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }

    // Sets seconds left equal to zero if timer goes below zero
    if (secondsLeft < 0) {
      secondsLeft = 0;
      timeEl.textContent = secondsLeft;
    }
  }, 1000);
}

// Create event listeners for start-quiz button
startQuiz.addEventListener("click", begin);

// Event listener for go back button
goBack.addEventListener("click", function () {
  location.reload();
});

// TO DO LIST !!!
// 1. Make sure that when timer <= 0, call render message function
// 2. Sort the highscores highest to lowest
// 3. Media query
