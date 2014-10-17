//CONSTANTS
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

//Global variables
var ctx;

//Init function
function init(){
	var canvasElement = document.getElementById("main-canvas");
	ctx = canvasElement.getContext("2d");
}

//This function will act as our main game loop
function runGameLoop(){

	//Clear the screen
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
	//Code goes here
	/*-----------------------------------------------------------*/
	
	ctx.fillStyle = "red";
	ctx.fillRect(20, 20, 20, 20);

	/*-----------------------------------------------------------*/
	
	//Re-call this function
	window.requestAnimationFrame(runGameLoop);
}

$(document).ready(function(){
	console.log("Ready");
	
	//Setup function
	init();
	
	//Game loop function
	runGameLoop();
});

