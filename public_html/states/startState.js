// startState.js
/*	

	startState is the state where the logo usually appears, right before the game begins.
	Anything that should be done on the start screen should be added here and called from
	this.run() if it should be updated every frame
	
*/

function startMode()
{
	// Logo stuff
	var logoSprite = new THREE.ImageUtils.loadTexture("Sprites/clonewars.png");
	var logoGeometry = new THREE.PlaneGeometry(600, 380);
	var logoMaterial = new THREE.MeshBasicMaterial( {map: logoSprite, transparent: true});
	var logoMesh = new THREE.Mesh(logoGeometry,logoMaterial);

	// camera and scene stuff
	var viewSize = canvas.height;
	aspectRatio = canvas.width/canvas.height;
	this.camera = new THREE.OrthographicCamera( -aspectRatio*viewSize /2, aspectRatio*viewSize/2, viewSize/2, -viewSize/2, -1000, 1000);
	this.camera.position.set(0,0,0);
	
	this.scene = new THREE.Scene();
	this.scene.add(this.camera);
	this.scene.add(logoMesh);
	
	
	
	this.init = function()
	{
		console.log("StartMode Init");
		scene = this.scene;
		camera = this.camera;
		drawBackground();
	}
	
	this.run = function()
	{
		
		
		
	}
	
	this.exit = function()
	{
		if(keyPressedEnter == true)
		{
			keyPressedEnter = false;
			scene.remove(particleSystem);
			return true;
		}
		if(escapePressed == true)
		{
			escapePressed = false;
			exitGame = true;
		}
	}



}