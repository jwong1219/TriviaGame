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
    console.log(gameLibrary.timerCount);
  },

  startTimer: function() {
    timerID = setInterval(gameLibrary.countDown, 1000);
  },

  stopTimer: function() {
    clearInterval(timerID);
  },

  correctMessage: function() {
    $("#message").text("Correct!");
  },

  incorrectMesssage: function() {
    $("#message").text("Incorrect!");
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

function displayQSet(index) {
  $("#question").text(index.question);
  $("#option1").text(index.option1);
  $("#option2").text(index.option2);
  $("#option3").text(index.option3);
  $("#option4").text(index.option4);
}
// test scripting starts here;
var q1 = new QSet("What is my name?", "Justin", "Yoli", "Sahil", "Amber", "option1");
gameLibrary.questionSet.push(q1);
var q2 = new QSet("What is my name?", "Sahil", "Yoli", "Justin", "Amber", "option3");
gameLibrary.questionSet.push(q2);

console.log(gameLibrary.questionSet);

// $("#start").on("click", function() {
//   $("#start").addClass("hidden");
//   displayQSet(gameLibrary.questionSet[0]);
//   gameLibrary.startTimer();
// });

// $(".answer").on("click", function() {
//   gameLibrary.stopTimer();
//   $("#start").removeClass("hidden");
// });

// test scripting ends here;

/* the page loads with a little intro and basic instructions "click to begin" */

//wait for player to click start
$("#start").on("click", function() {
  //hide the start button
  $("#start").addClass("hidden");
  //start the timer for this question, change counting to true;
  gameLibrary.startTimer();
  gameLibrary.counting = true;
  console.log(gameLibrary.counting);
  //display the question and options for this question
  displayQSet(gameLibrary.questionSet[gameLibrary.qTracker]);
});
//if time runs out...

  //count the question as unanswered

  //stop the timer, set counting to false;

  //display the time up msg and the correct answer

  //make the next button visible

//if the player clicks on an option
$(".answer").on("click", function() {
  var picked = $(this);
  console.log({picked});
  //if counting down...
  if (gameLibrary.counting) {
    console.log(gameLibrary.counting);
    //stop and reset the timer, set counting to false
    gameLibrary.counting = false;
    console.log(gameLibrary.counting);
    gameLibrary.stopTimer();
    gameLibrary.resetTimer();
    //evaluate
    //if correct, 
    if (picked.attr('id') === gameLibrary.questionSet[gameLibrary.qTracker].correct) {
      //increment the correct counter
      gameLibrary.correct++;
      console.log(gameLibrary.correct);
      //make the correct answer green and with a lit border;
      console.log(picked.parent());
      picked.addClass("correct");
      //display the "correct" message;
      gameLibrary.correctMessage();
    }
    //if incorrect,
    else {
      //increment the incorrect counter
      gameLibrary.incorrect++;
      console.log(gameLibrary.incorrect);
      //make the chosen answer red with a lit border, and make the correct answer green with a lit border,
      picked.addClass("incorrect");
      $("#" + gameLibrary.questionSet[gameLibrary.qTracker].correct).addClass("correct");
      //display the "incorrect" message;
      gameLibrary.incorrectMesssage();
    }
    //make the "next" button visible;
    $("#next").removeClass("hidden");

  }
});

//if the "next" button is clicked
$("#next").on("click", function() {
  //hide the "next" button
  $(this).addClass("invisible");
  //if there are more questions left
  if((gameLibrary.qTracker + 1) < gameLibrary.questionSet.length) {
    //reset the css formatting on the answers html
    $(".answer").removeClass("incorrect correct");
    //advance the qTracker
    gameLibrary.qTracker++;
    //call displayQset on the new qTracker
    displayQSet(gameLibrary.questionSet[gameLibrary.qTracker]);
    //start the counter
    gameLibrary.startTimer();
    gameLibrary.counting = true;
    console.log(gameLibrary.counting);
  }
  //else

    //display the end game "page" with the score results

});



 