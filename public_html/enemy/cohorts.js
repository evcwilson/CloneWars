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
	
	this.targetPosition = new THREE.Vector3(0, 60, 0);
	
	
	
	var smallShipGeometry = 	[	
									-18.0, 30.0, 0.0,
									 18.0, 30.0, 0.0,
									 0.0,	0.0, 0.0
								];

	var smallShipMaterial = new THREE.MeshBasicMaterial( { color: "yellow", side : THREE.DoubleSide } );
	
	this.init = function()
	{
		var xInitPos = -190;
		var yInitPos = 600;
		var xDelta = 70;
		var yDelta = 0;
		
			
		
		// create numShips number of ships and add them to the scene
		for(var i = 0; i < this.numShips; i++)
		{
			this.shipArray[i] = _Ship.prototype.makeShip( smallShipGeometry, smallShipMaterial );
			scene.add(this.shipArray[i]);
		}
		
		// set the position of the first ship
		this.shipArray[0].position.set(xInitPos, yInitPos, 0);
		
		for(var i = 1; i < this.numShips; i++)
		{
			if( (i % 5) == 0)
			{
				xDelta = 0;
				yDelta += 60;
			}
			
			// set each ship relative to the position of the mainship
			this.shipArray[i].position.set(xDelta, yDelta, 0);
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
			}
			
		}
		// ...then move the ships horizontally
		else
		{
			// moveShip left and right
			this.mainShip.translateX(this.enemyMovementSpeed);

			if(this.mainShip.position.x > -50 || this.mainShip.position.x < -borderWidth  )	
			{
					this.enemyMovementSpeed *= -1;
					this.mainShip.translateX(this.enemyMovementSpeed);
					
			}
		}
		
	}
	
	this.cleanup = function()
	{
		for(var i = 0; i < this.numShips; i++)
		{
			scene.remove(this.shipArray[i]);
			this.shipArray[i] = null;
		}
	
	}
}

cohort.prototype = new enemyWave();
cohort.prototype.constructor = cohort;