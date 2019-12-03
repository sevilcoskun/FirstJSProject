
var container;
var content;
var nickname;

document.querySelector('#form-nickname').addEventListener('submit', showInput);

async function showInput() {

    if (event) {
        event.preventDefault();
    }

    nickname = document.getElementById('nickname').value;
    var request = await fetch('/login?nickname=' + nickname, {
        method: 'POST'
    });
    if (request.status == 403) {
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
    var request = await fetch('/multiPlayer?nickname=' + nickname, {
        method: 'POST'
    });

    document.getElementById('login-div').style.display = "none";
    document.getElementById('players-div').style.display = "block";
    document.getElementById('player').innerHTML = "Hello " + await request.text() + ", Please select someone to play!";

    //add the a new player in the list
    //printAllPlayers();
    setInterval(printAllPlayers, 2000);
}

async function printAllPlayers() {
    var request = await fetch('/multiPlayer?nickname=' + nickname);
    var json = await request.json();
    const myNode = document.getElementById('players_list');
    myNode.innerHTML = '';
    json.forEach(element => {
        if (element.name != nickname) {
            var node = document.createElement("LI");
            var textnode = document.createTextNode(element.name);
            node.appendChild(textnode);
            myNode.appendChild(node);
        }
    });
}

// init();