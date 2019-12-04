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
		res.status(200);
		res.send(req.query.nickname);
	} 
});

app.post('/multiPlayer', function multiPlayer(req, res){
	console.log("Add new multi-player: " + req.query.nickname);
		//create a new player
		var player = {
			'name': req.query.nickname,
			'playing': false,
			'score': 0
		};
		players.push(player);

		res.status(200);
		res.send(req.query.nickname);
})

app.get('/multiPlayer', function multiPlayer(req, res){
	res.send(JSON.stringify(players));
});

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





