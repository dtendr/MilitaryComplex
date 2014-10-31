window.Loader = (function() {

	function Loader(screenWidth, screenHeight){
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.resources = [];
		this.buttons = [];
		this.icons = [];
		
		//Load Resource objects
		testResource = new Resource("Food", 100, 5, "media/test1.png");
		testResource.setPos(50, 50);
		testResource.setOnMap(true);		
			
		//Setup all the buttons
		//myButton = new Button(x, y, "Text inside button");	
		startButton = new Button(SCREEN_WIDTH/2 - 20, SCREEN_HEIGHT/2 - 100, "Start");
		
		//Init icons
		//myIcon = new Icon(x, y, "imagePath");
		testIcon = new Icon(SCREEN_WIDTH/2 - 50, SCREEN_HEIGHT/2 - 200, "media/test2.png");
		
		//Array of all resources
		this.addResource(testResource);
		
		//Array of all buttons
		this.addButton(startButton);
		
		//Array of all icons
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