"use strict";
window.Icon = (function() {

	function Icon(x, y, imgPath, screenWidth, screenHeight){
		this.x = x;
		this.y = y;
		this.image = new Image();
		this.image.src = imgPath;
		this.width = this.image.width;
		this.height = this.image.height;
		this.halfW = this.width/2;
		this.halfH = this.height/2;
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.borderOn = false;
	}
	
	//Draw the Icon
	Icon.prototype.display = function(ctx){
		ctx.save();
		
		ctx.drawImage(this.image, this.x, this.y);
		
		this.width = this.image.width;
		this.height = this.image.height;
		this.halfW = this.width/2;
		this.halfH = this.height/2;

		if(this.borderOn == true){
			ctx.strokeStyle = "white";
			ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
		}
		
		ctx.restore();
	}
	
	//Test for click
	Icon.prototype.isClicked = function(x, y){
		if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height){
			return true;
		}
		else{
			return false;
		}
	}

	//Return image path
	Icon.prototype.getImagePath = function(){ 
		return this.image.src;
	};

	//Turn on border
	Icon.prototype.turnOnBorder = function(){ this.borderOn = true; };
	
	//Turn off border
	Icon.prototype.turnOffBorder = function(){ this.borderOn = false; };

	//Toggle border
	Icon.prototype.toggleBorder = function(){ this.borderOn = !this.borderOn; };

	//Get border
	Icon.prototype.getBorderOn = function(){ return this.borderOn; };

	return Icon;
}());