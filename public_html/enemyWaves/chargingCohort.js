/*
	chargingCohort.js
	
	chargingCohort is a child class of the super class 'enemyWave', that contains properties that all future 
	enemy waves will contain. This setup is done immediately after this class is defined.
	
	chargingCohort is similar to the enemy wave 'cohort', with the following modifications:
	1.) enemy ship size is smaller and closer together
	2.) ships are closer together, number of enemies is recommended to be a multiple of 8
	3.) the ships will speed up when one enemy ship is destroyed
	4.) the ships will slowly descend closer to the player ship
	
	
*/


function chargingCohort(num)
{
	// call parent class's constructor
	enemyWave.call(this);
	
	
	this.numShips = num;
	this.enemyShipSpeed = 1.0;
	this.deltaShipSpeed = 25/(100-this.numShips);
	this.speedUp = true;
									
	this.allShipsInPosition = false;
	
	this.targetPosition = new THREE.Vector3(0, 60, 1);

	// ship and projectile geometry and material
	var smallShipGeometry = [40,40];
	var smallShipMaterial = new THREE.MeshBasicMaterial( 
														{ 
															map: pawnShipSprite, 
															side : THREE.DoubleSide, 
															transparent: true 
														} 
														);
	
	this.xMax = 65;
	this.xMin = -30;
	
	this.init = function()
	{
		var xInitPos = -190;
		var yInitPos = 600;
		var xDelta = 55;
		var yDelta = 0;
		
			
		
		// create numShips number of ships and add them to the scene
		for(var i = 0; i < this.numShips; i++)
		{
			this.shipArray[i] = new enemyShip(pawn);//_Ship.prototype.makeShipSprite( smallShipGeometry, smallShipMaterial );
			scene.add(this.shipArray[i].mesh);
		}
		
		// set the position of the first ship
		this.shipArray[0].mesh.position.set(xInitPos, yInitPos, 1);
		
		for(var i = 1; i < this.numShips; i++)
		{
			if( (i % 8) == 0)
			{
				xDelta = 0;
				yDelta += 40;
			}
			
			// set each ship relative to the position of the mainship
			this.shipArray[i].mesh.position.set(xDelta, yDelta, 1);
			xDelta += 55;
			
			// add the ships as a child of the first ship
			this.shipArray[0].mesh.add(this.shipArray[i].mesh);
			
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
			var distance = this.mainShip.mesh.position.distanceTo(this.targetPosition);
			if(distance > 2)
			{
				var targetDirection = new THREE.Vector3();
				targetDirection.subVectors(this.targetPosition, this.mainShip.mesh.position);
				targetDirection.normalize();
				this.mainShip.mesh.translateOnAxis(targetDirection, 3);
				
			}
			else
			{
				this.allShipsInPosition = true;
				for(var i = 1; i < this.shipArray.length; i++)
				{
					//this.shipArray[0].remove(this.shipArray[i]);
					var globalPos = new THREE.Vector3();
					globalPos.setFromMatrixPosition( this.shipArray[i].mesh.matrixWorld );
					this.shipArray[i].mesh.position.copy(globalPos);
					scene.add(this.shipArray[i].mesh);
				}
				this.waveReady = true;
			}
			
		}
		// ...then move the ships horizontally
		else
		{
			var oldSpeed = this.enemyShipSpeed;
			
			// run the default enemyWave run() function. add more after function call if necessary
			cohort.prototype.run.call(this, true);
			
			// check if the enemyShipSpeed changed. If so, move ships downward
			if(this.enemyShipSpeed != oldSpeed)
			{
				for(var i = 0; i < this.shipArray.length; i++)
				{
					this.shipArray[i].mesh.translateY(-7);
					if(this.shipArray[i].mesh.position.y < -250)
						stateStack[currentState].gameOver = true;
				}
			}
			
		}
		
		
		
	}
	// uncomment and add to body if additional cleanup is necessary besides what is in the default enemyWave's cleanup function
	//this.cleanup = function() { this.parent.cleanup.call(this); 
}

chargingCohort.prototype = new enemyWave();
chargingCohort.prototype.constructor = chargingCohort;

