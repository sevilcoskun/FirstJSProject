function showInput(){
    document.getElementById('form-nickname').style.display = "none";
    document.getElementById('submit-nickname').style.display = "none";

    document.getElementById('username').innerHTML =
        "Hello " + document.getElementById('nickname').value 
        + ", Please select game type";

    document.getElementById('play-type').style.visibility = "visible";

}

function singlePlayer(){
    window.open("html/gamePage.html");
}

function multiPlayer(){

}