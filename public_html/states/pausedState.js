// pausedState.js
/*	

	pausedMode is the state that appears when the paused button is pressed. The objects
	in this scene will be drawn over whatever the previous state's scene is/was.
	
	Anything that should be done on the paused screen should be added here and called from
	this.run() if it should be updated every frame.
	
*/

function pausedMode()
{
	state.call(this);
	
	var pausedSprite = new THREE.ImageUtils.loadTexture("Sprites/paused.png");
	var pausedGeometry = new THREE.PlaneGeometry(600, 380);
	var pausedMaterial = new THREE.MeshBasicMaterial( {map: pausedSprite, transparent: true});
	this.pausedMesh = new THREE.Mesh(pausedGeometry,pausedMaterial);
	
	
	var selectionGeometry = new THREE.PlaneGeometry(400, 200);
	
	var resumeFocusSprite = new THREE.ImageUtils.loadTexture("Sprites/resume.png");
	var resumeNoFocusSprite = new THREE.ImageUtils.loadTexture("Sprites/resume-nofocus.png");
	var resumeFocusMaterial = new THREE.MeshBasicMaterial	( {map: resumeFocusSprite, 	transparent: true});
	var resumeNoFocusMaterial = new THREE.MeshBasicMaterial	( {map: resumeNoFocusSprite, transparent: true});
	
	this.resumeMesh = new THREE.Mesh(selectionGeometry,resumeFocusMaterial);
	
	var exitFocusSprite = new THREE.ImageUtils.loadTexture("Sprites/exit.png");
	var exitNoFocusSprite = new THREE.ImageUtils.loadTexture("Sprites/exit-nofocus.png");
	var exitFocusMaterial = new THREE.MeshBasicMaterial	( {map: exitFocusSprite, 	transparent: true});
	var exitNoFocusMaterial = new THREE.MeshBasicMaterial	( {map: exitNoFocusSprite, transparent: true});
	
	this.exitMesh = new THREE.Mesh(selectionGeometry,exitNoFocusMaterial);
	
	
	var choice;
	
	

	this.init = function()
	{
                stopBackgroundMusic();
		this.scene = stateStack[currentState].scene;
		this.camera = stateStack[currentState].camera;
		this.scene.add(this.pausedMesh);
		
		this.scene.add(this.resumeMesh);
		this.scene.add(this.exitMesh);
		this.pausedMesh.position.set(0.00,  100, 5);
		this.resumeMesh.position.set(-100, -25, 5);
		this.exitMesh.position.set(100, -25, 5);
		choice = 0;
	}
	
	this.run = function()
	{
		
		if(keyPressedRight == true)
		{
			choice = (choice + 1) % 2;
			keyPressedRight = false;
			
		}
		else if(keyPressedLeft == true)
		{
			choice = (choice - 1);
			if(choice < 0)
				choice = 1;
			keyPressedLeft = false;
		}
		
		
		switch(choice)
		{
			case 0:
				this.resumeMesh.material = resumeFocusMaterial;
				this.exitMesh.material = exitNoFocusMaterial;
				break;
			case 1:
				this.exitMesh.material = exitFocusMaterial;
				this.resumeMesh.material = resumeNoFocusMaterial;
				break;
		}
		
		
		
		
	}
	
	this.exit = function()
	{
		
		if(keyPressedEnter == true)
		{
			this.scene.remove(this.pausedMesh);
			this.scene.remove(this.resumeMesh);
			this.scene.remove(this.exitMesh);
                        if(choice == 0)
                        {
                            
                    BackgroundMusic();
                        }               
                        else if(choice == 1)
			{
				gameRestart = true;
				hud.reset();
                                startMenuMusic(); 
                                
			}
			escapePressed = false;
			keyPressedEnter = false;
			return true;
		}
	}


}

pausedMode.prototype = new state();
pausedMode.prototype.constructor = pausedMode;