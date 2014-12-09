// GameModeState.js
/*	

	GameMode is the mode where the player is actively fighting enemy ships. This mode is
	ideally after the SplashScreen/Pregame Mode and before the Credits/GameOver mode.

	This is the ideal flow of GameMode:
	-------------------------------------
	1.) GameMode keeps an array of this.levels. Levels keep an array of enemyWaves.
	2.) When all enemies in one enemyWave are dead, the level initializes and loads the next enemyWave.
	3.) When all enemyWaves in that level are complete, the level lets gameMode know so it can initialize and 
	run the next level. Then the process repeats.
	4.) When all this.levels are complete, the player wins.
	(Most of this process is done, except for the level progression and gameover stuff.)
	
	The design of gameMode is so that it will be easier to create new enemyWaves and assign them to this.levels
	as new waves are coded.
	
	GameMode, level, and enemyWaves are defined in separate files.
*/

function gameMode()
{
	state.call(this);
	
	// Variable Declarations
	this.levels = [];
	this.currentLevel = 0;
	var numLevels = 0;
	
	this.pickups = [];
	
	var gameOver = false;
	
	// functions Declarations/Definitions
	
	
	this.init = function()
	{
		// Add this.levels to the game
		
		// to test the game over state, only add 1 level with 1 ships
                this.addLevel(new cohort(1,pawn));
		this.addLevel(new cohort(5, pawn), new cavalry(2,pawn, 4, pawn),  new cohort(10, pawn) );							// basic level
		this.addLevel(new cavalry(2, centurion, 4, pawn), new cohort(5, centurion), new cavalry(4, centurion, 8, pawn) );	// introduce centurion ships
		this.addLevel(new cohort(10, pawn, true), new vFormation(), new diamondFormation() ); 								// introduce shields
		this.addLevel(new shieldShips(), new cohort(15, centurion, true), new shieldShips());								// introduce laser
		this.addLevel(new sonicWave1() );																				// introduce scorpion ship
		// introduce sonic wave
		
		
		scene = this.scene;
		camera = this.camera;
		drawBackground(this.scene);
		scene.add(playerMesh);
		playerMesh.position.set(0,-250,1);
		_Ship.prototype.resetPlayer();
		gameOver = false;
		playerWon = false;
		playerLost = false;
		this.levels[this.currentLevel].initNextEnemyWave();
		hud.addToScene(scene);
	}

	this.run = function()
	{	
		// check if player has health remaining
        if(playerHealth <= 0)
		{
			playerLost = true;
			gameOver = true;
			return;
		}
		// check if all enemies are defeated in the current enemyWave
		var enemiesDefeated = this.levels[this.currentLevel].checkEnemiesDefeated()
		if( enemiesDefeated == false)
		{
			//if not, run the enemy wave
			this.levels[this.currentLevel].runEnemyWave(this);
		}
		else
		{
			// if all enemies are defeated in that wave, check if this is the last enemyWave in the level
			var isLastWave = this.levels[this.currentLevel].checkLastWave();
			if(isLastWave == true)
			{
				// if this is the last wave in the level, cleanup that level...
				this.levels[this.currentLevel].cleanup();
				
				// check if there are any more this.levels to play
				if(this.checkLastLevel() == true)
				{
					//if not, game is over and go to the next state
					playerWon = true;
					gameOver = true;
					return;
				}
				else
				{
					//if there are more this.levels to play, initialize it!
					this.currentLevel++;
					this.levels[this.currentLevel].initNextEnemyWave();
				}
			}
			else
			{
				// if all enemies are defeated but there are more waves in the level, initialize it!
				this.levels[this.currentLevel].initNextEnemyWave();
			}
		}
		
		// update player data
		 playerUpdate(); //Moves player, will add projectile firing call to this function 
		  //if (projPresent || powerup){
                            _Ship.prototype.moveProjectile();
        
                //}
				
		this.updatePickups();		
				
		// check for collision
		this.checkPlayerProjectileCollision();
        _Ship.prototype.checkEnemyCollision(this);
		
		
	}

	this.cleanupState = function()
	{
		// cleanup and reset everything to clear memory used in this state
		this.levels[this.currentLevel].cleanup();
		this.levels.length = 0;
		this.currentLevel = 0;
		this.removeAllPickups();
		numLevels = 0;
		_Ship.prototype.resetPlayerScore();
		scene.remove(particleSystem);
		hud.reset();
	}
	
	this.paused = function()
	{
		if(escapePressed == true)
		{
			escapePressed = false;
			return true;
		}
	
	
	}
	
	this.nextState = function()
	{
		if(playerWon == true || playerLost == true)
		{
			this.cleanupState();
			return true;
		}
	}
	
	this.exit = function()
	{
		// check if something occurred to end the game
		if(gameOver == true)
		{
			this.cleanupState();	
			return true;
		}
	}
	
	this.checkPlayerProjectileCollision = function()
	{
		this.levels[this.currentLevel].checkCollision(this);
	}
	
	
	this.checkLastLevel = function()
	{
		return this.currentLevel + 1 == numLevels;
	}

	

	this.addLevel = function(waveOne, waveTwo, waveThree)
	{
		this.levels[numLevels] = new level(waveOne, waveTwo, waveThree);
		numLevels++;
	}
	
	this.addPickup = function(pickup, position)
	{
		var size = this.pickups.length;
		this.pickups[size] = new pickup(position);
	}
	
	this.updatePickups = function()
	{
		var size = this.pickups.length;
		for(var i = 0; i < size; i++)
		{
			if(this.pickups[i].mesh.position.y <= -350)
			{
				this.removePickup(this.pickups[i], i);
				break;
			}
			this.pickups[i].update();
		}
	}
	
	this.removePickup = function(pickup, i)
	{
		scene.remove(pickup.mesh);
		this.pickups.splice(i, 1);
	}
	
	this.removeAllPickups = function()
	{
		for(var p of this.pickups)
		{
			scene.remove(p.mesh);
		}
		this.pickups = [];
	}
}

gameMode.prototype = new state();
gameMode.prototype.constructor = gameMode;
