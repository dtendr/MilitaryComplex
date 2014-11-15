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
	}
	
	//Draw the Icon
	Icon.prototype.display = function(ctx){
		ctx.save();
		
		ctx.drawImage(this.image, this.x, this.y);
		
		this.width = this.image.width;
		this.height = this.image.height;
		this.halfW = this.width/2;
		this.halfH = this.height/2;
		
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
	
	return Icon;
}());