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
    countdownID = setInterval(gameLibrary.countDown, 1000);
  },

  stopTimer: function() {
    clearInterval(countdownID);
  },

  timeUp: function() {
    console.log("inside timeUp");
    //if time runs out...
    //count the question as unanswered
    gameLibrary.unanswered++;
    //stop the timer, set counting to false;
    gameLibrary.counting = false;
    console.log(gameLibrary.counting);
    gameLibrary.stopTimer();
    gameLibrary.resetTimer();
    //display the time up msg and the correct answer
    $("#message").text("Time's Up!");
    //make the next button visible
    $("#next").removeClass("hidden");
  },

  correctMessage: function() {
    $("#message").text("Correct!");
  },

  incorrectMesssage: function() {
    $("#message").text("Incorrect!");
  }
}

var countdownID;
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
  //change the html from the start page to the question set format
  $("#welcome").addClass("hidden");
  $("#onStart").removeClass("hidden");
  //start the timer & countdown for this question, change counting to true;
  gameLibrary.startTimer();
  gameLibrary.counting = true;
  console.log(gameLibrary.counting);
  timerID = setTimeout(gameLibrary.timeUp, 1000 * 30);
  //display the question and options for this question
  displayQSet(gameLibrary.questionSet[gameLibrary.qTracker]);
});


//if the player clicks on an option
$("#option1").on("click", function() {
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
    clearTimeout(timerID);
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
  $(this).addClass("hidden");
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
    timerID = setTimeout(gameLibrary.timeUp, 1000 * 30);
  }
  //else
  else {
    //display the end game "page" with the score results
    $("#message").text("Game Over!");
    $("#content").html("<div id='results'></div>");
    $("#results").append("<h2>Correct: " + gameLibrary.correct);
    $("#results").append("<h2>Incorrect: " + gameLibrary.incorrect);
    $("#results").append("<h2>Unanswered: " + gameLibrary.unanswered);
  }

});



 