var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.line = function(x1,y1,x2,y2){
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.strokeStyle = strokeColor;
	ctx.stroke();
}

renderContext = ctx;




function renderLoop(){
	new rect(0, 0, window.innerWidth,window.innerHeight);
	if(game.hasOwnProperty('players')){	

	player = game.players[input.id];
	 
		for(var i = 0; i < game.players.length; i++){
			if(i === input.id){

				for(var ii = 0; ii < player.ranks.length; ii++){
					stroke(rgb(255,255,255));
					let rank = player.ranks[ii];
					new line(input.windowWidth / 2, input.windowHeight / 2, rank.x, rank.y);
					new ellipse(rank.x - player.x + input.widowWidth / 2, rank.y - player.y + input.windowHeight / 2, player.ranks[ii].mass);
				}
				fill(player.color);
				new ellipse(input.windowWidth / 2, input.windowHeight / 2, player.mass);
			}
			else{
				for(var ii = 0; ii < game.players.ranks.length; ii++){
					stroke(rgb(255,255,255));
					new line(game.players[i].x, game.players[i].y, game.players[i].ranks[ii].x, game.players[i].ranks[ii].y);
					new ellipse(game.players[i].ranks[ii].x, game.players[i].ranks[ii].y, game.players[i].ranks[ii].mass);
				}
				fill(game.players[i].color);
				new ellipse(game.players[i].x, game.players[i].y, game.players[i].mass);
			}	
		}
		ctx.clearRect(0,0,input.windowWidth,input.windowHeight);
	}

	
	setTimeout(renderLoop, 10);
};

renderLoop();
