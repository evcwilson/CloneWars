// startState.js
/*	

	startState is the state where the logo usually appears, right before the game begins.
	Anything that should be done on the start screen should be added here and called from
	this.run() if it should be updated every frame
	
*/

function startMode()
{
	state.call(this);
	
	this.scene.add(this.logoMesh);
	drawBackground(this.scene);
	var startText = "Press ENTER to Play";
	var startTextGeometry = new THREE.TextGeometry( startText, { size: 12, height: 25, font: 'press start k' });
	var startTextMaterial = new THREE.MeshBasicMaterial({color: 0x46BF40});
	var startTextMesh = new THREE.Mesh( startTextGeometry ,startTextMaterial);
	
	this.init = function()
	{
		scene = this.scene;
		camera = this.camera;
		scene.add(startTextMesh);
		startTextMesh.position.set(-150, -200, 1);
	}
	
	this.run = function()
	{
		
		
	}
	
	this.exit = function()
	{
		// Commenting out this section - no need to make game exit on start state. Tim Matthews 11/25
		/*if(escapePressed == true)
		{
			escapePressed = false;
			exitGame = true;
		}*/
	}
	
	this.nextState = function()
	{
		if(keyPressedEnter == true)
		{
			keyPressedEnter = false;
                        stopMenuMusic();
                        BackgroundMusic();
			//scene.remove(particleSystem);
			//hud.removeFromScene();
			return true;
		}
		if(keyPressedLeft == true)
		{
			
		}
	
	}


}

startMode.prototype = new state();
startMode.prototype.constructor = startMode;