$(document).ready(function() {

  var gameLibrary = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    timerCount: 30,
    counting: false,
    questionSet: [],
    qTracker: 0,
    qLocked: false,
    goodGif: [],
    badGif: [],

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

  //question-answer object template
  function QSet(question, option1, option2, option3, option4, correct) {
    var that = this;
    this.question = question;
    this.options = [option1, option2, option3, option4];
    this.correct = correct;
  }

  //for each new question, erases the content previously on the page and repopulate with the new question-answer set in formatted HTML 
  function displayQSet(index) {
    $("#content").html("");
    $("#content").append('<div><h4>Time Left: <span id="timeLeft"></span> Seconds</h4></div>');
    $("#content").append('<div class="prompt"><h2>Question: <span id="question">' + index.question + '</span></h2></div>');
    index.options.forEach(populateOptions);

    function populateOptions(option,index) {
      $("#content").append('<div class="answer-line"><h3><span class="answer" id="option'+ (index+1) +'">'+ option +'</span></h3></div>');
    }
  }

  // test scripting starts here;
  var q1 = new QSet("What is the name of the town the characters in Parks & Rec live in?", "Raleigh", "Pawnee", "Eagleton", "Pyrmont", "option2");
  gameLibrary.questionSet.push(q1);
  var q2 = new QSet("What is the name of Pawnee's rival town?", "Eagleton", "Beaverton", "Beagleton", "Indinanapolis", "option1");
  gameLibrary.questionSet.push(q2);
  var q3 = new QSet("What does Ben 'Treat Yoself' to?", "A Lightsaber", "A model of the starship Galactaca", "A new car", "A Batsuit", "option4");
  gameLibrary.questionSet.push(q3);
  gameLibrary.questionSet.push(new QSet("What is the name of the game that Ben creates?", "Settlers of Catan", "Dominion", "The Cones of Dunshire", "The Mines of Moria", "option3"));
  gameLibrary.questionSet.push(new QSet("Who is Pawnee's biggest celebrity?", "Li'l Sebastian", "Ginuwine", "Pete Disellio", "Perd Hapley", "option1"));
  gameLibrary.questionSet.push(new QSet("What is the name of Pawnee's most raunchy morning talk show?", "Eric Cartman and the Coon", "Howard Stern", "Batty Bob and the Tweaky Trio", "Crazy Ira and the Douche", "option4"));
  gameLibrary.questionSet.push(new QSet("What is the name of Joan Calamezzo's television talk show?", "Pawnee Now", "Pawnee Today", "Pawnee in the Morning", "Good Morning Pawnee", "option2"));
  gameLibrary.questionSet.push(new QSet("Who is Andy's crime-fighting alter ego, and who does he work for?", "Kurt Smacklin, CIA", "Ethan Hunt, Secret Service", "Burt Macklin, FBI", "John Sheppard, US Air Force", "option3"));


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
    $("#welcomeImage").addClass("hidden");
    $("#content").removeClass("hidden");
    $("#message").removeClass("hidden");
      //attempted refactor of the above lines here
    // $("#content").html("");
    // $("#content").append('<div><h4>Time Left: <span id="timeLeft"></span> Seconds</h4></div>');
    // $("#content").append(' <div class="prompt"><h2>Question: <span id="question">Question</span></h2></div>');
    // $("#content").append('<div class="answer-line"><h3><span class="answer" id="option1">option 1</span></h3></div>');
    // $("#content").append('<div class="answer-line"><h3><span class="answer" id="option2">option 2</span></h3></div>');
    // $("#content").append('<div class="answer-line"><h3><span class="answer" id="option3">option 3</span></h3></div>');
    // $("#content").append('<div class="answer-line"><h3><span class="answer" id="option4">option 4</span></h3></div>');
    //start the timer & countdown for this question, change counting to true;
    gameLibrary.startTimer();
    gameLibrary.counting = true;
    console.log(gameLibrary.counting);
    timerID = setTimeout(gameLibrary.timeUp, 1000 * 30);
    //display the question and options for this question
    displayQSet(gameLibrary.questionSet[gameLibrary.qTracker]);
  });


  //if the player clicks on an option
  $("#content").on("click",".answer", function() {
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

});

 