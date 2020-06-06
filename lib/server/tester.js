const jasmine = require('jasmine-node');
module.exports = {
	run:function(){
		describe('players',function(){
			for(let i = 0; i < game.players.length; i++){
				it('is not null',function(){
					expect(game.players[i]).not.toBe(null || undefined);
				});
			}

		});
	}
};