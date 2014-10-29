/*
	vFormation
	
	vFormation is a child class of the super class 'enemyWave', that contains properties that all future 
	enemy waves will contain. This setup is done immediately after this class is defined
*/
function vFormation()
{
	// call super class's constructor
	enemyWave.call(this);
	
	// function variables
	this.startPosition;
	this.targetPosition;
	this.targetDirection = new THREE.Vector3();

	this.targetPositions = [];
	this.allShipsInPosition = false;
	this.currentMovingShip = 0;
	this.enemyMovementSpeed = 1.5;
	
	var vFormGeometry = [ 75, 75 ];
	var vFormMaterial = new THREE.MeshBasicMaterial( {map: pawnShipSprite, side : THREE.DoubleSide, transparent: true});
	
	var testBoxGeometry = new THREE.BoxGeometry( 10, 10, 10 );
	var testBoxMaterial = new THREE.MeshBasicMaterial( {color: "white"} );
	var testBox = new THREE.Mesh( testBoxGeometry, testBoxMaterial );
	testBox.position.set(0, 80, 1);
	
	var shootTimer = 0;
	
	// function methods
	this.init = function()
	{

		// Make three ships
		for(var i = 0; i < 3; i++)
		{
			this.shipArray[i] = _Ship.prototype.makeShipSprite(vFormGeometry, vFormMaterial);
			scene.add(this.shipArray[i]);
			this.shipArray[i].position.set( -100, 400, 1 );
		}
		
		
		this.numShips = this.shipArray.length;
		
		
		this.startPosition = this.shipArray[0].position;
		this.targetPosition = testBox.position;
		
		var xFlip = 1;
		this.targetPositions[0] = new THREE.Vector3();
		this.targetPositions[0].copy(testBox.position);
		
		// set position of targetPositions with the position of test boxes (test boxes may not be visible in scene)
		for(var i = 1; i < this.numShips; i++)
		{
			this.targetPositions[i] = new THREE.Vector3();
			this.targetPositions[i].copy(testBox.position);
			this.targetPositions[i].setX((testBox.position.x + 125) * xFlip);
			
			if(i > 0)
				this.targetPositions[i].setY(this.targetPositions[i].y + 50);
			xFlip = xFlip * -1.25;
		}
		
		this.targetDirection.subVectors(this.targetPositions[this.currentMovingShip], this.shipArray[this.currentMovingShip].position);
		this.targetDirection.normalize();
		
		this.mainShip = this.shipArray[0];
	};

	this.run = function()
	{	
		
		// if all the ships are not in position....
		if(this.allShipsInPosition == false)
		{
			// get the distance of the ships...
			var distance = this.shipArray[this.currentMovingShip].position.distanceTo(this.targetPositions[this.currentMovingShip]);
			if(distance > 2)
			{
				this.shipArray[this.currentMovingShip].translateOnAxis(this.targetDirection, 3);
				
			}
			else
			{
				this.currentMovingShip++;
				if(this.currentMovingShip == this.numShips)
				{
					this.allShipsInPosition = true;
					for(var i =  1; i < this.numShips; i++)
					{
						//this.shipArray[0].add(this.shipArray[i]);
					}
					this.waveReady = true;
				}
				else
				{
						this.targetDirection.subVectors(this.targetPositions[this.currentMovingShip], this.shipArray[this.currentMovingShip].position);
						this.targetDirection.normalize();	
				}
			}
		}
		// if all the ships are in position
		else
		{
			var speedModifier = -2 ;

			var currentPosition = this.mainShip.position;
			
			// move the ships initially....
			this.bouncePoint.translateX(this.enemyMovementSpeed);
			
			// but, if bouncePoint is past limit...
			if(this.bouncePoint.position.x > 85 || this.bouncePoint.position.x < -55)
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
			
			// fire projectiles
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

	};

	// cleanup all enemies from memory that this enemy wave created
	this.cleanup = function()
	{
		for(var i = 0; i < this.numShips; i++)
		{
			scene.remove(this.shipArray[i]);
			this.shipArray[i] = null;				// sets shipArray elements to null for garbage collection
		};
		
		// remove projectiles from scene
		for(var i = 0; i < enemyProject.length; i++)
		{
			scene.remove(enemyProject[i]);
		}
		enemyProject = [];
		enemyProjectCount = 0;
	}

}

vFormation.prototype = new enemyWave();
vFormation.prototype.constructor = vFormation;

