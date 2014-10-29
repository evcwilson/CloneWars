/*
	enemyWave
	
	The enemyWave class is the superclass to all future enemyWaves and formation. It
	will contain properties that are common among all future enemy waves, such as number of ships
	in the wave.
	
	Every class that inherits from this class must override the following functions:
		1.) init() - this setups up the wave, initializes the array of ships, sets main ship, etc
		2.) run()  - this processes the behavior of the ships in the enemy wave, whatever it may be.
		3.) cleanup() - sets leftover ships and important variable to null for garbage collection

*/

var pawnShipSprite = new THREE.ImageUtils.loadTexture("Sprites/EnemyShip1.gif");

function enemyWave()
{
	this.numShips = 0;
	this.shipArray = [];
	this.mainShip; 
	this.waveReady = false;
	
	this.projectileMaterial = new THREE.MeshBasicMaterial( { color: "green", side : THREE.DoubleSide } );

	// bouncePoint is an invisible Mesh that is used to determine when 
	// enemyShips will bounce back
	this.bouncePoint = new THREE.Mesh();
	
	this.init = function() { console.log("If you are getting this message in the console, " + 
										 "that means you did not override the 'run' function in your child " + 
										 "class '" + this.constructor.name + "'."); };
										 
	this.run = function() { console.log("If you are getting this message in the console, " + 
										 "that means you did not override the 'run' function in your child " + 
										 "class '" + this.constructor.name + "'."); };
										 
	this.cleanup = function() { console.log("If you are getting this message in the console, " + 
										 "that means you did not override the 'cleanup' function in your child " + 
										 "class '" + this.constructor.name + "'."); };
	
	this.checkEnemiesDefeated = function()
	{
		return this.numShips == 0;
	}
										 
										 
	this.checkCollision = function()
	{	
		// if a projectile exists
		if(projectile && this.waveReady == true)
		{
			//loop through each ship and check if projectile is within distance
			for(var i = 0; i < this.shipArray.length; i++)
			{
				var ship = this.shipArray[i];
				if(Math.abs(ship.position.y - projectile.position.y) < 20
					&& Math.abs(ship.position.x - projectile.position.x) < 20)
				{
					scene.remove(this.shipArray[i]);
					this.shipArray.splice(i,1);
					this.numShips--;
					
					
					scene.remove(projectile);
					projPresent = false; 
					projectile = null;
					break;
				}
			}
		
		}
		
	}

}