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