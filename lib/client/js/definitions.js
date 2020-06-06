var game = {}, renderContext, fillColor, strokeColor, player;

function rgbColor(r, g, b){
	return 'rgb(' + r + ',' + g + ',' + b + ')';
};

function hexColor(str){
	let val = str.replace('#', '').replace(' ', '');
	return 'rgb(' + str.slice(0, 1).toString(16) + ',' + str.slice(2, 3).toString(16) + ',' +str.slice(4, 5).toString(16) + ')';
};

function fill(color){
	fillColor = color;
	return color;
};

function stroke(color){
	strokeColor = color;
	return color;
}

class Shape{
	outline(args){
		renderContext[this.type](...args);
	}
	draw(){
		renderContext.beginPath();
		this.outline(arguments);
		renderContext.fillStyle = fillColor;
		renderContext.fill();
	}	
}


class rect extends Shape{
	constructor(x, y, w, h){
		super();
		this.type = 'fillRect';
		this.draw(x, y, w, h);
	}
}

class circle extends Shape{
	constructor(x, y, diameter){
		super();
		this.type = 'arc';
		this.draw(x, y, diameter, 0, 2 * Math.PI(), false);
	}

}
 

class line extends Shape{
	constructor(x1, x2, y1, y2){
		super();
		this.type = 'line';
		this.draw(x1, x2, y1, y2);
	}
}


