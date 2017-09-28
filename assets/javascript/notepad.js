function displayQSet(index) {
  $("#content").html("");
  $("#content").append('<div><h4>Time Left: <span id="timeLeft"></span> Seconds</h4></div>');
  $("#content").append('<div class="prompt"><h2>Question: <span id="question">' + index.question + '</span></h2></div>');
  index.options.forEach(populateOptions);

  function populateOptions(option) {
    $("#content").append('<div class="answer-line"><h3><span class="answer" id="option1">'+ option +'</span></h3></div>');
  }
}



    $("#content").html("");
    $("#content").append('<div><h4>Time Left: <span id="timeLeft"></span> Seconds</h4></div>');
    $("#content").append('<div class="prompt"><h2>Question: <span id="question">' + index.question + '</span></h2></div>');
    index.options.forEach(populateOptions);

    function populateOptions(option) {
      $("#content").append('<div class="answer-line"><h3><span class="answer" id="option1">'+ option +'</span></h3></div>');
    }
    




    // $("#content").append('<div class="answer-line"><h3><span class="answer" id="option2">option 2</span></h3></div>');
    // $("#content").append('<div class="answer-line"><h3><span class="answer" id="option3">option 3</span></h3></div>');
    // $("#content").append('<div class="answer-line"><h3><span class="answer" id="option4">option 4</span></h3></div>');

  $("#content").html("");
  $("#question").text(index.question);
  $("#option1").text(index.option1);
  $("#option2").text(index.option2);
  $("#option3").text(index.option3);
  $("#option4").text(index.option4);