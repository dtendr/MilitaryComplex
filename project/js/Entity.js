//Entity.js
//Author: Josh Davis

"use strict";
window.Entity = (function() {

	var setType = "";
	var setAmt = 0;

	function Entity(dataObject, imagePathArray){
		this.troops = new Resource("Troops", dataObject.troops.initQuantity, dataObject.troops.amountLostPerTurn, imagePathArray[0]);
		this.medicine = new Resource("Medicine", dataObject.medicine.initQuantity, dataObject.medicine.amountLostPerTurn, imagePathArray[1]);
		this.money = new Resource("Money", dataObject.money.initQuantity, dataObject.money.amountLostPerTurn, imagePathArray[2]);
		this.food = new Resource("Food", dataObject.food.initQuantity, dataObject.food.amountLostPerTurn, imagePathArray[3]);
		this.troops.setPos(dataObject.troops.x, dataObject.troops.y);
		this.medicine.setPos(dataObject.medicine.x, dataObject.medicine.y);
		this.money.setPos(dataObject.money.x, dataObject.money.y);
		this.food.setPos(dataObject.food.x, dataObject.food.y);
	}

	Entity.prototype.drawResources = function(ctx){
		this.troops.display(ctx);
		this.medicine.display(ctx);
		this.money.display(ctx);
		this.food.display(ctx);
	}

	Entity.prototype.updateResourceQuantities = function(){
		this.troops.autoDecreaseQuantity();
		this.medicine.autoDecreaseQuantity();
		this.money.autoDecreaseQuantity();
		this.food.autoDecreaseQuantity();
	}
	
	Entity.prototype.informAI = function(setType, setAmt){
		this.setType = setType;
		this.setAmt = setAmt;
	}
	
	//Getters
	Entity.prototype.getTroopsQuantity = function(){ return this.troops.quantity; };
	Entity.prototype.getMedicineQuantity = function(){ return this.medicine.quantity; };
	Entity.prototype.getMoneyQuantity = function(){ return this.money.quantity; };
	Entity.prototype.getFoodQuantity = function(){ return this.food.quantity; };

	//Setters
	Entity.prototype.decreaseTroopsQuantity = function(amount){ this.troops.quantity -= amount; };
	Entity.prototype.decreaseMedicineQuantity = function(amount){ this.medicine.quantity -= amount; };
	Entity.prototype.decreaseMoneyQuantity = function(amount){ this.money.quantity -= amount; };
	Entity.prototype.decreaseFoodQuantity = function(amount){ this.food.quantity -= amount; };

	
	//Functions to move the resources
	Entity.prototype.moveTroopsTo = function(x, y){ this.troops.setPos(x, y); }
	Entity.prototype.moveMedicineTo = function(x, y){ this.medicine.setPos(x, y); }
	Entity.prototype.moveMoneyTo = function(x, y){ this.money.setPos(x, y); }
	Entity.prototype.moveFoodTo = function(x, y){ this.food.setPos(x, y); }

	return Entity;
}());