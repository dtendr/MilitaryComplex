//Button.js
//Author: Chris Simmons

"use strict";
window.Button = (function() {

	function Button(x, y, text){
		this.x = x;
		this.y = y;
		this.width = 100;
		this.height = 40;
		this.halfW = 50;
		this.halfH = 20;
		this.strokeColor = "red";
		this.fillColor = "black";
		this.text = text;
	}
	
	//Draw the button
	Button.prototype.display = function(ctx){
		ctx.save();
		ctx.fillStyle = this.fillColor;
		ctx.strokeStyle = this.strokeColor;
		ctx.fillRect(this.x - this.halfW, this.y - this.halfH, this.width, this.height);
		ctx.strokeRect(this.x - this.halfW, this.y - this.halfH, this.width, this.height);
		
		ctx.fillStyle = this.strokeColor;
		ctx.font = "bold 16px Arial, sans-serif";
		var textSize = ctx.measureText(this.text);
		var xPos = this.xPos + this.halfW - textSize/2;
		var yPos = this.yPos + this.halfH;
		ctx.fillText(this.text, this.x - (textSize.width/2), this.y + this.halfH/4);
		
		ctx.restore();
	}
	
	//Test for click
	Button.prototype.isClicked = function(x, y){
		if(x > this.x - this.halfW && x < this.x + this.halfW && y > this.y - this.halfH && y < this.y + this.halfH){
			return true;
		}
		else{
			return false;
		}
	}
	
	return Button;
}());