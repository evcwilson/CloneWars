/*
	enemyWave
	
	The enemyWave class is the superclass to all future enemyWaves and formation. It
	will contain properties that are common among all future enemy waves, such as number of ships
	in the wave.
	
	Every class that inherits from this class must override the following functions:
		1.) init() - this setups up the wave, initializes the array of ships, sets main ship, etc
		2.) run()  - this processes the behavior of the ships in the enemy wave, whatever it may be.
		3.) cleanup() - sets leftover ships and important variable to null for garbage collection
		
	Additional notes:
	---------------------------
	Collision checking - the function to check collisions is checkCollision(). It will only check for
		collisions if there is a player projectile present AND if the waveReady variable equals true
		(waveReady is usually false until all the enemy ships are in position to avoid being shot while
		the enemy ships are flying in the scene. Enable this variable in the derived objects so collision
		detection will work.)
		
	Speeding up - if this.speedUp equals true, the ships' enemyShipSpeed will increase every time an
		enemy ship is destroyed. This variable is false by default.
	
	

*/



function enemyWave()
{
	this.numShips = 0;
	this.shipArray = [];
	this.mainShip; 
	this.laserOn = false;
	// 
	this.enemyShipSpeed = 0;
	
	this.waveReady = false;
	this.shootTimer = 0;
	
	this.xMax = 0;
	this.xMin = 0;
	
	this.speedUp = false;
	
	// how frequent to fire shots in seconds
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
		/*
		// move the ships initially....
		this.bouncePoint.translateX(this.enemyShipSpeed);
		
		// but, if bouncePoint is past limit...
		if(this.bouncePoint.position.x > this.xMax || this.bouncePoint.position.x < this.xMin)
		{
			//reverse movement speed and move bouncePoint back...
			this.enemyShipSpeed *= -1;
			this.bouncePoint.translateX(this.enemyShipSpeed);
		}
		*/
		// ...then move the ships
		for(var j = 0; j < this.shipArray.length; j++)
		{
			this.shipArray[j].mesh.translateX(this.enemyShipSpeed);
		}
		
		// ...check if any ship reached any border
		var passedBorder = false;
		for(var j = 0; j < this.shipArray.length; j++)
		{
			if(this.shipArray[j].mesh.position.x > 225 || this.shipArray[j].mesh.position.x < -225)
			{
				passedBorder = true;
			}
		}
		
		if(passedBorder == true)
		{
			this.enemyShipSpeed *= -1;
			// ...then move the ships
			for(var j = 0; j < this.shipArray.length; j++)
			{
				this.shipArray[j].mesh.translateX(this.enemyShipSpeed);
			}
		}
		
		// fire projectiles randomly
		this.shootTimer += deltaTime;
		if(this.shootTimer >= this.secondsToShoot)
		{
			var randomNumber = Math.floor(Math.random() * this.shipArray.length);
			var shootingShip = 	this.shipArray[randomNumber].mesh;
			var globalPos = new THREE.Vector3();
			globalPos.setFromMatrixPosition( shootingShip.matrixWorld );
			_Ship.prototype.enemyProjectile(globalPos.x, globalPos.y - 20, this.projectileMaterial);
			EnemyFire2();
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
			scene.remove(this.shipArray[i].mesh);
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
	
	this.checkCollision = function(game)
	{	
		// if a projectile exists
		if(projPresent == true && this.waveReady == true)
		{
			//loop through each ship and check if projectile is within distance
			for(var i = 0; i < this.shipArray.length; i++)
			{
				var ship = this.shipArray[i];
				if(Math.abs(ship.mesh.position.y - projectile.position.y) < 20
					&& Math.abs(ship.mesh.position.x - projectile.position.x) < 20) 
				{
					if(ship.shield != null)
					{
						if(ship.shield.active == true)
						return;
					}
					if(ship.laserBeam != null)
					{
						if(ship.laserBeam.active == true)
						return;
					}
					ship.damage();
					
					if(ship.getHealth() <= 0)
					{
						var randomNumber = Math.floor(Math.random() * 11);
						
						if(randomNumber < 5)
							game.addPowerup(healthPowerup, ship.mesh.position);
							
						// remove ship from scene and shipArray
						scene.remove(ship.mesh);
						hud.updateScore(ship.getKillPoints());
						this.shipArray.splice(i,1);
						this.numShips--;
						
						// increase enemyShipSpeed, if speedUp is true
						if(this.speedUp == true)
						{
							if(this.enemyShipSpeed > 0)
								this.enemyShipSpeed += this.deltaShipSpeed;
							else
								this.enemyShipSPeed -= this.deltaShipSpeed;
						}
						
					}
						// remove projectile from scene and set projectile flag to false
						scene.remove(projectile);
						projPresent = false; 
						projectile = null;
						
						
						break;
					
				}
				
				// if ship has shield, check collision
				if(ship.shield != null)
				{
					ship.shield.checkCollision();
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
	
	this.checkLaser = function()
	{
		
		return false;
	}

}

