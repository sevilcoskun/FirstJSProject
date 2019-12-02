/*var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	fs.readFile('index.html', function(err, data){
		res.write(data);//send data(index.html data) to client
	});
});
*/


var express = require('express');
var app = express();
var port = 8080;

app.use(express.static('public'));//mapping the public dir to client

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
		res.status(401);
		res.send("That nickname has already taken, please select new one!");
	}
	else {
		console.log("Add new player: " + req.query.nickname);
		//create a new player
		var player = {
			'name': req.query.nickname,
			'playing': false,
			'score': 0
		};
		players.push(player);

		res.status(200);
		res.send(req.query.nickname);
	}
});

app.get('/startGame', function startGame(req, res) {

	res.send(JSON.stringify(players));
});

app.get('/login', function(req, res){
	req.on('close', function(){
		console.log(players.find(p => p.name === req.query.nickname) + " closed!")
		//delete players.find(p => p.name === req.query.nickname);
	});
});

app.get('/login', function(req, res){
	req.on('end', function(){
		console.log(players.find(p => p.name === req.query.nickname) + " ended!")
		//delete players.find(p => p.name === req.query.nickname);
	});
});


