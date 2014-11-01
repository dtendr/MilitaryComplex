//CONSTANTS
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var CurrentScreen = {
	TITLE: 0,
	MAIN: 1,	
	GAMEOVER: 2,
	GAMEWIN: 3
}; 
var currentScreen = 0;
var canvasElement;

//Global variables
var ctx;

//Resource loader and resource variable declaration
var RESOURCE_LOADER;

var startButton;
var testResource;
var testIcon;
var testEntity;

//Init function
function init(){
	canvasElement = document.getElementById("main-canvas");
	ctx = canvasElement.getContext("2d");
	
	//Add an event listener for button clicks
	canvasElement.addEventListener("click", onCanvasClick);
	
	//Load resources
	RESOURCE_LOADER = new Loader(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	console.log("Resources: ", RESOURCE_LOADER.getAllResources());
	console.log("Buttons: ", RESOURCE_LOADER.getAllButtons());
	console.log("Icons: ", RESOURCE_LOADER.getAllIcons());

	testEntity = new Entity(playerData);
}

//Check for click
//http://miloq.blogspot.com/2011/05/coordinates-mouse-click-canvas.html
function getPosition(event, canvas){
	var x = event.x;
	var y = event.y;
	
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	return [x,y];
}
//---------------------

//This function will draw the screen based on what the value of currentScreen is
function draw(){

	//Title screen
	if(currentScreen == CurrentScreen.TITLE){
		
		//Draw the button and text
		startButton.display(ctx);
		
		//drawText(text, x, y, colorHex, fontSizePx);
		drawText("Welcome to Military Complex", SCREEN_WIDTH/2 - 200, 150, "#FFFFFF", "30px");
	}

	//Main Screen
	if(currentScreen == CurrentScreen.MAIN){

		//Draw test resource
		//testResource.display(ctx);
		
		//Draw test icon
		testIcon.display(ctx);

		//Draw testEntity's resources
		testEntity.drawResources(ctx);
	}
}

//This function will update whatever variables we need based on which screen we are on
function update(){
	
	//Title screen updates
	if(currentScreen == CurrentScreen.TITLE){
			
	}

	//Main screen updates
	if(currentScreen == CurrentScreen.MAIN){
		testEntity.updateResourceQuantities();
	}
}

//Handle canvas click events
function onCanvasClick(e){
	
	//Get the position of click, [0] = x, [1] = y
	var clickPos = getPosition(e, canvasElement);

	//Get click events for the title screen
	if(currentScreen === CurrentScreen.TITLE){
	
		//Start button
		if(startButton.isClicked(clickPos[0], clickPos[1])){
			console.log("Start Button clicked");
			currentScreen = CurrentScreen.MAIN;
		}	
	}
	
	//Get click events for the game screen
	if(currentScreen === CurrentScreen.MAIN){
		//Test icon
		if(testIcon.isClicked(clickPos[0], clickPos[1])){
			console.log("Icon clicked");
			currentScreen = CurrentScreen.TITLE;
		}
	}
}

//This function will act as our main game loop
function runGameLoop(){

	//Clear the screen
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
	//Code goes here
	/*-----------------------------------------------------------*/
	
	draw();
	update();

	/*-----------------------------------------------------------*/
	
	//Re-call this function
	window.requestAnimationFrame(runGameLoop);
}

$(document).ready(function(){
	//Setup function
	init();
	
	//Game loop function
	runGameLoop();
});

//This function lets us draw text all in one line
function drawText(text, x, y, color, font){
	ctx.save();
	ctx.fillStyle = color;
	ctx.font= font + " Arial";
	ctx.fillText(text, x, y);
	ctx.restore();
}

