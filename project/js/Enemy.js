//Enemy.js
//Author: Josh Davis

"use strict";

window.Enemy = (function() {
	var setType = "";
	var setAmt = 0;

	function Enemy(){
		
	}
	
	Enemy.prototype.informAI = function(setType, setAmt){
		this.setType = setType;
		this.setAmt = setAmt;
		
		this.move();
	}
	
	Enemy.prototype.move = function(){
		//search through updated player tiles and create countermoves
		
		//soldiers gradually decrease units
		//based on other interaction with enemy soldier units
		
		//meds can "heal" units, granting them additional ticks
		
		//food keeps units from starving
		
		//money can be traded for other resources, whichever is most needed
		
		//if player places troops, place counter troops
		if(setType == "troops"){
			
		}
		else if(setType == "medicine"){
		
		}
		else if(setType == "money"){
		
		}
		else if(setType == "food"){
		
		}
		/*
			if(player.resourceToAdd.name == "troops"){
				if((this.player.troops.quantity - smallQuantity) > 0)
					adjustedAmt = smallQuantity;
				else
					adjustedAmt = this.player.troops.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseTroopsQuantity(adjustedAmt);
			}
			else if(this.resourceToAdd.name == "medicine"){
				if((this.player.medicine.quantity - smallQuantity) > 0)
					adjustedAmt = smallQuantity;
				else
					adjustedAmt = this.player.medicine.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMedicineQuantity(adjustedAmt);
			}
			else if(this.resourceToAdd.name == "money"){
				if((this.player.money.quantity - smallQuantity) > 0)
					adjustedAmt = smallQuantity;
				else
					adjustedAmt = this.player.money.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMoneyQuantity(adjustedAmt);
			}
			else if(this.resourceToAdd.name == "food"){
				if((this.player.food.quantity - smallQuantity) > 0)
					adjustedAmt = smallQuantity;
				else
					adjustedAmt = this.player.food.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseFoodQuantity(adjustedAmt);
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
			}
			else if(this.resourceToAdd.name == "medicine"){
				if((this.player.medicine.quantity - mediumQuantity) > 0)
					adjustedAmt = mediumQuantity;
				else
					adjustedAmt = this.player.medicine.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMedicineQuantity(adjustedAmt);
			}
			else if(this.resourceToAdd.name == "money"){
				if((this.player.money.quantity - mediumQuantity) > 0)
					adjustedAmt = mediumQuantity;
				else
					adjustedAmt = this.player.money.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMoneyQuantity(adjustedAmt);
			}
			else if(this.resourceToAdd.name == "food"){
				if((this.player.food.quantity - mediumQuantity) > 0)
					adjustedAmt = mediumQuantity;
				else
					adjustedAmt = this.player.food.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseFoodQuantity(adjustedAmt);
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
			}
			else if(this.resourceToAdd.name == "medicine"){
				if((this.player.medicine.quantity - largeQuantity) > 0)
					adjustedAmt = largeQuantity;
				else
					adjustedAmt = this.player.medicine.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMedicineQuantity(adjustedAmt);
			}
			else if(this.resourceToAdd.name == "money"){
				if((this.player.money.quantity - largeQuantity) > 0)
					adjustedAmt = largeQuantity;
				else
					adjustedAmt = this.player.money.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseMoneyQuantity(adjustedAmt);
			}
			else if(this.resourceToAdd.name == "food"){
				if((this.player.food.quantity - largeQuantity) > 0)
					adjustedAmt = largeQuantity;
				else
					adjustedAmt = this.player.food.quantity;
				this.resourceToAdd.initQuantity = adjustedAmt;
				this.player.decreaseFoodQuantity(adjustedAmt);
			}*/
	}
			
	return Enemy;
}());