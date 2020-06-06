
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
var _ = require('lodash');
var game = require(__dirname+'/lib/server/game.js');
app.use("/lib",express.static(__dirname+'/lib'));
app.use('/modules',express.static(__dirname+'/node_modules'));
users = [];
connections = [];



server.listen(process.env.PORT || 3000);
console.log('server running.......');

app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection',function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected',connections.length);
	game.addSocket(socket, connections);
	game.updateClients(io.sockets, 100);	
	//disconnect
	socket.on('disconnect',function(data){
		connections.splice(connections.indexOf(socket),1);
		console.log('Disconnected: %s sockets connected',connections.length);
	});
});




