//include nodejs modules
const express = require('express');
var app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));//mapping the public dir to client

app.listen(port, function (err, res) {
	if (err) {
		console.log("sever error");
	}
	else {
		console.log("server srtarted");
	}
});

var players = [];

app.post('/login', function login(req,res){
	if(players.find(p => p.name === req.query.nickname)){
		res.status(403);//Forbidden
		res.send("That nickname has already taken, please select new one!");
	}
	 else {
		console.log("Add new multi-player: " + req.query.nickname);
		//create a new player
		var player = {
			'name': req.query.nickname,
			'score': 0
		};
		players.push(player);

		res.status(200);
		res.send(req.query.nickname);
		console.log('S--> ' , req.query.nickname, ' /login');
	} 
});

app.get('/game', function game(req, res){
	let pos;
	console.log("Players ", players , req.query.name);
	pos = players.findIndex(item => item.name == req.query.name);
	res.send(JSON.stringify(players[pos]));
	console.log('S--> ' , players[pos], ' /game');
});

app.post('/result', function result(req,res){
	let pos;
	pos = players.findIndex(item => item.name == req.query.name);
	players[pos].score = req.query.score;
	res.send(JSON.stringify(players[pos]));
	console.log('S--> ' , players[pos], ' /result');
});

app.get('/results', function results(req, res){
	res.send(JSON.stringify(players));
	console.log('S--> ' , players, ' /all results');
})

app.delete('/deletePlayer', function deletePlayer(req, res){
	let p;
	console.log("Players ", players , req.query.nickname);
	p = players.findIndex(item => item.name == req.query.nickname);
	console.log("position " + p);
	if(p > -1){
		players.splice(p,1);
	}
	//item = players.filter(item => item.name == nickname);
})





