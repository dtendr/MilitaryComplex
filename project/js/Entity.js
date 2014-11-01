//Entity.js
//Author: Josh Davis

"use strict";
window.Entity = (function() {

	function Entity(dataObject){
		this.troops = new Resource("Troops", dataObject.troops.initQuantity, dataObject.troops.amountLostPerTurn, "media/test1.png");
		this.medicine = new Resource("Medicine", dataObject.medicine.initQuantity, dataObject.medicine.amountLostPerTurn, "media/test1.png");
		this.money = new Resource("Money", dataObject.money.initQuantity, dataObject.money.amountLostPerTurn, "media/test1.png");
		this.food = new Resource("Food", dataObject.food.initQuantity, dataObject.food.amountLostPerTurn, "media/test1.png");
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
	
	return Entity;
}());