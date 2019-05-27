//ARRAY FOR QUESTIONS
var questionGen = [{
    question: "How many velociraptors appear in Jurassic Park?",
    answer: ["One", "Two", "Three", "Four"],
    correctAns: "Four",
    img:"assets/images/cleverGirl.gif"
    }, {
    question: "The Tyrannosaurus Rex has been affectionately named what by the fans",
    answer: ["Arexa", "Rexy", "Barney", "Roberta"],
    correctAns: "Rexy",
    img:"assets/images/trex.gif"
    }, {
    question: "Amongst other sound effects, what animals were used to create the T-Rex roar?",
    answer: ["Alligators", "Tigers", "Baby Elephants", "All the above"],
    correctAns: "All the above",
    img:"assets/images/trexRoar.gif"
    }, {
    question: "Although Jurassic Park is catchy, most dinosaurs in the film come from which period?",
    answer: ["Triassic", "Cambrian Period", "no, it's the Jurassic Period", "Cretaceous Period"],
    correctAns: "Cretaceous Period",
    img:"assets/images/gate.gif"
    }, {
    question: "Jurassic Park has a runtime of 127 minutes. How many of them actually contain dinosaurs?",
    answer: ["Ten Minutes", "Fifteen Minutes", "Twenty-Two Minutes", "Twenty-Seven Minutes"],
    correctAns: "Fifteen Minutes",
    img:"assets/images/raptor.gif"
    }, {
    question: "What was Jurassic Park's biggest fault?",
    answer: ["Too Much Automation", "...It's Dinosaurs", "The Dinosaurs Didn't Have Feathers.", "Weather"],
    correctAns: "Too Much Automation",
    img:"assets/images/automation.gif"
    }, {
    question: "What was John Hammond's signature catch phrase?",
    answer: ["Spared Some Expense!", "Spared No Expense!", "Welcome to Jurassic Park!", "We have a T-Rex!"],
    correctAns: "Spared No Expense!",
    img:"assets/images/expense.gif"
    }, {
    question: "What island is Jurassic Park built on?",
    answer: ["Isla Sorna", "Isla Muerte", "Isla Nublar", "Isla Pena"],
    correctAns: "Isla Nublar",
    img:"assets/images/island.gif"
    }];

    console.log("Array Length: "+questionGen.length);

var time = 20;
var wins = 0;
var losses = 0;
var noAnswer = 0;
var questionCounter = 0;
console.log("questioncounter:"+questionCounter);
var gameEnd = false;

//PLACEHOLDER FOR TIMER INTERVAL
var interval;

//FUNCTIONS////////////////////////////////////////////////////////////////////////////////////////////////////////

function hideButtons() {
    //HIDE THE BUTTONS AND QUESTION FOR THE START PAGE
    $(".question").hide();
    $(".again").hide();
    $(".answers").hide();
}

function showButtons() {
    //SHOW THE BUTTONS FOR GAME START
    $(".question").show();
    $(".answers").show();
}

//STARTS THE TIME INTERVAL
function start() {
    //RESETS INTERVAL
    clearInterval(interval);
    interval = setInterval(decrement, 1000);
}

//ALLOWS THE TIMER TO VISIBLY COUNT DOWN
function decrement() {
    time--
    $(".timer").html(time + " seconds");
    if (time === 0) {
        noAnswer++;
        stop();
        hideButtons();
        $(".answers").empty();
        $('audio#timeUp')[0].play()
        $(".img").html("<img src='assets/images/timeUp.gif' id='responsive-image'></img>");
        $(".result").html("<h2 class='p-3' id= 'button3'>Not Answered in Time</h2>");
        setTimeout(notAnswered, 5000);
    }
}

//STOPS INTERVAL
function stop() {
    clearInterval(interval);
}

//CHECK USER SELECTION TO SEE IF IT WAS THE CORRECT ANSWER
//INFORMATION FROM THE BUTTON CLICK IS PUSHED INTO THIS FUNCTION
function checkAnswer(event) {
    stop();
    //IF ELSE STATEMENT THAT COMPARES THE BUTTON DATA WITH THE CURRENT QUESTIONS CORRECT ANSWER
    if ($(event.target).data("answer")== questionGen[questionCounter].correctAns) {
        hideButtons();
        $(".answers").empty();
        $(".result").html("<h2 class='p-3' id= 'button3'>Correct!</h2>");
        $(".img").html("<img src='"+questionGen[questionCounter].img+"' id='responsive-image'></img>");
        $('audio#correct')[0].play()
        wins++;
        setTimeout(rightAnswer, 3000);
    } else {
        hideButtons();
        $(".answers").empty();
        $(".result").html("<h2 class='p-3' id= 'button3'>Wrong Answer</h2>");
        $(".img").html("<img src='assets/images/wrong.gif' id='responsive-image'></img>");
        $('audio#wrong')[0].play()
        losses++;
        setTimeout(wrongAnswer, 3000);
    }
    if ($(event.target).data("answer")== questionGen[2].correctAns) {
        $('audio#roar')[0].play()
    }
}

function rightAnswer() {
    console.log("reset");
    questionCounter++;
    console.log("questioncounter:"+questionCounter);
    showButtons();
    gameStart()
    time = 20;
    $(".timer").html(time + " seconds");
    console.log("wins: "+wins);
    console.log("Losses: "+losses);
    console.log("Unanswered: "+noAnswer);
    $(".result").empty();
    $(".img").empty();
}

function wrongAnswer() {
    console.log("reset");
    questionCounter++;
    console.log("questioncounter:"+questionCounter);
    showButtons();
    gameStart();
    time = 20;
    $(".timer").html(time + " seconds");
    console.log("wins: "+wins);
    console.log("Losses: "+losses);
    console.log("Unanswered: "+noAnswer);
    $(".result").empty();
    $(".img").empty();
}
function notAnswered() {
    console.log("reset");
    questionCounter++;
    console.log("questioncounter:"+questionCounter);
    showButtons();
    gameStart();
    time = 20;
    $(".timer").html(time + " seconds");
    console.log("wins: "+wins);
    console.log("Losses: "+losses);
    console.log("Unanswered: "+noAnswer);
    $(".result").empty();
    $(".img").empty();
}

function finalResults() {
    stop();
    $(".timer").hide();
    $(".question").html("<h2 class='p-3' id= 'button3'>Game Over!</h2>");
    $(".stats").append("<div class='score px-3' id='button3'>Answers Correct: "+wins+"</div>");
    $(".stats").append("<div class='score px-3' id='button3'>Answers Wrong: "+losses+"</div>");
    $(".stats").append("<div class='score px-3'id='button3'>Questions Not Answered: "+noAnswer+"</div>");
    $(".again").on("click", function() {
        $(this).hide();
        wins = 0;
        losses = 0;
        questionCounter = 0;
        time = 20;
        $(".timer").show();
        $(".stats").empty();
        gameStart();
        start();
    });
}

//GAME START FUNCTION WILL CONTAIN THE ENTIRETY OF THE GAME
function gameStart() {
    if (questionCounter === questionGen.length) {
        $(".again").show();
        finalResults();
        return;
    } else {
        start();
    //MAKE BUTTONS APPEAR
    showButtons();
    //QUESTION APPEARS
    $(".question").html("<h2>"+questionGen[questionCounter].question+"</h2>");
    console.log("Question: "+questionGen[questionCounter].question);
    //QUESTION ONE
    //USING A FOR LOOP TO GENERATE THE BUTTONS RATHER THAN TYPING OUT FOUR SEPERATE BUTTONS.
    for (i = 0; i < questionGen[questionCounter].answer.length; i++) {
        //APPEND BUTTONS TO HTML. FOUND OUT HOW TO STORE DATA (OR ANSWERS IN THIS CASE) TO EACH BUTTON.
        $(".answers").append("<button class='button btn-block px-5 text-center' id='button"+2+"' data-answer='"+questionGen[questionCounter].answer[i]+"'>"+questionGen[questionCounter].answer[i]+"</button>");
    }
    console.log($("#button0").attr("data-answer"));
    console.log($("#button1").attr("data-answer"));
    console.log($("#button2").attr("data-answer"));
    console.log($("#button3").attr("data-answer"));
    }
}

//MAIN PROCESS//////////////////////////////////////////////////////////////////////////////////////////////////////// 
//CLICK FUNCTIONS FOR START BUTTON
$(document).ready(function() {
    hideButtons();

    $('audio#opening')[0].play()
    $(".stop").hide();
    $(".play").hide();
    $(".timer").hide();

    $(".start").on("click", function() {
        $('audio#opening')[0].pause()
        $('audio#opening')[0].currentTime = 0
        $('audio#main')[0].play()
        $(this).remove();
        $(".stop").show();
        $(".timer").show();
        gameStart();
    });
    $(".stop").on("click", function() {
        $('audio#main')[0].pause()
        $(".stop").hide();
        $(".play").show();
    });
    $(".play").on("click", function() {
        $('audio#main')[0].play()
        $(".stop").show();
        $(".play").hide();
    });
    //CHECKS DOCUMENT PAGE FOR EVENT CLICK. ORIGINALLY HAD THIS INSIDE THE GAMESTART FUNCTION AND FOUND THAT THERE WAS A SCOPING ISSUE
    $(document).on("click", '.button', function(event) {
        console.log("user click");
        //PASS EVENT CLICK BUTTON ONFIRMATION INTO THE CHECK ANSWER FUNCTION
        checkAnswer(event);
    });
});