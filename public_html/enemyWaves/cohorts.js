/*
	cohorts
	
	cohorts is a child class of the super class 'enemyWave', that contains properties that all future 
	enemy waves will contain. This setup is done immediately after this class is defined
	
	Cohorts is the basic block formation, placing enemies in rows of 5 each, so it's best to
	declare 'num' to be a multiple of 5 when creating a new cohort() enemy wave.
	
*/


function cohort(num)
{
	// call parent class's constructor
	enemyWave.call(this);
	
	
	this.numShips = num;
	this.enemyShipSpeed = 1.5;
	
									
	this.allShipsInPosition = false;
	
	this.targetPosition = new THREE.Vector3(-15, 60, 1);

	// ship and projectile geometry and material
	var smallShipGeometry = [50,50];
	var smallShipMaterial = new THREE.MeshBasicMaterial( 
														{ 
															map: pawnShipSprite, 
															side : THREE.DoubleSide, 
															transparent: true 
														} 
														);
	
	this.xMax = 125;
	this.xMin = -30;
	
	this.init = function()
	{
		var xInitPos = -190;
		var yInitPos = 600;
		var xDelta = 70;
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
			if( (i % 5) == 0)
			{
				xDelta = 0;
				yDelta += 50;
			}
			
			// set each ship relative to the position of the mainship
			this.shipArray[i].mesh.position.set(xDelta, yDelta, 1);
			xDelta += 70;
			
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
			// run the default enemyWave run() function. add more after function call if necessary
			cohort.prototype.run.call(this);
		}
		
		
		
	}
	// uncomment and add to body if additional cleanup is necessary besides what is in the default enemyWave's cleanup function
	//this.cleanup = function() { this.parent.cleanup.call(this); 
}

cohort.prototype = new enemyWave();
cohort.prototype.constructor = cohort;