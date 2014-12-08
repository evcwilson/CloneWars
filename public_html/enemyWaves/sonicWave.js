var sonicWaveAttackTexture = new THREE.ImageUtils.loadTexture("Sprites/sonicWaveAttack.png");



function sonicWave1()
{
	enemyWave.call(this);
	this.runPattern = false;
	this.patternTimer = 0;
	
	this.sonic;
	
	this.attackMesh;
	var count = 0;
	this.init = function()
	{
		
		var xPos = -200;
		for(var i = 0; i < 3; i++)
		{
			this.shipArray[i] = new enemyShip( { shipRank: scorpion, shield: true } );
			this.numShips++;
			scene.add(this.shipArray[i].mesh);
			this.shipArray[i].mesh.position.set( xPos, 225, 1);
			
			var dir = new pattern();
			dir.push_back( {dest: this.shipArray[i].mesh.position, speed: 2} );
			this.shipArray[i].pushPattern(dir, "0");
			
			this.shipArray[i].mesh.position.y += 200;
			xPos += 200;
		}
		
		
		var dir = new pattern();
		dir.push_back( { dest: new THREE.Vector3(-100, 175, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3(-200,  50, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3(-150,   0, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3(-200, 225, 1), speed: 2 } );
		this.shipArray[0].pushPattern( dir, "1", function(ship) 
												{	if(ship.timer == 5)
														ship.shield.deactivate();
													if(ship.timer % 125 == 0) 
														randomShoot(ship); 
													if(ship.timer == 240)
														ship.shield.activate();
												});
		
		var dir = new pattern();
		dir.push_back( { dest: new THREE.Vector3(  75, 175, 1), speed: 1 } );
		dir.push_back( { dest: new THREE.Vector3(  75, 125, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3( -75,  75, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3( -75,  25, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3(   0, -25, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3(   0, 225, 1), speed: 2 } );
		this.shipArray[1].pushPattern( dir, "1", function(ship) 
												{
													if(ship.timer == 5)
														ship.shield.deactivate();
													if(ship.timer % 160 == 0) 
														randomShoot(ship);   
													if(ship.timer == 330)
														ship.shield.activate();	
												});
		
		
		var dir = new pattern();
		dir.push_back( { dest: new THREE.Vector3( 100, 175, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3( 200,  50, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3( 150,   0, 1), speed: 2 } );
		dir.push_back( { dest: new THREE.Vector3( 200, 225, 1), speed: 2 } );
		this.shipArray[2].pushPattern( dir, "1", function(ship) 
												{
													if(ship.timer == 5)
														ship.shield.deactivate();
													if(ship.timer % 205 == 0) 
														randomShoot(ship);
													if(ship.timer == 240)
														ship.shield.activate();
												});
		
		
		
		
		
		
		this.waveReady = true;
		
		
	}
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
				this.runPattern = true;
				for(var i = 0; i < this.shipArray.length; i++)
				{
					this.shipArray[i].movementActive = true;
				}
			}
			if(this.runPattern == true)
			{
				for(var i = 0; i < this.shipArray.length; i++)
				{
					if(this.shipArray[i].updateMovement("1") == false)
					{
						count++;
					}
				}
				if(count == this.shipArray.length)
				{
					this.patternTimer = 0;
					count = 0;
					this.runPattern = false;
				}
			}
			
			
			sonicWave1.prototype.moveProjectiles.call(this);
			
			this.updateShips();
		}
	
	}
	
	
	
	
}




sonicWave1.prototype = new enemyWave();
sonicWave1.prototype.constructor = sonicWave1;