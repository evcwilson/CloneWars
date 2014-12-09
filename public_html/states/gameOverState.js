

function gameOverMode()
{
	state.call(this);
	
	var youWinText = "YOU WIN!";
	var youWinTextGeometry = new THREE.TextGeometry( youWinText, { size: 20, height: 0, font: 'press start k' });
	var youWinTextMaterial = new THREE.MeshBasicMaterial({color: 0x46BF40});
	var youWinTextMesh = new THREE.Mesh( youWinTextGeometry ,youWinTextMaterial);
	
	var youLoseText = "YOU LOSE!";
	var youLoseTextGeometry = new THREE.TextGeometry( youLoseText, { size: 20, height: 0, font: 'press start k' });
	var youLoseTextMaterial = new THREE.MeshBasicMaterial({color: 0x46BF40});
	var youLoseTextMesh = new THREE.Mesh( youLoseTextGeometry ,youLoseTextMaterial);
	
	
	var gameOverText = "GAME OVER";
	var gameOverTextGeometry = new THREE.TextGeometry( gameOverText, { size: 20, height: 25, font: 'press start k' });
	var gameOverTextMaterial = new THREE.MeshBasicMaterial({color: 0x46BF40});
	var gameOverTextMesh = new THREE.Mesh( gameOverTextGeometry ,gameOverTextMaterial);
	
	var timer = 0;
	
	var statusMesh;	
	var isStaticMeshVisible;

	this.init = function()
	{
		scene = this.scene;
		camera = this.camera;
		drawBackground(this.scene);
		
		if(playerWon == true)
		{       
                        stopBackgroundMusic();
                        VictoryMusic();
			statusMesh = youWinTextMesh;
			//VictoryMusic();
		}
		else if(playerLost == true)
		{
                        stopBackgroundMusic();
                        GameOverMusic();
			statusMesh = youLoseTextMesh;
			//GameOverMusic();
		}
		scene.add(statusMesh);
		statusMesh.geometry.computeBoundingBox();
		var centerOffset = -0.5 * ( statusMesh.geometry.boundingBox.min.x - statusMesh.geometry.boundingBox.max.x );
		
		statusMesh.position.set(-centerOffset, 0, 1);
		
		isStaticMeshVisible = true;
	}
	
	this.run = function()
	{
		timer += deltaTime;
		
		if(timer >= 3 && isStaticMeshVisible == true)
		{
			isStaticMeshVisible = false;
			scene.remove(statusMesh)
			scene.add(gameOverTextMesh);
			
			gameOverTextMesh.geometry.computeBoundingBox();
			var centerOffset = -0.5 * ( gameOverTextMesh.geometry.boundingBox.min.x - gameOverTextMesh.geometry.boundingBox.max.x );
		
			gameOverTextMesh.position.set(-centerOffset, 0, 1);
		}
		
	
	}
	
	this.exit = function()
	{
		if(timer >= 30)
		{
			timer = 0;
			gameRestart = true;
			scene.remove(particleSystem);
			scene.remove(gameOverTextMesh);
			// stop music here
                        if (GOMusicPlaying){
                        stopGameOverMusic();
                        }else
                        {
                            stopVictoryMusic();
                        }
                        startMenuMusic();
			return true;
		}
	}

	this.cleanupState = function()
	{
	
	}

}


gameOverMode.prototype = new state();
gameOverMode.prototype.constructor = gameOverMode;