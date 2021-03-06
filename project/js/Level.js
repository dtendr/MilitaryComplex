"use strict";
window.Level = (function() {

	function Level(playerData, numEnemies, enemyObjects, mapData, screenWidth, screenHeight){
		this.player = new Entity(playerData, testEntityImages);
		this.playerCountry = "";
		this.playerFlagPath = "";
		this.playerResourceIcons = [];
		this.playerResourceIcons[0] = new Icon(5, 5, "media/troopsIcon.png");
		this.playerResourceIcons[1] = new Icon(5, 55, "media/medicineIcon.png");
		this.playerResourceIcons[2] = new Icon(5, 105, "media/moneyIcon.png");
		this.playerResourceIcons[3] = new Icon(5, 155, "media/foodIcon.png");	
		this.playerTroopsIcon;
		this.enemies = [];
		this.numEnemies = numEnemies;
		for(var i = 0; i < numEnemies; i++){
			this.enemies[i] = new Entity(enemyObjects[i], testEntityImages2);
		}

		this.resources = [];
		this.numResources = 0;
		this.resourceWindowOpen = false;

		//Resource distribution stuff		
		this.selectedResource = "";
		this.smallQuantityIcon = "null";
		this.mediumQuantityIcon = "null";
		this.largeQuantityIcon = "null";
		this.clickedIcon = "null";
		this.resourcePlaceHolderActive = false;
		this.resourceToAdd = {
			name: "",
			initQuantity: "",
			amountLostPerTurn: 5,
			imagePath: "",
			x: "",
			y: ""
		};
	}

	//Get/set player country and flag path
	Level.prototype.getPlayerCountry = function(){ return this.playerCountry; };
	Level.prototype.setPlayerCountry = function(country){ this.playerCountry = country; };
	Level.prototype.getPlayerFlagPath = function(){ return this.playerFlagPath; }; 
	Level.prototype.setPlayerFlagPath = function(path){ this.playerFlagPath = path; };

	//Main update function
	Level.prototype.update = function(){
		this.removeEmptyResources();
		this.updateLevelResources();
	};

	//Main draw function 
	Level.prototype.draw = function(ctx, screenWidth, screenHeight, mousePos){			
		this.drawMap(ctx);
		this.drawLevelResources(ctx);		
		this.drawUI(ctx, screenWidth, screenHeight);
		this.drawResourcePlaceholder(ctx, mousePos);
	};

	//Add a resource to the level only
	Level.prototype.addResource = function(name, initQuantity, amountLostPerTurn, imagePath, x, y){
		this.resources[this.numResources] = new Resource(name, initQuantity, amountLostPerTurn, imagePath);
		this.resources[this.numResources].setPos(x, y);
		this.numResources++;
	};

	//Remove all empty resources
	Level.prototype.removeEmptyResources = function(){
		for(var i = 0; i < this.resources.length; i++){
			if(this.resources[i] != null && this.resources[i].getQuantity() <= 0){
				this.resources[i] = null;
			}
		}
	};
	
	//Draw the map
	Level.prototype.drawMap = function(ctx){
		var tileX, tileY;
		// Map object
		var data = mapData.rows;

		for(var r = 0; r < data.length; r++){
			for( var c = 0; c < data[r].col.length; c++){
				var col = data[r].col[c];
				// Position of the next tile
				tileY = r * mapData.tileSize + mapData.y;
				tileX = c * mapData.tileSize + mapData.x;
				// New image for the terrains
				var terrain = new Image();
				
				switch(col){
					case 0: // grass
						terrain.src = "media/terrain0.png";
						break;
					case 1: // road
						terrain.src = "media/terrain1.png";
						break;
					case 2: // rocks
						terrain.src = "media/terrain2.png";
						break;
					case 3: // dirt
						terrain.src = "media/terrain3.png";
						break;
				}
				ctx.drawImage(terrain, tileX, tileY, mapData.tileSize, mapData.tileSize);
				//ctx.strokeStyle = "#B0B0B0";
				//ctx.strokeRect(tileX, tileY, mapData.tileSize, mapData.tileSize);
			}
		}
	};
	
	//Draw the ui
	Level.prototype.drawUI = function(ctx, screenWidth, screenHeight){
		ctx.save();
		
		//Draw the player's ui
		ctx.fillStyle = "rgb(0, 148, 10)";
		ctx.strokeStyle = "black";
		ctx.fillRect(0, 0, 80, 250);		
		ctx.strokeRect(0, 0, 80, 250);
		
		//Draw player icons			
		for(var i = 0; i < this.playerResourceIcons.length; i++)
			this.playerResourceIcons[i].display(ctx);
		
		//Draw player resource info
		drawText(this.player.getTroopsQuantity(), 35, 25, "#FFFFFF", "16px");
		drawText(this.player.getMedicineQuantity(), 35, 75, "#FFFFFF", "16px");
		drawText(this.player.getMoneyQuantity(), 35, 125, "#FFFFFF", "16px");
		drawText(this.player.getFoodQuantity(), 35, 175, "#FFFFFF", "16px");

		//Draw button text
		drawText("1", 10, 45, "#000000", "17px");
		drawText("2", 10, 95, "#000000", "17px");
		drawText("3", 10, 145, "#000000", "17px");
		drawText("4", 10, 195, "#000000", "17px");

		//Draw flag
		var playerFlag = new Image();
		playerFlag.src = this.playerFlagPath;
		ctx.drawImage(playerFlag, 5, 200);
		
		//Draw enemies icons
		var rectWidth = 80;
		var startingRectX = screenWidth - rectWidth;
		var startingRectY = 0;
		for(var i = 0; i < this.numEnemies; i++){
			ctx.fillRect(startingRectX, startingRectY, rectWidth, 200);		
			ctx.strokeRect(startingRectX, startingRectY, rectWidth, 200);
			
			new Icon(startingRectX + 5, startingRectY + 10, "media/troopsIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 40, "media/medicineIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 70, "media/moneyIcon.png").display(ctx);
			new Icon(startingRectX + 5, startingRectY + 100, "media/foodIcon.png").display(ctx);
			
			drawText(this.enemies[i].getTroopsQuantity(), startingRectX + 35, startingRectY + 30, "#FFFFFF", "16px");
			drawText(this.enemies[i].getMedicineQuantity(), startingRectX + 35, startingRectY + 60, "#FFFFFF", "16px");
			drawText(this.enemies[i].getMoneyQuantity(), startingRectX + 35, startingRectY + 90, "#FFFFFF", "16px");
			drawText(this.enemies[i].getFoodQuantity(), startingRectX + 35, startingRectY + 120, "#FFFFFF", "16px");
			
			var flag = new Image();
			flag.src = "media/russianFlag.png";
			ctx.drawImage(flag, screenWidth - 75, 150);

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

			this.resourceToAdd.name = resourceName;
			this.resourceToAdd.imagePath = iconImagePath;	
		}
	};

	//Draw resource quantities
	Level.prototype.drawResourceQuantities = function(ctx, screenWidth, screenHeight){
		if(this.smallQuantityIcon != "null"){
			this.smallQuantityIcon.display(ctx);
			this.mediumQuantityIcon.display(ctx);
			this.largeQuantityIcon.display(ctx);
			drawText("50", (screenWidth - 400)/2 + 50, (screenHeight - 400)/2 + 100, "#FFFFFF", "20px");
			drawText("100", (screenWidth - 400)/2 + 187, (screenHeight - 400)/2 + 100, "#FFFFFF", "20px");
			drawText("250", (screenWidth - 400)/2 + 325, (screenHeight - 400)/2 + 100, "#FFFFFF", "20px");
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
			if(this.resources[i] != null)
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
			if(this.resources[i] != null)
				this.resources[i].autoDecreaseQuantity();
		}
	};

	//Update all resources
	Level.prototype.updateAllResources = function(){
		this.updatePlayerResources();
		this.updateEnemyResources();
		this.updateLevelResources();
	};

	//Handle clicking on the resource window
	Level.prototype.handleIconClicks = function(clickX, clickY){
		if(this.resourceWindowOpen){
			if(this.smallQuantityIcon.isClicked(clickX, clickY)){	
				this.resourcePlaceHolderActive = true;
				this.clickedIcon = this.smallQuantityIcon;
				this.resourceWindowOpen = false;
				this.checkResourceExpenses("small");
			}
			else if(this.mediumQuantityIcon.isClicked(clickX, clickY)){	
				this.resourcePlaceHolderActive = true;
				this.clickedIcon = this.mediumQuantityIcon;
				this.resourceWindowOpen = false;	
				this.checkResourceExpenses("medium");
			}
			else if(this.largeQuantityIcon.isClicked(clickX, clickY)){			
				this.resourcePlaceHolderActive = true;
				this.clickedIcon = this.largeQuantityIcon;
				this.resourceWindowOpen = false;
				this.checkResourceExpenses("large");
			}
		}
	};
	
	//check resource expenses to account for spending past the '0' mark
	//combines subtraction of player resources, for efficiency's sake
	Level.prototype.checkResourceExpenses = function(type){
		var adjustedAmt = 0;
		var smallQuantity = 50, mediumQuantity = 100, largeQuantity = 250;

		if(type == "small"){
			if(this.resourceToAdd.name == "troops"){
				if((this.player.troops.quantity - smallQuantity) > 0)
					adjustedAmt = smallQuantity;
				else
					adjustedAmt = this.player.troops.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseTroopsQuantity(adjustedAmt);
				
				this.enemies.informAI("troops", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "medicine"){
				if((this.player.medicine.quantity - smallQuantity) > 0)
					adjustedAmt = smallQuantity;
				else
					adjustedAmt = this.player.medicine.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMedicineQuantity(adjustedAmt);
				
				this.enemies.informAI("medicine", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "money"){
				if((this.player.money.quantity - smallQuantity) > 0)
					adjustedAmt = smallQuantity;
				else
					adjustedAmt = this.player.money.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMoneyQuantity(adjustedAmt);
				
				this.enemies.informAI("money", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "food"){
				if((this.player.food.quantity - smallQuantity) > 0)
					adjustedAmt = smallQuantity;
				else
					adjustedAmt = this.player.food.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseFoodQuantity(adjustedAmt);
				
				this.enemies.informAI("food", adjustedAmt);
			}
		}
		else if(type == "medium"){
			if(this.resourceToAdd.name == "troops"){
				if((this.player.troops.quantity - mediumQuantity) > 0)
					adjustedAmt = mediumQuantity;
				else
					adjustedAmt = this.player.troops.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseTroopsQuantity(adjustedAmt);
				
				
				this.enemies[0].informAI("troops", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "medicine"){
				if((this.player.medicine.quantity - mediumQuantity) > 0)
					adjustedAmt = mediumQuantity;
				else
					adjustedAmt = this.player.medicine.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMedicineQuantity(adjustedAmt);
				
				this.enemies[0].informAI("medicine", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "money"){
				if((this.player.money.quantity - mediumQuantity) > 0)
					adjustedAmt = mediumQuantity;
				else
					adjustedAmt = this.player.money.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMoneyQuantity(adjustedAmt);
				
				this.enemies[0].informAI("money", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "food"){
				if((this.player.food.quantity - mediumQuantity) > 0)
					adjustedAmt = mediumQuantity;
				else
					adjustedAmt = this.player.food.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseFoodQuantity(adjustedAmt);
				
				this.enemies[0].informAI("food", adjustedAmt);
			}
		}
		else if(type == "large"){
			if(this.resourceToAdd.name == "troops"){
				if((this.player.troops.quantity - largeQuantity) > 0)
					adjustedAmt = largeQuantity;
				else
					adjustedAmt = this.player.troops.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseTroopsQuantity(adjustedAmt);
				
				this.enemyies[0].informAI("troops", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "medicine"){
				if((this.player.medicine.quantity - largeQuantity) > 0)
					adjustedAmt = largeQuantity;
				else
					adjustedAmt = this.player.medicine.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMedicineQuantity(adjustedAmt);
				
				this.enemies[0].informAI("medicine", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "money"){
				if((this.player.money.quantity - largeQuantity) > 0)
					adjustedAmt = largeQuantity;
				else
					adjustedAmt = this.player.money.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMoneyQuantity(adjustedAmt);
				
				this.enemies[0].informAI("money", adjustedAmt);
			}
			else if(this.resourceToAdd.name == "food"){
				if((this.player.food.quantity - largeQuantity) > 0)
					adjustedAmt = largeQuantity;
				else
					adjustedAmt = this.player.food.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseFoodQuantity(adjustedAmt);
				
				this.enemies[0].informAI("food", adjustedAmt);
			}
		}
	}

	//Draw resource placeholder
	Level.prototype.drawResourcePlaceholder = function(ctx, mousePos){
		if(this.resourcePlaceHolderActive){
			var img = new Image();
			img.src = this.clickedIcon.getImagePath();
			ctx.drawImage(img, mousePos.x, mousePos.y);
		}
	}

	//Handle resource being placed on map
	Level.prototype.handleResourcePlaceClick = function(mousePos){
		if(this.resourcePlaceHolderActive){
			// Map boundary for placing the resources 
			if( mousePos.x < mapData.x ){
				mousePos.x = mapData.x;
			}else if( mousePos.x > ((mapData.width() + mapData.x) - mapData.tileSize) ){
				mousePos.x = (mapData.width()+ mapData.x) - mapData.tileSize;
			}
			if( mousePos.y < mapData.y ){
				mousePos.y = mapData.y;
			}else if( mousePos.y > ((mapData.height() + mapData.y)- mapData.tileSize) ){
				mousePos.y = (mapData.height() + mapData.y) - mapData.tileSize;
			}
	
			// Find the tile's index from the mapData array
			var colIndex = Math.floor((mousePos.x - mapData.x) / mapData.tileSize);
			var rowIndex = Math.floor((mousePos.y - mapData.y) / mapData.tileSize);

			//snap to tile	
			mousePos.x = mapData.x + (colIndex*mapData.tileSize);
			mousePos.y = mapData.y + (rowIndex*mapData.tileSize);
			
			this.resourceToAdd.x = mousePos.x;
			this.resourceToAdd.y = mousePos.y;

			var type = mapData.rows[rowIndex].col[colIndex];
			console.log("tile: " + type);
			// Based on the tile type change the lost amount 
			var lost;
			switch(type){
				case 0: // snow
					lost = 20;
					break;
				case 2: // rocks
					lost = 15;
					break;
				case 3: // dirt
					lost = 10;
					break;
				default:
					lost = 5;
			}
			this.resourceToAdd.amountLostPerTurn = lost;

			console.log(this.resourceToAdd);
			this.addResource(this.resourceToAdd.name, this.resourceToAdd.initQuantity, this.resourceToAdd.amountLostPerTurn, 
				this.resourceToAdd.imagePath, this.resourceToAdd.x, this.resourceToAdd.y);			

			this.resourcePlaceHolderActive = false;
			
			this.handleEnemyResources();
		};
	};
	
	Level.prototype.handleEnemyResources = function(){
		if(this.enemies[0].setType != ""){
			this.addResource(this.enemies[0].setType, this.resourceToAdd.initQuantity, this.resourceToAdd.amountLostPerTurn, 
					this.resourceToAdd.imagePath, this.resourceToAdd.x, this.resourceToAdd.y);
		}
				
	};

	//Return resource placeholder
	Level.prototype.getResourcePlaceHolderStatus = function(){ return this.resourcePlaceHolderActive; };

	return Level;
}());