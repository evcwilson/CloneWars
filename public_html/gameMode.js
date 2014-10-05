// GameMode.js
// Not yet added to the current game


// ---------------------------------------------------------
// Variable Declarations
// ---------------------------------------------------------
var numShips = 0;
var numEnemyWaves = 0;
var numLevels = 0;

var timerGame;
var currentLevel = 0;


var enemyWaves = [];

var levels = [];

// ------------------------------------------------------------
// Script body
// ------------------------------------------------------------

// add two levels to the game
addLevel(50, 1000, testfunction, testfunction2, testfunction3);
addLevel(1, 2, testfunction);

// get enemy wave data from the levels and print to console
getEnemyWave();


// ------------------------------------------------------------
// function Declarations
// ------------------------------------------------------------
function getLevelData()
{
	// copy level data (numShips and timer) to game mode
	numShips = levels[currentLevel].numShips;
	timerGame = levels[currentLevel].timer;
	
	// get number of enemy waves in the level and copy to game mode
	numEnemyWavesGame = levels[0].enemyWaves.length;
	
	
	// copy level enemy wave data to game mode
	for(var i = 0; i < numEnemyWavesGame; i++)
	{
		enemyWaves[i] = levels[currentLevel].enemyWaves[i];
	}
	
	
}

function getEnemyWave()
{
	
	
	for(var i = 0; i < numLevels; i++)
	{
		getLevelData();
		console.log("Level " + (i+1));
		console.log("numShips = " + numShips);
		console.log("timer = " + timerGame);
		console.log("");
		
		for(var j = 0; j < enemyWaves.length; j++)
		{
			enemyWaves[j]();
		}
		currentLevel++;
		
	}
}

function addLevel(nShips, time, enemyWaveFunction1, enemyWaveFunction2, enemyWaveFunction3)
{
	levels[numLevels] = new level(nShips, time, enemyWaveFunction1, enemyWaveFunction2, enemyWaveFunction3);
	numLevels++;
}

function allShipsDead()
{
	return numShips == 0;
}


function testfunction()
{
	
	console.log("");
	console.log("testFunction");
}

function testfunction2()
{
	console.log("testFunction 2");
}


function testfunction3()
{
	console.log("last and final function 3");
}