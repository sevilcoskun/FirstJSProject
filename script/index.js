var user_name;
function showInput(){
    document.getElementById('form-nickname').style.display = "none";
    document.getElementById('submit-nickname').style.display = "none";

    user_name = document.getElementById('nickname').value;
    document.getElementById('username').innerHTML =
        "Hello " + user_name +
        ", Please select game type";
    document.getElementById('play-type').style.visibility = "visible";
}

function singlePlayer(){
    window.open("html/gamePage.html");
}

function multiPlayer(){
    //add the user in the list
    window.open("html/usersPage.html");
}