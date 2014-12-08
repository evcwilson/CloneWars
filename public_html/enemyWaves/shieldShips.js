var dotResult;
var hit;
function shieldShips()
{
	enemyWave.call(this);
	
	var shieldR = new THREE.Vector3(30, 0, 1);
	var shieldR2 = new THREE.Vector3(60, -30, 1);
	
	
	var shieldC = new THREE.Vector3(0, -30, 1);
	var shieldL = new THREE.Vector3(-30, 0, 1);
	var shieldL2 = new THREE.Vector3(-60, 0, 1);
	var respectiveProjectilePosition = new THREE.Vector3();
	
	var basePositionsPawn = [
							new THREE.Vector3(-100, 225, 1),
							new THREE.Vector3( 100, 225, 1),
							new THREE.Vector3( -30, 150, 1),
							new THREE.Vector3(  30, 150, 1),
						];
	var basePositionsCenturion = [
									new THREE.Vector3( -30, 225, 1),
									new THREE.Vector3(  30, 225, 1),
								 ];
								 
	var moving = false;
	var laserAttack = false;
	var laserOn = false;
	this.laserTimer = 0;
	
	var shipTwoXSpeed = -1;
	var shipThreeXSpeed = 1;
	
	this.patternTimer = 0;
	
	var hit = false;
	var maxSpawnTime = 30;
	var spawnTimer = maxSpawnTime;
	
	
	var count = 0;
	this.numPawnShips = 0;
	this.init = function()
	{
		for(var i = 0; i < 4; i++)
		{
			this.shipArray[i] = new enemyShip( { shipRank: pawn, shield: true, damageAmount: 1});
			this.numShips++;
			scene.add(this.shipArray[i].mesh);
			this.shipArray[i].mesh.position.copy(basePositionsPawn[i]);
						
		}
		
		for(var i = 4; i < 6; i++)
		{
			this.shipArray[i] = new enemyShip( { shipRank: centurion, laser: true, damageAmount: 1  });
			this.numShips++;
			scene.add(this.shipArray[i].mesh);
			this.shipArray[i].mesh.position.copy(basePositionsCenturion[i-4]);
		}
		
		for(var i = 0; i < this.shipArray.length; i++)
		{
			this.shipArray[i].mesh.position.y += 200;
			var dir = new pattern();
			if(i < 4)
			dir.push_back( {dest: basePositionsPawn[i], speed: 2} );
			else
			dir.push_back( {dest: basePositionsCenturion[i-4], speed: 2} );
			this.shipArray[i].pushPattern(dir, "0");
		}
		
		
		var dir = new pattern();
		dir.push_back({ dest: new THREE.Vector3(-200, 125, 1),speed: 1} ); 
		dir.push_back({ dest: new THREE.Vector3(-200,  75, 1),speed: 1} ); 
		dir.push_back({ dest: new THREE.Vector3(-200,  25, 1),speed: 1} ); 
		dir.push_back({ dest: new THREE.Vector3(-100, -25, 1),speed: 1.33} ); 
		dir.push_back({ dest: new THREE.Vector3(-100, 225, 1),speed: 2} ); 
		this.shipArray[0].pushPattern( dir, "1", function(ship){ 
																if(ship.timer == 100) 
																	ship.shield.deactivate(); 
																	
																if(ship.timer == 101)
																	randomShoot(ship);  
																if(ship.timer == 450) 
																	ship.shield.activate(); 
																
																} );
		
		dir = new pattern()
		dir.push_back({ dest: new THREE.Vector3(-200, 225, 1),speed: 0.25} ); 
		dir.push_back({ dest: new THREE.Vector3(-100, 225, 1),speed: 0.25} ); 
		this.shipArray[0].pushPattern( dir, "2" );
		
		var dir = new pattern();
		dir.push_back({ dest: new THREE.Vector3(200, 125, 1),speed: 1} ); 
		dir.push_back({ dest: new THREE.Vector3(200,  75, 1),speed: 1} ); 
		dir.push_back({ dest: new THREE.Vector3(200,  25, 1),speed: 1} ); 
		dir.push_back({ dest: new THREE.Vector3(100, -25, 1),speed: 1.33} ); 
		dir.push_back({ dest: new THREE.Vector3(100, 225, 1),speed: 2} ); 
		this.shipArray[1].pushPattern( dir, "1", function(ship){ 
																if(ship.timer == 100) 
																	ship.shield.deactivate(); 
																	
																if(ship.timer == 101)
																	randomShoot(ship);  
																	
																if(ship.timer == 225)
																	randomShoot(ship);
																if(ship.timer == 450) 
																	ship.shield.activate(); 
																
																});
		
		dir = new pattern()
		dir.push_back({ dest: new THREE.Vector3(200, 225, 1),speed: 0.25} ); 
		dir.push_back({ dest: new THREE.Vector3(100, 225, 1),speed: 0.25} ); 
		this.shipArray[1].pushPattern( dir, "2"  );
		
		var dir = new pattern();
		dir.push_back({ dest: new THREE.Vector3( -30, 125, 1),speed: 0.17});
		dir.push_back({ dest: new THREE.Vector3( -30,  75, 1),speed: 1   });
		dir.push_back({ dest: new THREE.Vector3(-100,  25, 1),speed: 1.68});
		dir.push_back({ dest: new THREE.Vector3( -30, -25, 1),speed: 1   });
		dir.push_back({ dest: new THREE.Vector3( -30, 150, 1),speed: 2});
		this.shipArray[2].pushPattern( dir, "1", function(ship){ if(ship.timer == 100) 
																	ship.shield.deactivate(); 
																if(ship.timer == 225)
																	randomShoot(ship) 
																if(ship.timer == 400) 
																	ship.shield.activate(); 
																} );
		
		dir = new pattern()
		dir.push_back({ dest: new THREE.Vector3(-180, 150, 1),speed: 0.375} ); 
		dir.push_back({ dest: new THREE.Vector3( -30, 150, 1),speed: 0.375} ); 
		this.shipArray[2].pushPattern( dir, "2" );
		
		var dir = new pattern();
		dir.push_back({ dest: new THREE.Vector3( 30, 125, 1),speed: 0.17});
		dir.push_back({ dest: new THREE.Vector3( 30,  75, 1),speed: 1});
		dir.push_back({ dest: new THREE.Vector3(100,  25, 1),speed: 1.68});
		dir.push_back({ dest: new THREE.Vector3( 30, -25, 1),speed: 1});
		dir.push_back({ dest: new THREE.Vector3( 30, 150, 1),speed: 2});
		this.shipArray[3].pushPattern( dir, "1", function(ship){ if(ship.timer == 100) 
																	ship.shield.deactivate(); 
																if(ship.timer == 225)
																	randomShoot(ship) 
																if(ship.timer == 400) 
																	ship.shield.activate(); 
																
																} );
		
		dir = new pattern()
		dir.push_back({ dest: new THREE.Vector3(180, 150, 1),speed: 0.375} ); 
		dir.push_back({ dest: new THREE.Vector3( 30, 150, 1),speed: 0.375} ); 
		this.shipArray[3].pushPattern( dir, "2" );
		
		
		
	};
	
	this.run = function()
	{
		
		if(this.waveReady != true)
		{
			for(var ship of this.shipArray)
			{
				if(ship.updateMovement("0") == false)
				{
					count++;
				}
			}
			
			if(count == this.shipArray.length)
			{
				this.waveReady = true;
				ship.movementActive = false;
				count = 0;
			}
		
		}
		else
		{
			this.patternTimer++;
			if(this.patternTimer == 60)
			{
			
				
				var randomNum = Math.floor(Math.random() * 5)
				console.log(randomNum);
				if(randomNum < 2)
				{
					var laserShipExists = false;
					for(var ship of this.shipArray)
					{
						if(ship.laserBeam != null)			// before turning on laser attack, make sure there is a laser-shooting ship alive
							laserShipExists = true;
					}
					
					if(laserShipExists == true)
						laserAttack = true;
					else
						moving = true;
				}
				else				
					moving = true;
				
				for(var ship of this.shipArray)
				{
					ship.movementActive = true;
				}
				//keyPressedEnter = false;
			}
			
			
			if(moving == true)
			{
				
				for(var ship of this.shipArray)
				{
					if(ship.updateMovement("1") == false)
					{
						ship.movementActive = false;
						count++;
					}
				}
				if(count == this.numPawnShips)
				{
					for(var ship of this.shipArray)
					{
					}
					moving = false;
					this.patternTimer = 0;
					count = 0;
				}
			}
			if(laserAttack == true)
			{
				this.laserTimer ++;	
				for(var ship of this.shipArray)
				{
					if( ship.updateMovement("2") == false)
						ship.movementActive = false;
				}
				if(this.laserTimer == 200)
				{
					laserWarmup();
					laserShoot();			// play laser sounds
				}
				if(this.laserTimer > 200 && this.laserTimer <= 550)
				{
					
					for(var ship of this.shipArray)
					{
						if(ship.laserBeam != null)
							ship.laserBeam.run();
							
					}
				}
				
				if(this.laserTimer >= 800)
				{
					this.laserTimer = 0;
					laserAttack = false;
					for(var ship of this.shipArray)
					{
						if(ship.shield != null)
							ship.shield.activate();
							this.patternTimer = 0;
						//ship.movementActive = true;
					}
				}
				
				
				
			}
		}
		
		if(hit == true)
		{
			spawnTimer -= 0.1;
			if(spawnTimer <= 0)
			{
				spawnTimer = maxSpawnTime;
				hit = false;
			}
		}
		
		// update number of pawn ships
		var num = 0;
		for(var ship of this.shipArray)
		{
			if(ship.rank == pawn)
				num++;
		}
		this.numPawnShips = num;
		
		shieldShips.prototype.moveProjectiles.call(this);
		shieldShips.prototype.updateShips.call(this);
	};
	
	
	this.checkLaser = function()
	{
		for(var ship of this.shipArray)
		{
			if(ship.laserBeam != null)
			{
				var beamWidth = ship.laserBeam.getBeamWidth();
				var distanceFromBeam = (Math.abs(playerMesh.position.x) - 25) - (ship.mesh.position.x + beamWidth);
				var beamSidePositionL = ship.mesh.position.x - Math.abs(ship.laserBeam.mesh.geometry.vertices[1].x);
				var beamSidePositionR = ship.mesh.position.x + Math.abs(ship.laserBeam.mesh.geometry.vertices[2].x);
				
				var isInBeam = false;
				if(playerMesh.position.x + 25 > beamSidePositionL &&  playerMesh.position.x - 25  < beamSidePositionR)
					isInBeam = true;
				
				if(ship.laserBeam.active == true && this.laserTimer < 550 && spawnTimer == maxSpawnTime && isInBeam)//&& distanceFromBeam < 0)
				{
				//	console.log(playerMesh.position.x)
					hit = true;
					return true;
				}
			}
		}
	}
	
	
	
	
	this.exit = function()
	{

	};
	
	
}

function randomShoot(ship) 
{
	
		this.projectileMaterial = new THREE.MeshBasicMaterial( { color: "green", side : THREE.DoubleSide } );
		var globalPos = new THREE.Vector3();
		globalPos.setFromMatrixPosition( ship.mesh.matrixWorld );
		_Ship.prototype.enemyProjectile(globalPos.x, globalPos.y - 20, this.projectileMaterial);
		this.shootTimer = 0;
	
}





shieldShips.prototype = new enemyWave();
shieldShips.prototype.constructor = shieldShips;