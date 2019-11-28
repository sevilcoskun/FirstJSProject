
var container;
var content;
var user_name;

function showInput(){
    user_name = document.getElementById('nickname').value;

    document.getElementById('form-nickname').style.display = "none";

    document.getElementById('username').innerHTML =
        "Hello " + user_name +
        ", Please select game type";
    document.getElementById('play-type').style.visibility = "visible";
}

function singlePlayer(){
    document.getElementById('login-div').style.display = "none";
    document.getElementById('game-div').style.visibility = "visible";
    document.getElementById("player").append(user_name);
    init();
}

function multiPlayer(){
    //add the user in the list
    document.getElementById('login-div').style.display = "none";
}

// init();