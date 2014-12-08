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
	this.enemyShipSpeed = 1.5;
	
	var vFormGeometry = [ 75, 75 ];
	var vFormMaterial = new THREE.MeshBasicMaterial( {map: pawnShipSprite, side : THREE.DoubleSide, transparent: true});
	
	var testBoxGeometry = new THREE.BoxGeometry( 10, 10, 10 );
	var testBoxMaterial = new THREE.MeshBasicMaterial( {color: "white"} );
	var testBox = new THREE.Mesh( testBoxGeometry, testBoxMaterial );
	testBox.position.set(0, 80, 1);
	
	this.xMax = 85;
	this.xMin = -55;
	
	// function methods
	this.init = function()
	{
		// Make three ships
		for(var i = 0; i < 7; i++)
		{
			if(i == 0)
				this.shipArray[i] = new enemyShip( { shipRank: centurion, shield: true });
			else
				this.shipArray[i] = new enemyShip( { shipRank: pawn } );
				
			scene.add(this.shipArray[i].mesh);
			this.shipArray[i].mesh.position.set( -100, 400, 1 );
		}
		
		
		this.numShips = this.shipArray.length;
		
		
		this.startPosition = this.shipArray[0].mesh.position;
		this.targetPosition = testBox.position;
		
		var xFlip = 1;
		this.targetPositions[0] = new THREE.Vector3();
		this.targetPositions[0].copy(testBox.position);
		var yOffset = 50;
		// set position of targetPositions with the position of test boxes (test boxes may not be visible in scene)
		for(var i = 1; i < this.numShips; i++)
		{
			this.targetPositions[i] = new THREE.Vector3();
			this.targetPositions[i].copy(testBox.position);
			this.targetPositions[i].setX((testBox.position.x + 65) * xFlip);
			
			if(i > 0)
				this.targetPositions[i].setY(this.targetPositions[i].y + yOffset );
			xFlip = xFlip * -1.25;
			
			if(i % 2 == 0)
			{
				yOffset += 50;
			}
		}
		
		this.targetDirection.subVectors(this.targetPositions[this.currentMovingShip], this.shipArray[this.currentMovingShip].mesh.position);
		this.targetDirection.normalize();
		
		this.mainShip = this.shipArray[0];
	};

	this.run = function()
	{	
		
		// if all the ships are not in position....
		if(this.allShipsInPosition == false)
		{
			// get the distance of the ships...
			var distance = this.shipArray[this.currentMovingShip].mesh.position.distanceTo(this.targetPositions[this.currentMovingShip]);
			if(distance > 2)
			{
				this.shipArray[this.currentMovingShip].mesh.translateOnAxis(this.targetDirection, 3);
				
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
						this.targetDirection.subVectors(this.targetPositions[this.currentMovingShip], this.shipArray[this.currentMovingShip].mesh.position);
						this.targetDirection.normalize();	
				}
			}
		}
		// if all the ships are in position
		else
		{
			// run the default enemyWave run() function. add more after function call if necessary
			vFormation.prototype.run.call(this);
			
			
		}

	};

	// uncomment and add to body if additional cleanup is necessary besides what is in the default enemyWave's cleanup function
	//this.cleanup = function() { this.parent.cleanup.call(this); 


}

vFormation.prototype = new enemyWave();
vFormation.prototype.constructor = vFormation;
