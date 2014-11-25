// GameModeState.js
/*	

	GameMode is the mode where the player is actively fighting enemy ships. This mode is
	ideally after the SplashScreen/Pregame Mode and before the Credits/GameOver mode.

	This is the ideal flow of GameMode:
	-------------------------------------
	1.) GameMode keeps an array of levels. Levels keep an array of enemyWaves.
	2.) When all enemies in one enemyWave are dead, the level initializes and loads the next enemyWave.
	3.) When all enemyWaves in that level are complete, the level lets gameMode know so it can initialize and 
	run the next level. Then the process repeats.
	4.) When all levels are complete, the player wins.
	(Most of this process is done, except for the level progression and gameover stuff.)
	
	The design of gameMode is so that it will be easier to create new enemyWaves and assign them to levels
	as new waves are coded.
	
	GameMode, level, and enemyWaves are defined in separate files.
*/

function gameMode()
{
	state.call(this);
	
	// Variable Declarations
	var levels = [];
	var currentLevel = 0;
	var numLevels = 0;
	
	
	this.gameOver = false;
	
	// functions Declarations/Definitions
	
	
	this.init = function()
	{
		// Add levels to the game
		addLevel(new cohort(5), 		new cavalry(2,6), 		new chargingCohort(8));
		addLevel(new cohort(10), 		new cavalry(2,8), 		new chargingCohort(16));
		addLevel(new cavalry(4, 10), 	new cohort(15), 		new vFormation());
		addLevel(new cavalry(6, 16), 	new diamondFormation(), new cohort(20) );
		addLevel(new cavalry(8, 25), 	new cohort(25), 		new chargingCohort(40) );
		
		
		scene = this.scene;
		camera = this.camera;
		drawBackground(this.scene);
		scene.add(playerMesh);
		playerMesh.position.set(0,-250,0);
		
		levels[currentLevel].initNextEnemyWave();
		hud.addToScene(scene);
	}

	this.run = function()
	{	
                
		// check if all enemies are defeated in the current enemyWave
		var enemiesDefeated = levels[currentLevel].checkEnemiesDefeated()
		if( enemiesDefeated == false)
		{
			//if not, run the enemy wave
			levels[currentLevel].runEnemyWave();
		}
		else
		{
			// if all enemies are defeated in that wave, check if this is the last enemyWave in the level
			var isLastWave = levels[currentLevel].checkLastWave();
			if(isLastWave == true)
			{
				// if this is the last wave in the level, cleanup that level...
				levels[currentLevel].cleanup();
				
				// check if there are any more levels to play
				if(checkLastLevel() == true)
				{
					//if not, game is over and go to the next state
					this.gameOver = true;
					return;
				}
				else
				{
					//if there are more levels to play, initialize it!
					currentLevel++;
					levels[currentLevel].initNextEnemyWave();
				}
			}
			else
			{
				// if all enemies are defeated but there are more waves in the level, initialize it!
				levels[currentLevel].initNextEnemyWave();
			}
		}
		
		// update player data
		 playerUpdate(); //Moves player, will add projectile firing call to this function 
		  if (projPresent || powerup){
                            _Ship.prototype.moveProjectile();
                        }
		// check for collision
		checkPlayerProjectileCollision();
                _Ship.prototype.checkEnemyCollision();
		
		
	}

	this.cleanupState = function()
	{
		// cleanup and reset everything to clear memory used in this state
		levels[currentLevel].cleanup();
		levels.length = 0;
		currentLevel = 0;
		numLevels = 0;
		this.gameOver = false;
		scene.remove(particleSystem);
	}
	
	this.paused = function()
	{
		if(escapePressed == true)
		{
			escapePressed = false;
			return true;
		}
	
	
	}
	
	this.exit = function()
	{
		// check if something occurred to end the game
		if(this.gameOver == true)
		{
			this.cleanupState();	
			hud.reset();
			return true;
		}
	}
	
	function checkPlayerProjectileCollision()
	{
		levels[currentLevel].checkCollision();
	}
	
	
	function checkLastLevel()
	{
		return currentLevel + 1 == numLevels;
	}

	

	function addLevel(waveOne, waveTwo, waveThree)
	{
		levels[numLevels] = new level(waveOne, waveTwo, waveThree);
		numLevels++;
	}
}

gameMode.prototype = new state();
gameMode.prototype.constructor = gameMode;
