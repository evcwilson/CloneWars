// Level.js
// Not yet used in game

// Setup level structure
var level = function(numShips, timer, waveOne, waveTwo, waveThree)
{
	// Level Properties
	this.numShips 	= numShips;
	this.timer 		= timer;
	
	function enemyWaveOne() {};
	function enemyWaveTwo() {};
	function enemyWaveThree() {};
	
	// Check if each wave argument is a function and if so, assign it to the level's enemy wave functions
	if(typeof waveOne == "function")
		enemyWaveOne = waveOne;	
		
	if(typeof waveTwo == "function")
		enemyWaveTwo = waveTwo;
		
	if(typeof waveThree == "function")
		enemyWaveThree = waveThree;
	
	
	// put functions in an array
	this.enemyWaves = [  enemyWaveOne,	enemyWaveTwo, enemyWaveThree ];
	
	
	
}




