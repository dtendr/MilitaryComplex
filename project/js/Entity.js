//Entity.js
//Author: Josh Davis

"use strict";
window.Entity = (function() {

	function Entity(dataObject, imagePathArray){
		this.troops = new Resource("Troops", dataObject.troops.initQuantity, dataObject.troops.amountLostPerTurn, imagePathArray[0]);
		this.medicine = new Resource("Medicine", dataObject.medicine.initQuantity, dataObject.medicine.amountLostPerTurn, imagePathArray[1]);
		this.money = new Resource("Money", dataObject.money.initQuantity, dataObject.money.amountLostPerTurn, imagePathArray[2]);
		this.food = new Resource("Food", dataObject.food.initQuantity, dataObject.food.amountLostPerTurn, imagePathArray[3]);
		this.troops.setPos(50, 50);
		this.medicine.setPos(60, 60);
		this.money.setPos(70, 70);
		this.food.setPos(80, 80);
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

	//Functions to move the resources
	Entity.prototype.moveTroopsTo = function(x, y){ this.troops.setPos(x, y); }
	Entity.prototype.moveMedicineTo = function(x, y){ this.medicine.setPos(x, y); }
	Entity.prototype.moveMoneyTo = function(x, y){ this.money.setPos(x, y); }
	Entity.prototype.moveFoodTo = function(x, y){ this.food.setPos(x, y); }

	return Entity;
}());