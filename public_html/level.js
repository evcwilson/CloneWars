// Level.js
/*
	The level class will contain the enemy waves for each level. The enemy waves are given in
	through the function call. The enemy waves are defined using the enemyWave interface class.
	
	If the waves passed into the function is not an instance of 'enemyWave', it will not get
	assigned to the level. This is because Javascript function arguments are dynamic, so it makes sure
	the correct data types are being used.

*/

function level(waveOne, waveTwo, waveThree)
{
	// Level Properties
	this.enemyWaves = [];
	this.numWaves = -1;
	this.currentWave = -1;
	
	// check to see if enemy waves that were passed into the function are of type enemyWave
	if(waveOne instanceof enemyWave)
	{
		this.enemyWaves[++this.numWaves] = waveOne;
	}
	if(waveTwo instanceof enemyWave)
	{
		this.enemyWaves[++this.numWaves] = waveTwo;
	}
	if(waveThree instanceof enemyWave)
	{
		this.enemyWaves[++this.numWaves] = waveThree;
	}
	
	
	// function to initialize the next wave of enemies for the level
	this.initNextEnemyWave = function()
	{
		if(this.currentWave != -1)
		{
			this.enemyWaves[this.currentWave].cleanup();
			this.enemyWaves[++this.currentWave].init();
			
		}
		else
		{
			this.enemyWaves[++this.currentWave].init();
		}
	}
	
	// function to run the current enemy wave in the level
	this.runEnemyWave = function()
	{
		this.enemyWaves[this.currentWave].run();
	}
}
