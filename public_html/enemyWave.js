/*
	enemyWave
	
	The enemyWave class is the superclass to all future enemyWaves and formation. It
	will contain properties that all future enemy waves will have, such as number of ships
	in the wave.
	
	Every class that inherits from this class must override the following functions:
		1.) init() - this setups up the wave, initializes the array of ships, sets main ship, etc
		2.) run()  - this processes the behavior of the ships in the enemy wave, whatever it may be.
		3.) cleanup() - sets leftover ships and important variable to null for garbage collection

*/

function enemyWave()
{
	this.numShips;
	this.shipArray = [];
	this.mainShip;
	
	this.init = function() { console.log("If you are getting this message in the console, " + 
										 "that means you did not override the 'run' function in your child " + 
										 "class " + this.constructor.name + "."); };
										 
	this.run = function() { console.log("If you are getting this message in the console, " + 
										 "that means you did not override the 'run' function in your child " + 
										 "class " + this.constructor.name + "."); };
										 
	this.cleanup = function() { console.log("If you are getting this message in the console, " + 
										 "that means you did not override the 'cleanup' function in your child " + 
										 "class " + this.constructor.name + "."); };

}