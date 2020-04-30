
var input = {windowWidth:window.innerWidth,windowHeight:window.innerHeight};
$('#canvas').mousemove(function(e){
	input.mouseX = e.pageX,
	input.mouseY = e.pageY;

	input.windowWidth = window.innerWidth,
	input.windowHeight = window.innerHeight;
});

$('#canvas').keypress(function(e){
	input.keyIsPressed = true,
	input.keyCode = e.keyCode;
});



