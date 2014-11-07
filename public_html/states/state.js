/* state.js

	state.js is the interface of all future states.

	When a new state inherits from this state(), it will be given it's own 
	camera variable and scene variable - each state has its own scene space and camera.
	
	The game will call init() to initialize the new scene and will call run() on every 
	frame. 
	

*/

function state()
{
	// Logo stuff
	var logoSprite = new THREE.ImageUtils.loadTexture("Sprites/clonewars.png");
	var logoGeometry = new THREE.PlaneGeometry(600, 380);
	var logoMaterial = new THREE.MeshBasicMaterial( {map: logoSprite, transparent: true});
	this.logoMesh = new THREE.Mesh(logoGeometry,logoMaterial);
	
	

	// camera and scene stuff
	var viewSize = canvas.height;
	aspectRatio = canvas.width/canvas.height;
	this.camera = new THREE.OrthographicCamera( -aspectRatio*viewSize /2, aspectRatio*viewSize/2, viewSize/2, -viewSize/2, -1000, 1000);
	this.camera.position.set(0,0,0);
	
	this.scene = new THREE.Scene();
	this.scene.add(this.camera);
	

	this.init = function()
	{
		console.log("If you are seeing this message in the console, that means " + 
		"you did not override the 'init' function in your child class " + 
		this.constructor.name + ".");
	
	}
	
	this.run = function()
	{
		console.log("If you are seeing this message in the console, that means " +
		"you did not override the 'run' function in your child class " + 
		this.constructor.name + ".");
	
	}
	
	this.nextState = function()
	{
	
	
	}
	
	this.paused = function()
	{
		
	
	
	}
	
	this.exit = function()
	{
		// If there is a common operation that must be performed when the state's exit()
		// function is called, add it here
		console.log("If you are seeing this message in the console, that means " +
		"you did not override the 'exit' function in your child class " + 
		this.constructor.name + ".");
	}


}
