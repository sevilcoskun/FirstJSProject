//function is called after finish button is clicked
function printScore(nickname, score) {
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

    document.getElementById("game-div").style.display = "none";
    document.getElementById("finish-game").style.display = "block";

    document.getElementById("message").innerHTML = messages[range];
    document.getElementById("number_correct").innerHTML = nickname + ", You got " + score + " answer correctly.";
    document.getElementById("img").style.width = "400px";
    document.getElementById("img").src = img[range];

    setInterval(printAllPlayers, 2000);
}

async function printAllPlayers() {
    let request = await fetch('/results?nickname=' + nickname, {
        method: 'GET'
    });

    let json = await request.json();
    console.log('C <-- /results');

    const myNode = document.getElementById('players-list');
    myNode.innerHTML = '';
    json.forEach(element => {
        //if (element.name != nickname) {
            console.log('C <--: ' , element.name + 'Score: ' , element.score, '/results');
            let node = document.createElement('LI');
            let textnode = document.createTextNode(element.name + ' --> Score: ' + element.score);
            node.appendChild(textnode);
            myNode.appendChild(node);
        //}
    });
}