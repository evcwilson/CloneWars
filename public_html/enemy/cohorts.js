/*
	cohorts
	
	cohorts is a child class of the super class 'enemyWave', that contains properties that all future 
	enemy waves will contain. This setup is done immediately after this class is defined
	
	Cohorts is the basic block formation, placing enemies in rows of 5 each, so it's best to
	declare 'num' to be a multiple of 5 when create a new cohort() enemy wave.
	
*/


function cohort(num)
{
	
	enemyWave.call(this);
	
	this.numShips = num;
	this.enemyMovementSpeed = 1.5;
	
									
	this.allShipsInPosition = false;
	
	this.targetPosition = new THREE.Vector3(0, 60, 1);

	// ship and projectile geometry and material
	var smallShipGeometry = [50,50];
	var smallShipMaterial = new THREE.MeshBasicMaterial( 
														{ 
															map: pawnShipSprite, 
															side : THREE.DoubleSide, 
															transparent: true 
														} 
														);
	
	var shootTimer = 0;
	
	
	
	this.init = function()
	{
		var xInitPos = -190;
		var yInitPos = 600;
		var xDelta = 70;
		var yDelta = 0;
		
			
		
		// create numShips number of ships and add them to the scene
		for(var i = 0; i < this.numShips; i++)
		{
			this.shipArray[i] = _Ship.prototype.makeShipSprite( smallShipGeometry, smallShipMaterial );
			scene.add(this.shipArray[i]);
		}
		
		// set the position of the first ship
		this.shipArray[0].position.set(xInitPos, yInitPos, 1);
		
		for(var i = 1; i < this.numShips; i++)
		{
			if( (i % 5) == 0)
			{
				xDelta = 0;
				yDelta += 60;
			}
			
			// set each ship relative to the position of the mainship
			this.shipArray[i].position.set(xDelta, yDelta, 1);
			xDelta += 70;
			
			// add the ships as a child of the first ship
			this.shipArray[0].add(this.shipArray[i]);
			
		}
		
		// update class variables
		this.mainShip = this.shipArray[0];
		this.targetPosition.setX(xInitPos)
		
	}
	
	this.run = function()
	{
		// move the ships in formation to the target position....
		if(this.allShipsInPosition == false)
		{
			// get the distance of the ships...
			var distance = this.mainShip.position.distanceTo(this.targetPosition);
			if(distance > 2)
			{
				var targetDirection = new THREE.Vector3();
				targetDirection.subVectors(this.targetPosition, this.mainShip.position);
				targetDirection.normalize();
				this.mainShip.translateOnAxis(targetDirection, 3);
				
			}
			else
			{
				this.allShipsInPosition = true;
				for(var i = 1; i < this.shipArray.length; i++)
				{
					//this.shipArray[0].remove(this.shipArray[i]);
					var globalPos = new THREE.Vector3();
					globalPos.setFromMatrixPosition( this.shipArray[i].matrixWorld );
					this.shipArray[i].position.copy(globalPos);
					scene.add(this.shipArray[i]);
				}
				this.waveReady = true;
			}
			
		}
		// ...then move the ships horizontally
		else
		{
			// move the ships initially....
			this.bouncePoint.translateX(this.enemyMovementSpeed);
			
			//this.mainShip.translateX(this.enemyMovementSpeed);
			
			// but, if bouncePoint is past limit...
			if(this.bouncePoint.position.x > 125 || this.bouncePoint.position.x < -30)
			{
				//reverse movement speed and move bouncePoint back...
				this.enemyMovementSpeed *= -1;
				this.bouncePoint.translateX(this.enemyMovementSpeed);
			}
			
			// ...then move the ships
			for(var j = 0; j < this.shipArray.length; j++)
			{
				this.shipArray[j].translateX(this.enemyMovementSpeed);
			}

			shootTimer += deltaTime;
			if(shootTimer >= 1.6)
			{
				var randomNumber = Math.floor(Math.random() * this.shipArray.length);
				var shootingShip = 	this.shipArray[randomNumber];
				var globalPos = new THREE.Vector3();
				globalPos.setFromMatrixPosition( shootingShip.matrixWorld );
				_Ship.prototype.enemyProjectile(globalPos.x, globalPos.y - 20, this.projectileMaterial);
				shootTimer = 0;
			}
			
			if(enemyProject.length > 0)
			{
				for(var i = 0; i < enemyProject.length; i++)
				{
					_Ship.prototype.moveEneProjectile(i);
				}
			}
		}
		
		
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
	
		scene.remove(projectile);
		projPresent = false; 
		projectile = null;
	}
}

cohort.prototype = new enemyWave();
cohort.prototype.constructor = cohort;