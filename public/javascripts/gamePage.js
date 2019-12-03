//Global Variable
var container;
var content;
var timeoutHandle;

var cnt_next = game.questions.length;
var cnt_q = 0;
var score = 0;

function init() {
    container = document.getElementById("form-quiz");
    content = container.innerHTML;

    document.querySelector('#form-quiz').addEventListener('submit', answerQuestion);
    printQuestion();
}

function printQuestion() {
    if (cnt_next > 0) {
        //Refresh container and timer
        container.innerHTML = content;
        countdown(10);

        document.getElementById("div_status").style.visibility = "hidden";

        document.getElementById("btn_answer").style.display = "block";

        //print the question
        document.getElementById("p_question").innerHTML = game.questions[cnt_q].text;

        //print the options
        for(var i = 0; i < 3; i++){
            document.getElementById("div_option" + (i+1)).append(game.questions[cnt_q].options[i].text);
            document.getElementById("inp_option" + (i+1)).setAttribute("value", game.questions[cnt_q].options[i].text);
        }     

        //answer btn functionality
        var quiz = document.getElementById("form-quiz");
        quiz.addEventListener('change', function (e) {
            document.getElementById("btn_answer").disabled = false;
        }, false);
    }
    else {
        printScore();
    }
}

function countdown(seconds) {
    var local_second = seconds;
    function tick() {
        var counter = document.getElementById("timer");
        counter.style.backgroundColor = "white";
        local_second--;
        counter.innerHTML = "Remaining time: " +
        String(local_second);
        if (local_second > 0) {
            if(timeoutHandle){
                clearTimeout(timeoutHandle);
            }
            timeoutHandle = setTimeout(tick, 1000);
        } else {
            answerQuestion(undefined);
        }
    }
    tick();
}

function answerQuestion(event) {
    var current_status = false;
    let answered;
    var doc_options;

    if(event){
        event.preventDefault();
    }

    for(var i = 1; i < 4; i++){
        document.getElementById("inp_option"+i).disabled = "true";
    }

    doc_options = document.getElementsByName("option");
    const correctAnswer = game.questions[cnt_q].options.find(e => e.correct).text;

    var option_array = Array.prototype.slice.call(doc_options);
   
    var a = option_array.find(e => e.checked);
    if(a){
        answered = a.value;
    }

    if(answered == correctAnswer){
        score++;
        current_status = true;
        clearTimeout(timeoutHandle);
    }
    else if(answered){
        clearTimeout(timeoutHandle);
    }
    cnt_q++;
    cnt_next--;
    printMessage(current_status, correctAnswer, answered);
}

function printMessage(current_status, correctAnswer, answered) {
    console.log(current_status, correctAnswer, answered);
    document.getElementById("btn_answer").style.display = 'none';

    if (cnt_next == 0) {
        document.getElementById("btn_next").innerHTML = "Finish the Quiz!";
    }

    document.getElementById("p_status").style.visibility = "visible";
    document.getElementById("btn_next").style.visibility = "visible";

    if (current_status) {
        document.getElementById("p_status").style.color = "green";
        document.getElementById("p_status").innerHTML = "You answered correctly!";
    }
    else if(answered) {
        document.getElementById("p_status").style.color = "red";
        document.getElementById("p_status").innerHTML = `You answered wrongly! The correct answer: ${correctAnswer}`;
    }
    else{
        document.getElementById("p_status").style.color = "#d97700";
        document.getElementById("p_status").innerHTML = `Your time is up and you didn't answered! The correct answer: ${correctAnswer}`;
    }

    document.getElementById("btn_next").onclick = printQuestion;
}

//function is called after finish button is clicked
function printScore() {
    var range;

    var messages = ["Woooaw!!! Great Job!", "It is good!", "Meh it is okay, need more!", "You need to do it better!"];
    var img = ["images/success.gif", "images/good.gif", "images/meh.gif", "images/lose.gif"];

    if (score < 3) {
        range = 3;
    }
    if (score >= 3 && score < 6) {
        range = 2;
    }
    if (score >= 6 && score < 9) {
        range = 1;
    }
    if (score >= 9) {
        range = 0;
    }

    document.getElementById("form-quiz").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("finish-game").style.visibility = "visible";

    document.getElementById("message").innerHTML = messages[range];
    document.getElementById("number_correct").innerHTML = "You got " + score + " answer correctly.";
    document.getElementById("img").style.width = "400px";
    document.getElementById("img").src = img[range];
}

//init();
