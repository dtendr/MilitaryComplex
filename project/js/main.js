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
var currentFrame = 0;
var gamePaused = false;

//Resource loader and resource variable declaration
var RESOURCE_LOADER;

var startButton;
var testResource;
var testIcon;
var testEntityImages;
var testEntityImages2;
//var testEntity;

var testPlayer;
var testEnemy;

var testLevel;

var mapData = {
	"rows" : [
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		
		{"col" : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
		
		{"col" : [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1] },
		
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1] },
		{"col" : [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] },
		{"col" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] },
		{"col" : [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] },
		{"col" : [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] },
		{"col" : [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] }
	]
};

//Init function
function init(){
	canvasElement = document.getElementById("main-canvas");
	ctx = canvasElement.getContext("2d");
	
	//Add event listeners for button clicks and key presses
	canvasElement.addEventListener("click", onCanvasClick);
	window.addEventListener("keypress", onKeyDown);
	
	//Load resources
	RESOURCE_LOADER = new Loader(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	console.log("Resources: ", RESOURCE_LOADER.getAllResources());
	console.log("Buttons: ", RESOURCE_LOADER.getAllButtons());
	console.log("Icons: ", RESOURCE_LOADER.getAllIcons());

	//testEntity = new Entity(playerData, testEntityImages);
	
	//Prototype inheritance for enemy
	Player.prototype = new Entity(playerData, testEntityImages);
	testPlayer = new Player();
	
	//Prototype inheritance for enemy
	Enemy.prototype = new Entity(playerData, testEntityImages);
	testEnemy = new Enemy();

	//myLevel = new Level(playerData, numEnemies, enemyObjectArray, mapObject);
	testLevel = new Level(playerData, 1, enemyObjectsArray, {});
	testLevel.addResource("Food", 2000, 25, "media/test2.png", 400, 400);
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
		// Draw the map tiles
		testLevel.drawMap(ctx);
		
		//Draw test resource
		//testResource.display(ctx);
		
		//Draw test icon
		//testIcon.display(ctx);

		//Draw testEntity's resources
		//testEntity.drawResources(ctx);
		
		//Draw testPlayer's resources
		//testPlayer.drawResources(ctx);
		
		//Draw testEnemy's resources
		//testEnemy.drawResources(ctx);
		testLevel.drawAllResources(ctx);
		
		testLevel.drawUI(ctx, SCREEN_WIDTH, SCREEN_HEIGHT);
	}
}

//This function will update whatever variables we need based on which screen we are on
function update(){
	currentFrame++;

	//Title screen updates
	if(currentScreen == CurrentScreen.TITLE){
			
	}

	//Main screen updates
	if(currentScreen == CurrentScreen.MAIN){
		//testEntity.updateResourceQuantities();
		//testPlayer.updateResourceQuantities();
		//testEnemy.updateResourceQuantities();
		if(gamePaused == false){
			if(currentFrame%60 == 0)
				testLevel.updateAllResources();
		}
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

//Handle canvas key pressed
function onKeyDown(e){
	
	var keyCode = e.keyCode;

	if(currentScreen === CurrentScreen.MAIN){
		if(keyCode == 49){ //1 - troops
			testLevel.toggleResourceWindow();
			testLevel.loadResourceQuantities(1, "troops", SCREEN_WIDTH, SCREEN_HEIGHT);
			toggleGamePaused();		
		}
		else if(keyCode == 50){ //2 - medicine
			testLevel.toggleResourceWindow();
			testLevel.loadResourceQuantities(2, "medicine", SCREEN_WIDTH, SCREEN_HEIGHT);
			toggleGamePaused();
		}
		else if(keyCode == 51){ //3 - money
			testLevel.toggleResourceWindow();
			testLevel.loadResourceQuantities(3, "money", SCREEN_WIDTH, SCREEN_HEIGHT);
			toggleGamePaused();
		}
		else if(keyCode == 52){ //4 - food
			testLevel.toggleResourceWindow();
			testLevel.loadResourceQuantities(4, "food", SCREEN_WIDTH, SCREEN_HEIGHT);
			toggleGamePaused();
		}
	}
}

//Toggle the gamePaused attribute
function toggleGamePaused() { gamePaused = !gamePaused; }

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

