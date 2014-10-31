/*
	diamondFormation
	
	diamondFormation is a child class of the super class 'enemyWave', that contains properties that all future 
	enemy waves will contain. This setup is done immediately after this class is defined
*/

function diamondFormation()
{
	enemyWave.call(this);
	this.bossShipGeometry ;
	this.bossShipMaterial ;
	this.bossShipMesh 	;

	
	this.pawnShipGeometry ;
	this.pawnShipMaterial ;
	this.pawnShipMesh 	;
	
	this.pawnShipArray 	= [];
	this.diamondPoints 	= [];

	this.testBox0;
	this.testBox1;
	this.testBox2;
	this.testBox3;
	
	this.enemyShipSpeed = 1.2;

	this.xMax = 80;
	this.xMin = -80;
	
	this.init = function()
	{
		// initialize the bossShipMesh and add to scene
		this.bossShipGeometry = [75, 75];
			
		this.bossShipMaterial = new THREE.MeshBasicMaterial( { map: pawnShipSprite, transparent: true, side : THREE.DoubleSide } );
		
		this.bossShipMesh = _Ship.prototype.makeShipSprite(this.bossShipGeometry, this.bossShipMaterial);
		this.bossShipMesh.position.set(0, 110, 1);
		scene.add(this.bossShipMesh);
		this.shipArray[this.numShips++] = this.bossShipMesh;
		

		// initialize diamondPoint positions
		for(var i = 0; i < 4; i++)
		{
			this.diamondPoints[i] = new THREE.Vector3();
			this.diamondPoints[i].copy(this.bossShipMesh.position);
		}
		this.diamondPoints[0].setX(this.bossShipMesh.position.x + 150);
		this.diamondPoints[1].setY(this.bossShipMesh.position.y - 150);
		this.diamondPoints[2].setX(this.bossShipMesh.position.x - 150);
		this.diamondPoints[3].setY(this.bossShipMesh.position.y + 150);
		
		this.testBox0 = new THREE.Mesh( this.testBoxGeometry, this.testBoxMaterial );
		this.testBox1 = new THREE.Mesh( this.testBoxGeometry, this.testBoxMaterial );
		this.testBox2 = new THREE.Mesh( this.testBoxGeometry, this.testBoxMaterial );
		this.testBox3 = new THREE.Mesh( this.testBoxGeometry, this.testBoxMaterial );
		
		/*
		scene.add(testBox0)
		scene.add(testBox1)
		scene.add(testBox2)
		scene.add(testBox3)
		*/
		this.testBox0.position.copy(this.diamondPoints[0]);
		this.testBox1.position.copy(this.diamondPoints[1]);
		this.testBox2.position.copy(this.diamondPoints[2]);
		this.testBox3.position.copy(this.diamondPoints[3]);
		
		
		
		// initialize pawnShip meshes
		
		this.pawnShipGeometry = [50, 50];
		this.pawnShipMaterial = new THREE.MeshBasicMaterial( { 
															map: pawnShipSprite, 
															side: THREE.DoubleSide,
															transparent: true });
		
		// create pawn ship array and assign positions
		for( var i = 0; i < 4; i++)
		{
			this.pawnShipArray[i] = _Ship.prototype.makeShipSprite(this.pawnShipGeometry, this.pawnShipMaterial);
			scene.add(this.pawnShipArray[i] );
			this.shipArray[this.numShips++] = this.pawnShipArray[i];
			this.pawnShipArray[i].position.copy(this.diamondPoints[i]);//50, -60 * (i + 1), 0);
			
		}
		
		
		// assign source and lerp points for each pawn ship
		for(var i = 0, lp = 3; i < 4; i++)
		{
		
			this.pawnShipArray[i].sourceLerpPoint = 0;//lp;
			this.pawnShipArray[i].destLerpPoint = (i + 1) % 4;//1;//((lp++) % 4);
		}
		
		// assigns target direction for each pawn ship
		for(var i = 0; i < 4; i++)
		{
			this.pawnShipArray[i].targetDirection = new THREE.Vector3();
			this.pawnShipArray[i].targetDirection.subVectors(this.diamondPoints[this.pawnShipArray[i].destLerpPoint], this.diamondPoints[this.pawnShipArray[i].sourceLerpPoint]);//pawnShipArray[i].position);
			this.pawnShipArray[i].targetDirection.normalize();
			//bossShipMesh.add(pawnShipArray[i]);
		}
		
		this.mainShip = this.bossShipMesh;
		this.waveReady = true;
	};

	
	this.run = function()
	{
			
		// Set triangle's X and Y positions
		if(this.bossShipMesh)
			this.mainShip.translateX(this.enemyShipSpeed);
		
		// Check if triangle is past the border
		if(this.mainShip.position.x > this.xMax || this.mainShip.position.x < this.xMin )	
		{
				this.enemyShipSpeed *= -1;
				this.mainShip.translateX(this.enemyShipSpeed);
		}
		
		// update diamond points
		this.updateDiamondPointPositions();
		
		// update test box positions
		this.updateTestBoxPostions();
			
		// update  movement for pawnShips
		for(var i = 0; i < 4; i++)
		{
			this.pawnShipArray[i].targetDirection.subVectors(this.diamondPoints[this.pawnShipArray[i].destLerpPoint],  this.pawnShipArray[i].position);
			this.pawnShipArray[i].targetDirection.normalize();	
				
			this.pawnShipArray[i].translateX(this.enemyShipSpeed);
			this.pawnShipArray[i].translateOnAxis(this.pawnShipArray[i].targetDirection, 2);
			
		}
		
		// test the distance to the diamond points with the first pawnShip
		var len = this.diamondPoints[this.pawnShipArray[0].destLerpPoint].distanceTo(this.pawnShipArray[0].position);
		len = Math.sqrt(Math.sqrt(len));
		if(len < 1.2)
		{
			for(var i = 0; i < 4; i++)
			{
				this.targetNextLerpPoint(this.pawnShipArray[i]);
			}
		}
		
		// shoot projectiles
		this.shootTimer += deltaTime;
		if(this.shootTimer >= 1.6)
		{
			var randomNumber = Math.floor(Math.random() * this.shipArray.length);
			var shootingShip = 	this.shipArray[randomNumber];
			var globalPos = new THREE.Vector3();
			globalPos.setFromMatrixPosition( shootingShip.matrixWorld );
			_Ship.prototype.enemyProjectile(globalPos.x, globalPos.y - 20, this.projectileMaterial);
			this.shootTimer = 0;
		}
		
		this.moveProjectiles(this);
			
	};
	

	// the diamond point positions should update each frame as the mainship moves, redefining the position
	// where the corners of the diamond path should be
	this.updateDiamondPointPositions = function()
	{
		this.diamondPoints[0].setX(this.bossShipMesh.position.x+ 150);
		this.diamondPoints[1].setX(this.bossShipMesh.position.x);
		this.diamondPoints[2].setX(this.bossShipMesh.position.x - 150);
		this.diamondPoints[3].setX(this.bossShipMesh.position.x);

	};
	
	// the test boxes aren't currently in the scene, but I was using it to visually see where the 
	// diamond corner points were
	this.updateTestBoxPostions = function()
	{
		this.testBox0.position.copy(this.diamondPoints[0]);
		this.testBox1.position.copy(this.diamondPoints[1]);
		this.testBox2.position.copy(this.diamondPoints[2]);
		this.testBox3.position.copy(this.diamondPoints[3]);

	};

	// when the ship reaches the diamond corner, set it's next destination
	// point to the next diamondPoint in the array
	this.targetNextLerpPoint = function(ship)
	{
		ship.sourceLerpPoint = ship.destLerpPoint;
		ship.destLerpPoint = (ship.destLerpPoint + 1) % 4;

	};

	// clean up after one's self
	this.cleanup = function()
	{
		scene.remove(this.bossShipMesh);
		scene.remove(this.pawnShipArray[0] );
		scene.remove(this.pawnShipArray[1] );
		scene.remove(this.pawnShipArray[2] );
		scene.remove(this.pawnShipArray[3] );
		
		// set ship meshes to null for garbage collection
		this.bossShipMesh = null;
		for(var i = 0; i < this.pawnShipArray.length; i++)
		{
			this.pawnShipArray[i] = null;
		}
		
		// remove projectiles from scene
		for(var i = 0; i < enemyProject.length; i++)
		{
			scene.remove(enemyProject[i]);
		}
		enemyProject = [];
		enemyProjectCount = 0;
		
		
	}

}

diamondFormation.prototype = new enemyWave();
diamondFormation.prototype.constructor = diamondFormation;



