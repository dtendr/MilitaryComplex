window.Loader = (function() {

	function Loader(screenWidth, screenHeight){
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.resources = [];
		this.buttons = [];
		this.icons = [];
		
		//Set up resource image paths
		//					    Troops             Medicine             Money              Food
		testEntityImages = ["media/test1.png", "media/test1.png", "media/test1.png", "media/test1.png"];
		testEntityImages2 = ["media/test2.png", "media/test2.png", "media/test2.png", "media/test2.png"];

		//Load Resource objects
		//myResource = new Resource("name", initQuantity, amountLostPerTurn, imagePath);
		testResource = new Resource("Food", 100, 5, "media/test2.png");
		testResource.setPos(50, 50);
		testResource.setOnMap(true);		
			
		//Load Button objects
		//myButton = new Button(x, y, "Text inside button");	
		startButton = new Button(SCREEN_WIDTH/2 - 20, SCREEN_HEIGHT/2 - 100, "Start");
		
		//Load Icon objects
		//myIcon = new Icon(x, y, "imagePath");
		testIcon = new Icon(SCREEN_WIDTH/2 - 50, SCREEN_HEIGHT/2 - 200, "media/test2.png");
		
		//Add resources to array
		this.addResource(testResource);
		
		//Add buttons to array
		this.addButton(startButton);
		
		//Add icons to array
		this.addIcon(testIcon);
	}
	
	//Add a resource to the array
	Loader.prototype.addResource = function(resource){
		this.resources.push(resource);
	}
	
	//Add a button to the array
	Loader.prototype.addButton = function(button){
		this.buttons.push(button);
	}

	//Add a icon to the array
	Loader.prototype.addIcon = function(icon){
		this.icons.push(icon);
	}	
	
	//Accessors
	Loader.prototype.getAllResources = function(){ return this.resources; }
	Loader.prototype.getAllButtons = function(){ return this.buttons; }
	Loader.prototype.getAllIcons = function(){ return this.icons; }
	
	return Loader;
}());