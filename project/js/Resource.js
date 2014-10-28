"use strict";
window.Resource = (function(){
	function Resource(name, initQuantity, amountLostPerTurn, imagePath){
		this.name = name;
		this.initQuantity = initQuantity;
		this.quantity = quantity;
		this.amountLostPerTurn = amountLostPerTurn;
		this.imagePath = imagePath;
		this.x;
		this.y;
		this.onMap = false;
		this.imageObj = new Image();
		this.imageObj.src = imagePath;
	}

	//Accessors
	Resource.prototype.getName = function(){ return this.name; }
	Resource.prototype.getInitQuantity = function(){ return this.initQuantity; }
	Resource.prototype.getQuantity = function(){ return this.quantity; }
	Resource.prototype.getAmountLostPerTurn = function(){ return this.amountLostPerTurn; }
	Resource.prototype.getImagePat = function(){ return this.imagePath; }
	Resource.prototype.getX = function(){ return this.x; }
	Resource.prototype.getY = function(){ return this.y; }
	Resource.prototype.getOnMap = function(){ return this.onMap; }

	//Mutators
	Resource.prototype.setName = function(name){ this.name = name; }	
	Resource.prototype.setImagePath = function(newPath){ this.imagePath = newPath; }
	Resource.prototype.setX = function(newX){ this.x = newX; }
	Resource.prototype.setY = function(newY){ this.y = newY; }
	Resource.prototype.setOnMap = function(status){ this.onMap = status; }

	//Decrease the quantity of the resource by "amount"
	Resource.prototype.decreaseQuantity = function(amount){
		this.quantity -= amount;
		if(this.quantity <= 0)
			this.quantity = 0;
	}

	//Decrease the quantity of the resource by its amount to lose per turn
	Resource.prototype.autoDecreaseQuantity = function(){
		this.quantity -= amountLostPerTurn;
		if(this.quantity <= 0)
			this.quantity = 0;	
	}

	//Increase the quantity of the resource by "amount"
	Resource.prototype.increaseQuantity = function(amount){
		this.quantity += amount;
	}

	//Draw the resource
	Resource.prototype.display = function(ctx){
        ctx.drawImage(this.imageObj.src, this.x, this.y);   	    
	}
});