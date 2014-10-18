// GameMode.js
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


// Variable Declarations
var timerGame;

var levels = [];
var currentLevel = 0;
var numLevels = 0;


// functions Declarations/Definitions
function gameModeInit()
{
	// Add one level to the game with two enemy waves and initialize the first level's first enemy wave
	addLevel(new cohort(5), new cavalry(2,6), new cohort(10));
	addLevel(new cavalry(4, 10), new cohort(15), new vFormation());
	addLevel(new cavalry(6, 16), new diamondFormation(), new cohort(20) );
	levels[currentLevel].initNextEnemyWave();
}

function gameModeRun()
{
	// run the current level's current enemy wave
	levels[currentLevel].runEnemyWave()
}

function gameModePause()
{
	

}

function gameModeNextLevel()
{
	currentLevel++;
}

function levelInitNextWave()
{	
	// check if this is the last wave in the current level
	var isLastWave = levels[currentLevel].checkLastWave();
	if(isLastWave == false)		// if not, load the next wave in the current level
		levels[currentLevel].initNextEnemyWave();
	else						// if so, check if this is the last level in the game
	{
		if(currentLevel + 1 >= numLevels)
			return;				// if so, simply do an early return, which does nothing
		else
		{						// if there are more levels, cleanup the last wave and initialize the next level's first wave
			levels[currentLevel].cleanup();
			currentLevel++;
			levels[currentLevel].initNextEnemyWave();
		}
	}
}

function addLevel(waveOne, waveTwo, waveThree)
{
	levels[numLevels] = new level(waveOne, waveTwo, waveThree);
	numLevels++;
}

