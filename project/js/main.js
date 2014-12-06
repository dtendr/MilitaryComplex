//CONSTANTS
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var CurrentScreen = {
	TITLE: 0,
	INSTRUCTION: 1,
	COUNTRY: 2,
	MAIN: 3,	
	GAMEOVER: 4,
	GAMEWIN: 5
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
var nextButton;
var playButton;
var testResource;
var testIcon;
var testEntityImages;
var testEntityImages2;
//var testEntity;

var germanFlag = new Icon(25, 75, "media/germanFlag.png", SCREEN_WIDTH, SCREEN_HEIGHT);

var testPlayer;
var testEnemy;

var testLevel;

var mousePos;

//Init function
function init(){
	canvasElement = document.getElementById("main-canvas");
	ctx = canvasElement.getContext("2d");
	
	//Add event listeners for button clicks and key presses
	canvasElement.addEventListener("click", onCanvasClick);
	window.addEventListener("keypress", onKeyDown);
	canvasElement.addEventListener("mousemove", function(e) {
	    mousePos = getMousePos(canvasElement, e);
	});

	//Load resources
	RESOURCE_LOADER = new Loader(SCREEN_WIDTH, SCREEN_HEIGHT);

	//Prototype inheritance for enemy
	Player.prototype = new Entity(playerData, testEntityImages);
	testPlayer = new Player();
	
	//Prototype inheritance for enemy
	Enemy.prototype = new Entity(playerData, testEntityImages);
	testEnemy = new Enemy();

	//myLevel = new Level(playerData, numEnemies, enemyObjectArray, mapObject);
	testLevel = new Level(playerData, 1, enemyObjectsArray, {}, SCREEN_WIDTH, SCREEN_HEIGHT);
	//testLevel.addResource("Food", 2000, 25, "media/test2.png", 400, 400);
}

//Check for click
//http://miloq.blogspot.com/2011/05/coordinates-mouse-click-canvas.html
function getPosition(event, canvas){
	var x;
	var y;
	if (event.pageX || event.pageY) { 
	  x = event.pageX;
	  y = event.pageY;
	}
	else { 
	  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
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

	//Instruction screen
	if(currentScreen == CurrentScreen.INSTRUCTION){
		for(var i = 0; i < levelIntro.length; i++){
			drawText(levelIntro[i], 15, (i+5)*25, "#FFFFFF", "16px");
		}
		nextButton.display(ctx);
	}

	//Country screen
	if(currentScreen === CurrentScreen.COUNTRY){
		drawText("Select a country to play as", 25, 50, "#FFFFFF", "20px");
		germanFlag.display(ctx);		
		drawText("Germany", 25, 150, "#FFFFFF", "16px");
		playButton.display(ctx);
	}

	//Main Screen
	if(currentScreen == CurrentScreen.MAIN){
		testLevel.draw(ctx, SCREEN_WIDTH, SCREEN_HEIGHT, mousePos);
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
		if(gamePaused == false){
			if(currentFrame%60 == 0){			
				testLevel.update();
				currentFrame = 0;
			}
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
			currentScreen = CurrentScreen.INSTRUCTION;
		}	
	}
	
	//Get click events for the instructions screen
	if(currentScreen === CurrentScreen.INSTRUCTION){
		if(nextButton.isClicked(clickPos[0], clickPos[1])){
			currentScreen = CurrentScreen.COUNTRY;
		}
	}

	//Get click events for country screen
	if(currentScreen === CurrentScreen.COUNTRY){
		if(germanFlag.isClicked(clickPos[0], clickPos[1])){
			germanFlag.toggleBorder();

			if(germanFlag.getBorderOn() == true){
				testLevel.setPlayerCountry("Germany");	
				testLevel.setPlayerFlagPath("media/germanFlag.png");	
			}else{
				testLevel.setPlayerCountry("");	
				testLevel.setPlayerFlagPath("");
			}
		}

		if(playButton.isClicked(clickPos[0], clickPos[1]) && testLevel.getPlayerCountry() != ""){
			currentScreen = CurrentScreen.MAIN;		
		}
	}

	//Get click events for the game screen
	if(currentScreen === CurrentScreen.MAIN){
		//Resource allocating
		if(testLevel.getResourcePlaceHolderStatus() == false)		
			testLevel.handleIconClicks(clickPos[0], clickPos[1]);
		else{
			testLevel.handleResourcePlaceClick(mousePos);
			gamePaused = false;
		}

		//All four resource icon clicks
		if(testLevel.playerResourceIcons[0].isClicked(clickPos[0], clickPos[1])){
			testLevel.toggleResourceWindow();
			testLevel.loadResourceQuantities(1, "troops", SCREEN_WIDTH, SCREEN_HEIGHT);
			toggleGamePaused();	
		}
		if(testLevel.playerResourceIcons[1].isClicked(clickPos[0], clickPos[1])){
			testLevel.toggleResourceWindow();
			testLevel.loadResourceQuantities(2, "medicine", SCREEN_WIDTH, SCREEN_HEIGHT);
			toggleGamePaused();	
		}
		if(testLevel.playerResourceIcons[2].isClicked(clickPos[0], clickPos[1])){
			testLevel.toggleResourceWindow();
			testLevel.loadResourceQuantities(3, "money", SCREEN_WIDTH, SCREEN_HEIGHT);
			toggleGamePaused();	
		}
		if(testLevel.playerResourceIcons[3].isClicked(clickPos[0], clickPos[1])){
			testLevel.toggleResourceWindow();
			testLevel.loadResourceQuantities(4, "food", SCREEN_WIDTH, SCREEN_HEIGHT);
			toggleGamePaused();	
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

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

