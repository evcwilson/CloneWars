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
	this.init = function()
	{
		scene = this.scene;
		camera = this.camera;
	}
	
	this.run = function()
	{
		
		
	}
	
	this.exit = function()
	{
		if(escapePressed == true)
		{
			escapePressed = false;
			exitGame = true;
		}
	}
	
	this.nextState = function()
	{
		if(keyPressedEnter == true)
		{
			keyPressedEnter = false;
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