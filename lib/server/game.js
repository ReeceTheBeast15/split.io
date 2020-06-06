var tester = require(__dirname+'/tester.js');

var game = {players:[],cubes:[]};

//Useful function definitions

function getUuid(){
	var result = [];
	for(let i = 0; i < 20; i++){
		result.push(i.toString(16));
	}
	return result.join();
};

function random(low, high){
	return Math.floor(Math.random() * (high - low + 1)) + low; 
};

function posornegbool(){
	var r = Math.round(Math.random(0,1));
	if(n === 0){
		r = -1;
	}
	return r;
}
//Some classes

class Entity{
	constructor(x, y, parent){
		this.x = x;
		this.y = y;
		this.UUID = getUuid();
		this.parent = parent;
	}
	delete(){
		this.parent.units.splice(this.parent.indexOf(this), 1);
	}
}


class Blob extends Entity{
	constructor(x, y, parent, color, mass){
		super(x, y, parent);
		this.color = color, 
		this.mass = mass,
		this.speed = random(3.5,6.5);
	}
	eat(eaten){
		this.mass += eaten.mass;
		eaten.delete();
	}
	activate(client){
		this.name = this.name || 0;
		if(this.hasOwnProperty('id')){
			//client.emit('update', game);
		}
		if(client.hasOwnProperty('controls')){
			let xDistance = Math.abs(client.controls.mouseX - screenWidth / 2),
			yDistance = Math.abs(client.controls.mouseY - screenWidth  / 2);  
			//Cheking if we are dealing with a head blob(aka player)
			if(this.name !== 0){
				
				var mouseX = client.controls.mouseX,
				mouseY = client.controls.mouseY,
				keyPressed = client.controls.keyPressed,
				keyCode = client.controls.keyCode,
				screenWidth = client.controls.windowWidth,
				screenHeight =  client.controls.windowHeight;

				let xPortion = (mouseX - screenWidth / 2) * (xDistance/yDistance),
				yPortion = (mouseY - screenHeight / 2) * (yDistance/xDistance);
				this.x += 2.5 * xPortion,
				this.y += 2.5 * yPortion;



			}
			else{
			
				let	xPortion = ((mouseX - screenWidth / 2) + (this.x - this.parent.x)) * (xDistance/yDistance),
				yPortion = ((mouseY - screenHeight / 2) + (this.y - this.parent.y)) * (yDistance/xDistance);
				this.x += this.speed * xPortion,
				this.y += this.speed * yPortion;


			}
		}
		console.log('Attempting to activate player loop...');
		//setTimeout(()=>{this.activate(this,client)}, 100);
	}
}
class Player extends Blob{
	constructor(x, y, parent, color, name, mass, id){
		super(x, y, parent, color, mass);
		this.name = name;
		this.units = [];
		this.id = id;
	}
	split(){
		let xPortion = Math.random() * this.mass;
		yPortion = this.mass - xPortion;
		let xRight = posornegbool();
		let yDown = posornegbool();		
		this.mass /= 2;
		this.units.push(new blob(this.x + (xPortion * xRight), this.y + (yPortion * yDown), this, this.color, this.mass / 2));
	}
}

function addSocket(socket, connections){
	
	socket.on('input-update',function(input){
		connections[connections.indexOf(socket)].controls = input;
	});

	socket.on('player-init',function(player){
		
		let name = player.name, color = player.color;
		console.log('Request for player initialization received with name %s and color %s', name, color);
		let i = game.players.push(new Player(random(0,500),random(0,500),game.players, color, name, 100, connections.indexOf(socket)));
		console.log(`Player successfully created.`);
		socket.emit('id', i-1);
		console.log(`Id of ${i-1} emitted.`);
		game.players[i-1].activate(connections[connections.indexOf(socket)]);
		console.log('Player loop successfully activated');
	});


};
function updateClients(sockets,	rate){
	console.log(`======Attempting to emit update to all sockets with sockets parameter: ${sockets} \n and rate parameter: ${rate} \n=====`);
	console.log('Emitting update...')
	sockets.emit('update', game);
	console.log('Update emitted successfully');
	setTimeout(()=>{updateClients(sockets, rate)}, 1000);
};






module.exports = {addSocket:addSocket, updateClients:updateClients}

tester.run();