//include nodejs modules
const express = require('express');
var app = express();
//var server = require('http').Server(app);
//var io = require('socket.io')(server);
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

//app.listen is not working here
/*server.listen(port, function (err, res) {
	if (err) {
		console.log("sever error");
	}
	else {
		console.log("server srtarted");
	}
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
	socket.emit('news', {hello: 'worrld'});
	socket.on('my other event', function(data){
		console.log(data);
	});
});*/

var players = [];

app.post('/login', function login(req,res){
	if(players.find(p => p.name === req.query.nickname)){
		res.status(403);//Forbidden
		res.send("That nickname has already taken, please select new one!");
	}
	 else {
		/* console.log("Add new player: " + req.query.nickname);
		//create a new player
		var player = {
			'name': req.query.nickname,
			'type': 0,
			'playing': false,
			'score': 0
		};
		players.push(player); */
		res.status(200);
		res.send(req.query.nickname);
	} 
});

app.post('/multiPlayer', function multpPlayer(req, res){
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



