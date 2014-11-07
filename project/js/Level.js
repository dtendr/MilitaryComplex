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
		new Icon(5, screenHeight - 40, "media/troopIcon.png").display(ctx);
		new Icon(75, screenHeight - 40, "media/medicineIcon.png").display(ctx);
		new Icon(145, screenHeight - 40, "media/moneyIcon.png").display(ctx);
		new Icon(215, screenHeight - 40, "media/foodIcon.png").display(ctx);
		
		//Draw player resource info
		drawText(this.player.getTroopsQuantity(), 35, screenHeight - 20, "#FFFFFF", "16px");
		drawText(this.player.getMedicineQuantity(), 105, screenHeight - 20, "#FFFFFF", "16px");
		drawText(this.player.getMoneyQuantity(), 175, screenHeight - 20, "#FFFFFF", "16px");
		drawText(this.player.getFoodQuantity(), 245, screenHeight - 20, "#FFFFFF", "16px");
		
		//Draw enemies icons
		var rectWidth = 100;
		var startingRectX = screenWidth - rectWidth;
		var startingRectY = 0;
		for(var i = 0; i < this.numEnemies; i++){
			ctx.fillRect(startingRectX, startingRectY, rectWidth, 200);		
			ctx.strokeRect(startingRectX,  startingRectY, rectWidth, 200);
			
			new Icon(startingRectX + 5, startingRectY + 10, "media/troopIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 40, "media/medicineIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 70, "media/moneyIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 100, "media/foodIcon.png").display(ctx);
			
			drawText(this.enemies[i].getTroopsQuantity(), startingRectX + 35, startingRectY + 30, "#FFFFFF", "16px");
			drawText(this.enemies[i].getMedicineQuantity(), startingRectX + 35, startingRectY + 60, "#FFFFFF", "16px");
			drawText(this.enemies[i].getMoneyQuantity(), startingRectX + 35, startingRectY + 90, "#FFFFFF", "16px");
			drawText(this.enemies[i].getFoodQuantity(), startingRectX + 35, startingRectY + 120, "#FFFFFF", "16px");
			
			startingRectY += 225;
		}
		
	};

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