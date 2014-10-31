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
	
	// Level Methods
	
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
			this.enemyWaves[this.currentWave].run()
	}
	
	this.checkEnemiesDefeated = function()
	{
		return this.enemyWaves[this.currentWave].checkEnemiesDefeated();
	}
	
	// function to add waves to level
	this.addWavesToLevel = function()
	{
		// check to see if enemy waves that were passed into the function are of type enemyWave
		if(waveOne instanceof enemyWave)
		{
			this.enemyWaves[++this.numWaves] = waveOne;
		} 
		else 
		{ 
			if(waveOne) 
				console.log( "LEVEL ERROR: '" + waveOne.constructor.name + "' is not of type 'enemyWave'" ); 
		}
		
		if(waveTwo instanceof enemyWave)
		{
			this.enemyWaves[++this.numWaves] = waveTwo;
		}
		else 
		{ 
			if(waveTwo) 
				console.log( "LEVEL ERROR: '" + waveTwo.constructor.name + " is not of type 'enemyWave'" ); 
		}
		
		if(waveThree instanceof enemyWave)
		{
			this.enemyWaves[++this.numWaves] = waveThree;
		}
		else 
		{ 
			if(waveThree) 
				console.log( "LEVEL ERROR: '" + waveThree.constructor.name + " is not of type 'enemyWave'" ); 
		}
	}
	
	this.checkLastWave = function()
	{
		return this.currentWave == this.numWaves;
	}
	
	this.cleanup = function()
	{
		this.enemyWaves[this.currentWave].cleanup();
		this.currentWave = 0;
	}
	
	this.checkCollision = function()
	{
		this.enemyWaves[this.currentWave].checkCollision();
	}
	
	
	
	
	
	// class body
	this.addWavesToLevel();
}
