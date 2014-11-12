"use strict";
window.Level = (function() {

	function Level(playerData, numEnemies, enemyObjects, mapData){
		Player.prototype = new Entity(playerData, testEntityImages);
		
		this.player = new Player();
		this.enemies = [];
		this.numEnemies = numEnemies;
		for(var i = 0; i < numEnemies; i++){
			Enemy.prototype = new Entity(enemyObjects[i], testEntityImages2);
			this.enemies[i] = new Enemy();
		}

		this.resources = [];
		this.numResources = 0;
		this.resourceWindowOpen = false;

		//Resource distribution stuff		
		this.selectedResource = "";
		this.smallQuantityIcon = "null";
		this.mediumQuantityIcon = "null";
		this.largeQuantityIcon = "null";
	}

	//Add a resource to the level only
	Level.prototype.addResource = function(name, initQuantity, amountLostPerTurn, imagePath, x, y){
		this.resources[this.numResources] = new Resource(name, initQuantity, amountLostPerTurn, imagePath);
		this.resources[this.numResources].setPos(x, y);
		this.numResources++;
	};
	
	//Draw the map
	Level.prototype.drawMap = function(ctx){

	};
	
	//Draw the ui
	Level.prototype.drawUI = function(ctx, screenWidth, screenHeight){
		ctx.save();
		
		//Draw the player's ui
		ctx.fillStyle = "rgb(0, 148, 10)";
		ctx.strokeStyle = "black";
		ctx.fillRect(0, screenHeight - 50, 300, 50);		
		ctx.strokeRect(0, screenHeight - 50, 300, 50);
		
		//Draw player icons		
		new Icon(5, screenHeight - 45, "media/troopsIcon.png").display(ctx);
		new Icon(75, screenHeight - 45, "media/medicineIcon.png").display(ctx);
		new Icon(145, screenHeight - 45, "media/moneyIcon.png").display(ctx);
		new Icon(215, screenHeight - 45, "media/foodIcon.png").display(ctx);
		
		//Draw player resource info
		drawText(this.player.getTroopsQuantity(), 35, screenHeight - 20, "#FFFFFF", "16px");
		drawText(this.player.getMedicineQuantity(), 105, screenHeight - 20, "#FFFFFF", "16px");
		drawText(this.player.getMoneyQuantity(), 175, screenHeight - 20, "#FFFFFF", "16px");
		drawText(this.player.getFoodQuantity(), 245, screenHeight - 20, "#FFFFFF", "16px");

		//Draw button text
		drawText("1", 12, screenHeight - 4, "#FFFFFF", "16px");
		drawText("2", 82, screenHeight - 4, "#FFFFFF", "16px");
		drawText("3", 152, screenHeight - 4, "#FFFFFF", "16px");
		drawText("4", 222, screenHeight - 4, "#FFFFFF", "16px");
		
		//Draw enemies icons
		var rectWidth = 100;
		var startingRectX = screenWidth - rectWidth;
		var startingRectY = 0;
		for(var i = 0; i < this.numEnemies; i++){
			ctx.fillRect(startingRectX, startingRectY, rectWidth, 200);		
			ctx.strokeRect(startingRectX,  startingRectY, rectWidth, 200);
			
			new Icon(startingRectX + 5, startingRectY + 10, "media/troopsIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 40, "media/medicineIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 70, "media/moneyIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 100, "media/foodIcon.png").display(ctx);
			
			drawText(this.enemies[i].getTroopsQuantity(), startingRectX + 35, startingRectY + 30, "#FFFFFF", "16px");
			drawText(this.enemies[i].getMedicineQuantity(), startingRectX + 35, startingRectY + 60, "#FFFFFF", "16px");
			drawText(this.enemies[i].getMoneyQuantity(), startingRectX + 35, startingRectY + 90, "#FFFFFF", "16px");
			drawText(this.enemies[i].getFoodQuantity(), startingRectX + 35, startingRectY + 120, "#FFFFFF", "16px");
			
			startingRectY += 225;
		}

		ctx.restore();

		this.drawResourceWindow(ctx, screenWidth, screenHeight);		
	};

	//Draw menu to interact with and allocate resources
	Level.prototype.drawResourceWindow = function(ctx, screenWidth, screenHeight){
		if(this.resourceWindowOpen == true){
			ctx.save();
			ctx.fillStyle = "blue";
			ctx.strokeStyle = "black";
			ctx.fillRect((screenWidth - 400)/2, (screenHeight - 400)/2, 400, 400);
			ctx.strokeRect((screenWidth - 400)/2, (screenHeight - 400)/2, 400, 400);			
			ctx.restore();
			this.drawResourceQuantities(ctx, screenWidth, screenHeight);
		}
	};

	//Load resource quantities to be drawn on the resource window
	Level.prototype.loadResourceQuantities = function(numberPressed, resourceName, screenWidth, screenHeight){
		var iconImagePath = "";

		if(resourceName != ""){			
			iconImagePath = "media/" + resourceName + "Icon.png";
			this.smallQuantityIcon = new Icon((screenWidth - 400)/2 + 50, (screenHeight - 400)/2 + 50, iconImagePath, screenWidth, screenHeight);		
			this.mediumQuantityIcon = new Icon((screenWidth - 400)/2 + 187, (screenHeight - 400)/2 + 50, iconImagePath, screenWidth, screenHeight);	
			this.largeQuantityIcon = new Icon((screenWidth - 400)/2 + 325, (screenHeight - 400)/2 + 50, iconImagePath, screenWidth, screenHeight);	
		}
	};

	//Draw resource quantities
	Level.prototype.drawResourceQuantities = function(ctx, screenWidth, screenHeight){
		if(this.smallQuantityIcon != "null"){
			this.smallQuantityIcon.display(ctx);
			this.mediumQuantityIcon.display(ctx);
			this.largeQuantityIcon.display(ctx);
			drawText("5", (screenWidth - 400)/2 + 50, (screenHeight - 400)/2 + 100, "#FFFFFF", "20px");
			drawText("10", (screenWidth - 400)/2 + 187, (screenHeight - 400)/2 + 100, "#FFFFFF", "20px");
			drawText("25", (screenWidth - 400)/2 + 325, (screenHeight - 400)/2 + 100, "#FFFFFF", "20px");
			drawText("Please select a quantity to place", (screenWidth - 400)/2 + 50, (screenHeight - 400)/2 + 150, "#FFFFFF", "20px");
		}
	};

	//Toggle resource window
	Level.prototype.toggleResourceWindow = function(){ this.resourceWindowOpen = !this.resourceWindowOpen; };

	//Draw the player's resources
	Level.prototype.drawPlayerResources = function(ctx){
		this.player.drawResources(ctx);
	};

	//Draw the enemy(ies) resources	
	Level.prototype.drawEnemyResources = function(ctx){
		for(var i = 0; i < this.numEnemies; i++){	
			this.enemies[i].drawResources(ctx);
		}
	};

	//Draw the levels resources
	Level.prototype.drawLevelResources = function(ctx){
		for(var i = 0; i < this.numResources; i++){
			this.resources[i].display(ctx);
		}
	};

	//Draw all resources
	Level.prototype.drawAllResources = function(ctx){
		this.drawLevelResources(ctx);
		this.drawPlayerResources(ctx);
		this.drawEnemyResources(ctx);

	};

	//Update player resources
	Level.prototype.updatePlayerResources = function(){
		this.player.updateResourceQuantities();
	}

	//Update enemy(ies) resources	
	Level.prototype.updateEnemyResources = function(){
		for(var i = 0; i < this.numEnemies; i++){	
			this.enemies[i].updateResourceQuantities();
		}
	};

	//Update the level resources
	Level.prototype.updateLevelResources = function(){
		for(var i = 0; i < this.numResources; i++){
			this.resources[i].autoDecreaseQuantity();
		}
	};

	//Update all resources
	Level.prototype.updateAllResources = function(){
		this.updatePlayerResources();
		this.updateEnemyResources();
		this.updateLevelResources();
	};

	return Level;
}());