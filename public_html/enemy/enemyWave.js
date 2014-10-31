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
	
	this.enemyShipSpeed = 0;
	
	this.waveReady = false;
	this.shootTimer = 0;
	
	this.xMax = 0;
	this.xMin = 0;
	
	// how frequently to fire shots in seconds
	this.secondsToShoot = 1.6;
	
	this.projectileMaterial = new THREE.MeshBasicMaterial( { color: "green", side : THREE.DoubleSide } );

	// bouncePoint is an invisible Mesh that is used to determine when 
	// enemyShips will bounce back
	this.bouncePoint = new THREE.Mesh();
	
	this.init = function() { console.log("If you are getting this message in the console, " + 
										 "that means you did not override the 'run' function in your child " + 
										 "class '" + this.constructor.name + "'."); };
				
	this.run = function() 
	{
		// move the ships initially....
		this.bouncePoint.translateX(this.enemyShipSpeed);
		
		// but, if bouncePoint is past limit...
		if(this.bouncePoint.position.x > this.xMax || this.bouncePoint.position.x < this.xMin)
		{
			//reverse movement speed and move bouncePoint back...
			this.enemyShipSpeed *= -1;
			this.bouncePoint.translateX(this.enemyShipSpeed);
		}
		
		// ...then move the ships
		for(var j = 0; j < this.shipArray.length; j++)
		{
			this.shipArray[j].translateX(this.enemyShipSpeed);
		}
		
		// fire projectiles randomly
		this.shootTimer += deltaTime;
		if(this.shootTimer >= this.secondsToShoot)
		{
			var randomNumber = Math.floor(Math.random() * this.shipArray.length);
			var shootingShip = 	this.shipArray[randomNumber];
			var globalPos = new THREE.Vector3();
			globalPos.setFromMatrixPosition( shootingShip.matrixWorld );
			_Ship.prototype.enemyProjectile(globalPos.x, globalPos.y - 20, this.projectileMaterial);
			this.shootTimer = 0;
		}

		// move the projectiles, if any
		this.moveProjectiles();
	}
										 
	this.cleanup = function() 
	{ 
		// remove ships from scene
		for(var i = 0; i < this.numShips; i++)
		{
			scene.remove(this.shipArray[i]);
			this.shipArray[i] = null;
		}
		
		// remove projectiles from scene
		for(var i = 0; i < enemyProject.length; i++)
		{
			scene.remove(enemyProject[i]);
		}
		enemyProject = [];
		enemyProjectCount = 0;
		
		// remove player's projectile from scene
		scene.remove(projectile);
		projPresent = false; 
		projectile = null;
	}
	
	
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
	
	this.moveProjectiles = function()
	{
		if(enemyProject.length > 0)
		{
			for(var i = 0; i < enemyProject.length; i++)
			{
				_Ship.prototype.moveEneProjectile(i);
			}
		}
	}

}

