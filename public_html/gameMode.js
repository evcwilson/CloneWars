// GameMode.js
/*	

	GameMode is the mode where the player is actively fighting enemy ships. This mode is
	ideally after the SplashScreen/Pregame Mode and before the Credits/GameOver mode.

	This is the ideal flow of GameMode:
	-------------------------------------
	1.) GameMode keeps an array of levels. Levels keep an array of enemyWaves.
	2.) When all enemies in one enemyWave are dead, the level initializes and loads the next enemyWaves.
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
	addLevel(new vFormation(), new diamondFormation() );
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
	levels[currentLevel].initNextEnemyWave();
}

function addLevel(waveOne, waveTwo, waveThree)
{
	levels[numLevels] = new level(waveOne, waveTwo, waveThree);
	numLevels++;
}

