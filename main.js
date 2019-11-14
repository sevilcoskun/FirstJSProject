//Global Variables
var arr_correct = new Array();

//Called function while creating the form
function createQuiz(){
    var id = 0;

    game.questions.forEach(element => {
        var newp = document.createElement("p");
        newp.id = "question" + (++id);
        newp.innerHTML = element.text;
        document.getElementById("quizPage").appendChild(newp);

        element.options.forEach(element1 => {
            var container = document.createElement("div");

            var newi = document.createElement("input");
            newi.id = "option" + (id);
            newi.name = "option" + (id);
            newi.type = "radio";
            newi.value = element1.text;
            if(element1.correct){
                arr_correct.push(element1.text);
            }
               
            container.appendChild(newi);
            container.append(element1.text);
            
            document.getElementById("quizPage").appendChild(container);
        });
    });
}

//function is called after finish button is clicked
function check(){
    var score = 0;
    var range;
    
    for(var i = 0; i < game.questions.length; i++){
        var x = document.getElementsByName("option" + (i+1));
        x.forEach(e => {
            if(e.checked){
                if(e.value == arr_correct[i]){
                    score++;
                }
            }
        });  
    }
   
    var messages = ["Woooaw!!! Great Job!", "It is good!", "Meh it is okay, need more!", "You need to do it better!"];
    var img = ["img/success.gif","img/good.gif", "img/meh.gif", "img/lose.gif"]; 

    if(score < 3){
        range = 3;
    }
    if(score >= 3 && score < 6){
        range = 2;
    }
    if(score >= 6 && score < 9){
        range = 1;
    }
    if(score >= 9){
        range = 0;
    }

    document.getElementById("after_submit").style.visibility = "visible";
    
    document.getElementById("message").innerHTML = messages[range];
    document.getElementById("number_correct").innerHTML = "You got " + score + " answer correctly.";
    document.getElementById("img").style.width = "400px";
    document.getElementById("img").src = img[range];
}