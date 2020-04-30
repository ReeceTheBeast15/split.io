var socket = io.connect();


function playerInit(event){
	event.preventDefault();
	$('form').hide();
	$('')
	let name = $('#name').val();
	color = $('#color').val();
	$('#canvas-cover').width(0).height(0);
	console.log('Sending message to server for player initialization, with name %s and color %s', name, color);
	socket.emit('player-init',{name:name, color:color});
};

socket.on('update',function(game_status){
	console.log('Update received:'+game_status);
	game = game_status;	
	socket.emit('input-update', input);
});

socket.on('id',function(i){
	console.log('Self-identitity %d received',i);
	input.id = i;
});
	
