
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
        document.getElementById('login-div').style.display = "none";
        document.getElementById('game-div').style.display = "block";
        init(name);
    }
}