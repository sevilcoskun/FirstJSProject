
function check(){
    var answer1 = document.quiz.answer1.value;
    var answer2 = document.quiz.answer2.value;
    var answer3 = document.quiz.answer3.value;
    var correct = 0;

    if(answer1 == "Ankara" || "ankara")
        correct++;
    if(answer2 == "Kebap")
        correct++;
    if(answer3 == "Bodrum")
        correct++;

    var messages = ["Great Job!", "Meh it is okay", "You need to do it better!"];

    var range;
    if(correct < 1){
        range = 2;
    }
    if(correct > 0 && correct < 3){
        range = 1;
    }
    if(correct > 2){
        range = 0;
    }

    document.getElementById("after_submit").style.visibility = "visible";
    document.getElementById("message").innerHTML = messages[range];
    document.getElementById("number_correct").innerHTML = "You got " + correct + " answer correctly.";

}