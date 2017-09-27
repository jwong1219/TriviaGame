var gameLibrary = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  timerCount: 30,
  counting: false,
  questionSet: [],
  qTracker: 0,
  qLocked: false,

  countDown: function() {
    gameLibrary.timerCount--;
    $("#timeLeft").text(gameLibrary.timerCount);
    console.log(gameLibrary.timerCount);
  },

  resetTimer: function() {
    gameLibrary.timerCount = 30;
    $("#timeLeft").text(gameLibrary.timerCount);
  },

  startTimer: function() {
    timerID = setInterval(gameLibrary.countDown, 1000);
  },

  stopTimer: function() {
    clearInterval(timerID);
  }
}

var timerID;

function QSet(question, option1, option2, option3, option4, correct) {
  var that = this;
  this.question = question;
  this.option1 = option1;
  this.option2 = option2;
  this.option3 = option3;
  this.option4 = option4;
  this.correct = correct;
}

function displayQSet(set) {
  $("#question").text(set.question);
  $("#option1").text(set.option1);
  $("#option2").text(set.option2);
  $("#option3").text(set.option3);
  $("#option4").text(set.option4);
}
// test scripting starts here;
var q1 = new QSet("What is my name?", "Justin", "Yoli", "Sahil", "Amber", "Justin");
gameLibrary.questionSet.push(q1);

console.log({q1});
console.log(gameLibrary.questionSet[0]);
console.log(gameLibrary.questionSet[0].question);

$("#start").on("click", function() {
  $("#start").addClass("hidden");
  displayQSet(gameLibrary.questionSet[0]);
  gameLibrary.startTimer();
});

$(".answer").on("click", function() {
  gameLibrary.stopTimer();
  $("#start").removeClass("hidden");
});

// test scripting ends here;

/* the page loads with a little intro and basic instructions "click to begin" */

//wait for player to click start

  //hide the start button

  //start the timer for this question, change counting to true;

  //display the question and options for this question

//if time runs out...

  //count the question as unanswered

  //stop the timer, set counting to false;

  //display the time up msg and the correct answer

  //make the next button visible

//if the player clicks on an option
  //if counting down...

    //stop and reset the timer, set counting to false

    //evaluate
    //if correct, 

      //increment the correct counter

      //make the correct answer green and with a lit border;

      //display the "incorrect" message;

    //if incorrect,

      //increment the incorrect counter

      //make the chosen answer red with a lit border, and make the correct answer green with a lit border,

      //display the "correct" message;

    //make the "next" button visible;

//if the "next" button is clicked

  //hide the "next" button

  //start the timer for this question, change counting to true;

  //display the question and options for this question





 