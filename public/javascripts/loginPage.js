
var container;
var content;
var nickname;

document.querySelector('#form-nickname').addEventListener('submit', showInput);

async function showInput() {

    if(event){
        event.preventDefault();
    }

    nickname = document.getElementById('nickname').value;
    var request = await fetch('/login?nickname=' + nickname, {
        method: 'POST'
    });
    if (request.status == 401) {
        document.getElementById('form-nickname').innerHTML = await request.text();
    }
    else {
        var name = await request.text();
        document.getElementById('form-nickname').style.display = "none";

        document.getElementById('play-type').style.display = "block";
        document.getElementById('username').innerHTML =
            "Hello " + name +
            ", Please select game type";
    }
}

function singlePlayer() {
    document.getElementById('login-div').style.display = "none";
    document.getElementById('game-div').style.visibility = "visible";
    init();
}

async function multiPlayer() {
    //add the a new player in the list
    document.getElementById('login-div').style.display = "none";
    document.getElementById('players-div').style.display = "block";
    var request = await fetch('/startGame?nickname=' + nickname);

    var json = await request.json();
    document.getElementById('player').innerHTML = "Hello " + nickname + ", Please select someone to play!";

    json.forEach(element => {
        if (element.name != nickname) {
            var node = document.createElement("LI");
            var textnode = document.createTextNode(element.name);
            node.appendChild(textnode);
            document.getElementById("players_list").appendChild(node);
        }

    });

}

// init();