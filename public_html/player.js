/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var playerGeometry; 
var playerMaterial; 
var playerMesh; 
var playerImage,
    playerHealth = 3,
    speed = 2.5,
    powerup = false; 
var attackType = "projectile";
var sonicWaveWarmupMesh;
	
var resetPlayerHealthNum = 3;	

var projGeo,
    projMaterial,
    projectile,
    projPresent = false;
	
var projVelocity = new THREE.Vector3(0, 9, 1);
    
var enemyProjectGeo,
    enemyHealth, 
    enemyProjectMaterial,
    enemyProject = [],
    enemyProjectCount=0; 
	
//var enemyProjectLimit = 3;
var enemyProjectLimit = 15;

var projectileTexture = new THREE.ImageUtils.loadTexture('Sprites/player_Projectile.gif');
var enemyProjectileSprite = new THREE.ImageUtils.loadTexture("Sprites/enemy_Projectile.gif");
var enemyProjectileMaterial = new THREE.MeshBasicMaterial( {map: enemyProjectileSprite, transparent: true, side:THREE.DoubleSide });
var sonicWaveWarmupTexture = new THREE.ImageUtils.loadTexture("Sprites/sonicWaveAttack.png");

sonicWaveWarmupTexture.wrapS = THREE.RepeatWrapping;
sonicWaveWarmupTexture.wrapT = THREE.RepeatWrapping;
sonicWaveWarmupTexture.repeat.set( 1, 1 );
var playerAttacks = [];

var rapidFire = false;
var rapidFireLimit = 4;
function _Ship(id){
    return this; 
}

function initPlayer(){
    
var player = [50,50];
var playerTexture = new THREE.ImageUtils.loadTexture('Sprites/player_ship.gif');
playerMesh = _Ship.prototype.makeShipSprite(player, new THREE.MeshBasicMaterial({transparent: true, map: playerTexture, alphaTest: 0.5}));
playerMesh.position.set(0,-250,-10000);
//scene.add(playerMesh);
   
}

//Updates player movement with each game loop
function playerUpdate(){
	if (keyPressedRight){ playerMesh.position.x+=speed;}
    else if (keyPressedLeft) { playerMesh.position.x-=speed;}
	
    //Prevents passing the left border
    if(playerMesh.position.x < -220){playerMesh.position.x += speed}
    //Prevents passing the right border
    else if (playerMesh.position.x > 220){playerMesh.position.x -=speed}
     
    if(keyPressedSpace &&( projPresent == false || rapidFire == true) )//powerup == true))
	{
		var pTexture;
		var size = playerAttacks.length;
		switch(attackType)
		{
			
			case "projectile":
				if(size < rapidFireLimit)
				{
					playerAttacks[size] = new playerProjectile( playerMesh.position.x,playerMesh.position.y + 10);
					PlayerFire();
				}
				break;
			case "blackHole":
				// do awesome stuff here
				break;
			case "sonicWave":
				removeSonicWaveWarmup();
				playerAttacks[size] = new playerSonicWave( playerMesh.position.x,playerMesh.position.y + 10);
				attackType = "projectile";
				break;
				
				
		
		}
        projPresent = true; 
        //PlayerFire();
        //_Ship.prototype.playerProjectile(playerMesh.position.x,
        //playerMesh.position.y + 10, new THREE.MeshBasicMaterial({color:'white'}));
		keyPressedSpace = false;
    }
	
    
	sonicWaveWarmupTexture.offset.y += -0.01;
}

_Ship.prototype ={
    
    //Creates a ship that can use a sprite for a material
    makeShipSprite: function(array, material){
      geometry = new THREE.PlaneGeometry(array[0],array[1],32);
      var plane = new THREE.Mesh(geometry, material);
      return plane; 
    },
    //Creates A new Ship with a basic triangle
    //Mesh is added from the function call, for use of different sprites. 
    makeShip: function(array , material){
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(array[0], array[1], array[3]),
                            new THREE.Vector3(array[3], array[4], array[5]),
                            new THREE.Vector3(array[6], array[7], array[8])
                                    );
    geometry.faces.push(new THREE.Face3(0,1,2));
    
    Mesh = new THREE.Mesh(geometry, material);
    return Mesh; 
    },
    //does an action when the health drops
    //Function used when collisions and projectiles are inplace. 
    health: function(health, damage, Xship){
        health -= damage; 

        if (health <= 0){
            _Ship.prototype.destoryShip(Xship);
        }
        
        return health; 
    },
    //Removes ship from scene after it destroyed, Maybe we can replace it with an animation and then destroy it
    destoryShip: function(ship){
       scene.remove(ship);
    },
    
   playerProjectile: function(x,y,mat){
       
       projGeo = new THREE.CircleGeometry(5,32);
       
       projectile = new THREE.Mesh(projGeo, mat);
       projectile.position.set(x, y, 1);
       scene.add(projectile);
    },
    //Checks for collisions with the enemy ship. 
    checkEnemyCollision: function(game){
        if (enemyProjectCount > 0)
        {
            for(var x = 0; x < enemyProjectCount; x++)
            {
                if(Math.abs(playerMesh.position.y - enemyProject[x].position.y) < 20
                    && Math.abs(playerMesh.position.x - enemyProject[x].position.x) < 35)
                                {
                                    //Subtracts the damage of the ship                                    
                                   playerHealth = _Ship.prototype.health(playerHealth, 1, playerMesh);
                                    //Removes the Enemy Projectile from the screen
                                    scene.remove(enemyProject[x]);
                                    enemyProjectCount--; 
                                    enemyProject.splice(x,1);
                                    hud.removePlayerLife();
									attackType = "projectile";
                                }
            }
        }
		
		if( game.levels[game.currentLevel].checkLaser() == true)
		{
			playerHealth = _Ship.prototype.health(playerHealth, 1, playerMesh);
			hud.removePlayerLife();
		}
		
		
		if(game.pickups.length >= 0)
		{
			
			var size = game.pickups.length;
			for(var i = 0; i < game.pickups.length; i++)
			{
				if(Math.abs(playerMesh.position.x - game.pickups[i].mesh.position.x) < 40 && Math.abs(playerMesh.position.y - game.pickups[i].mesh.position.y) < 40 )
				{
					switch(game.pickups[i].constructor.name)
					{
						case "healthPickup":
						{
							if(playerHealth < resetPlayerHealthNum)
							{
								playerHealth++;
								hud.addPlayerLife();
								game.removePickup(game.pickups[i], i);
								break;
							}
							break;
						}
						case "rapidFirePickup":
							attackType = "projectile";// = true;
							rapidFire = true;
							game.removePickup(game.pickups[i], i);
							break;
							
						case "sonicWavePickup":
							if(attackType != "sonicWave") 	// to make sure we don't add two sonic wave warmup meshes
							{
								attackType = "sonicWave";
								rapidFire = false;
								createSonicWaveWarmup();
								game.removePickup(game.pickups[i], i);
								break;
							}
					}
				}
			}
		}
    },
    //Creates the enemy projectile
    enemyProjectile: function(x,y,mat){
      
      if (enemyProjectCount <= enemyProjectLimit )
	  {
       enemyProjectGeo = new THREE.PlaneGeometry(25,25, 32);
       enemyProject[enemyProjectCount] = new THREE.Mesh(enemyProjectGeo, enemyProjectileMaterial);
       enemyProject[enemyProjectCount].position.set(x, y-15, 1);
       scene.add(enemyProject[enemyProjectCount]);
	   		EnemyFire2();
       enemyProjectCount++; 
       }
    }, 
    //Moves the enemy projectile across the screen. 
    moveEneProjectile: function(i){
        
        enemyProject[i].position.y -=3.2; 
        if (enemyProject[i].position.y < -285){
            scene.remove(enemyProject[i]);
            enemyProjectCount--;
            enemyProject.splice(i,1);
        }
        
    },
    //Moves player Projectile. 
    moveProjectile: function(){
		if(playerAttacks.length > 0)
		{
			for(var i = 0; i < playerAttacks.length; i++)
			{
				playerAttacks[i].update();//mesh.position.add(playerAttacks[i].velocity);//projVelocity); //projectile.position.y += 9;
				if(playerAttacks[i].checkOffScreen() == true)
				{
					scene.remove(playerAttacks[i].mesh);
					playerAttacks.splice(i, 1);
					_Ship.prototype.resetProjVelocity();
				}
			} 
		} 
		else 
			projPresent = false;
    },
	
	removeProjectile: function(proj, i) {
		scene.remove(proj.mesh);
		playerAttacks.splice(i, 1);

	},
	
	resetPlayerScore: function()
	{
		// resets the health back to the default resetPlayerHealthNum, 
		// since playerHealth decreases after every damage
		playerHealth = resetPlayerHealthNum;
	},
	
	setProjVelocity: function(v)
	{
		projVelocity.copy(v);
	},
	
	resetProjVelocity: function()
	{
		projVelocity.set(0,9,0);
	},
	
	resetPlayer: function()
	{
		attackType = "projectile";//false;
		rapidFire = false;
		removeSonicWaveWarmup();
	},
       
};

function playerProjectile(x,y)
{
	this.mesh = new THREE.Mesh( new THREE.PlaneGeometry(19,22), new THREE.MeshBasicMaterial( {transparent: true, map: projectileTexture, alphaTest: 0.5}) );
	this.velocity = new THREE.Vector3(0,9,0);
	scene.add(this.mesh);
	this.mesh.position.set(x,y,1);
	
	this.setVelocity = function(v)
	{
		this.velocity.copy(v);
	}
	
	this.rotateZ = function(rotationAmount)
	{
		this.mesh.rotation.z = rotationAmount;
	}
	
	this.update = function()
	{
		this.mesh.position.add(this.velocity);
	}
	
	this.checkOffScreen = function()
	{
		if ( this.mesh.position.y  > 285 ||  this.mesh.position.y < -285 ||  this.mesh.position.x > 255 ||  this.mesh.position.x < -255  )
		{
			return true;
		}
	}
	
	this.checkCollision = function(ship)
	{
		if(Math.abs(ship.mesh.position.y - this.mesh.position.y) < 20
			&& Math.abs(ship.mesh.position.x - this.mesh.position.x) < 20) 
		{
			return true;
		}
	}
	return this;
}

function blackHole(x,y)
{
	this.mesh = new THREE.Mesh( new THREE.CircleGeometry(10,32), new THREE.MeshBasicMaterial({ color: "black"} ));
	this.velocity = new THREE.Vector3(0,9,0);
	scene.add(this.mesh);
	this.mesh.position.set(x,y,1);
	this.setVelocity = function(v)			// DO NOT DELETE!
	{
		
	}
	this.rotateZ = function(rotationAmount)
	{
		
	}
	this.addBlackHoleLines = function()
	{
		SUBDIVISIONS = 20;
		geometry = new THREE.Geometry();
		curve = new THREE.QuadraticBezierCurve3();
		curve.v0 = new THREE.Vector3(0, 0, 0);
		curve.v1 = new THREE.Vector3(-25, 25, 0);
		curve.v2 = new THREE.Vector3(-7.5, 50, 0);
		for (j = 0; j < SUBDIVISIONS; j++) 
		{
			geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}
		material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		line = new THREE.Line(geometry, material);

		this.mesh.add(line);
		
		geometry = new THREE.Geometry();
		curve.v0 = new THREE.Vector3(0, 0, 0);
		curve.v1 = new THREE.Vector3(25, 25, 0);
		curve.v2 = new THREE.Vector3(50, 7.5, 0);
		for (j = 0; j < SUBDIVISIONS; j++) 
		{
			geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}
		line2 = new THREE.Line(geometry, material);
		this.mesh.add(line2);
		
		geometry = new THREE.Geometry();
		curve.v0 = new THREE.Vector3(0, 0, 0);
		curve.v1 = new THREE.Vector3(25, -25, 0);
		curve.v2 = new THREE.Vector3(-7.5, -50, 0);
		for (j = 0; j < SUBDIVISIONS; j++) 
		{
			geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}
		line3 = new THREE.Line(geometry, material);
		this.mesh.add(line3);
		
		geometry = new THREE.Geometry();
		curve.v0 = new THREE.Vector3(0, 0, 0);
		curve.v1 = new THREE.Vector3(-25, -25, 0);
		curve.v2 = new THREE.Vector3(-50, -7.5, 0);
		for (j = 0; j < SUBDIVISIONS; j++) 
		{
			geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}
		line4 = new THREE.Line(geometry, material);
		this.mesh.add(line4);
	}
	this.checkOffScreen = function()
	{
		this.mesh.geometry.computeBoundingBox();
		var bbY = this.mesh.geometry.boundingBox.max.y / 2;
		if(this.mesh.position.y - bbY > 285)
		{
			return true;
		}
	
	}
	this.checkCollision = function(ship)
	{
		if(Math.abs(ship.mesh.position.y - this.mesh.position.y) < 20
			&& Math.abs(ship.mesh.position.x - this.mesh.position.x) < 20) 
		{
			console.log("Not yet defined!!");
		}
	}
	return this;
}

function playerSonicWave(x,y)
{
	this.velocity = new THREE.Vector3(0,3,0);
	this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(64,64), new THREE.MeshBasicMaterial( { map: sonicWaveAttackTexture, side : THREE.DoubleSide, transparent: true }) );
	scene.add(this.mesh);
	this.mesh.position.copy(playerMesh.position);
	this.mesh.position.y += 40;
	this.mesh.geometry.dynamic = true;

	this.shooting = false;
	
	// play sounds
	swShoot();
	swTravel();
	this.setVelocity = function(v)			// DO NOT DELETE!
	{
		
	}
	this.rotateZ = function(rotationAmount)
	{
		
	}
	this.update = function()
	{
		this.mesh.position.y += 3;
		for(var i = 0; i < this.mesh.geometry.vertices.length; i++)
		{
			if(this.mesh.geometry.vertices[i].x > 0)
				this.mesh.geometry.vertices[i].x += 0.426;
			else
				this.mesh.geometry.vertices[i].x -= 0.426;
			
			if(this.mesh.geometry.vertices[i].y > 0)
				this.mesh.geometry.vertices[i].y += 0.426;
			else
				this.mesh.geometry.vertices[i].y -= 0.426;
		}
		this.mesh.geometry.verticesNeedUpdate = true;
		
	}
	
	this.checkOffScreen = function()
	{
		this.mesh.geometry.computeBoundingBox();
		var bbY = this.mesh.geometry.boundingBox.max.y / 2;
		if(this.mesh.position.y - bbY > 285)
		{
			return true;
		}
	
	}
	
	this.checkCollision = function(ship)
	{
		this.mesh.geometry.computeBoundingBox();
		var bbY = this.mesh.geometry.boundingBox.max.y;
		var bbX = this.mesh.geometry.boundingBox.max.x;
		if(ship.mesh.position.x - 25 < this.mesh.position.x + bbX &&
			ship.mesh.position.x + 25 > this.mesh.position.x - bbX && 
				ship.mesh.position.y - 25 < this.mesh.position.y + bbY &&
					ship.mesh.position.y + 25 > this.mesh.position.y - bbY)
		{
			return true;
		}
	}
	return this;

}

function createSonicWaveWarmup()
{
	sonicWaveWarmupMesh = new THREE.Mesh(new THREE.SphereGeometry(18,18), new THREE.MeshBasicMaterial( { map: sonicWaveWarmupTexture, side : THREE.DoubleSide, transparent: true }) );
	sonicWaveWarmupMesh.lookAt( new THREE.Vector3(0, 500, 0) );
	sonicWaveWarmupMesh.rotation.x = 90 * Math.PI/180;
	sonicWaveWarmupMesh.rotation.y = -90 * Math.PI/180;
	playerMesh.add(sonicWaveWarmupMesh)
	sonicWaveWarmupMesh.position.y += 40;
	swWarmup();
}

function removeSonicWaveWarmup()
{
	playerMesh.remove(sonicWaveWarmupMesh)
	sonicWaveWarmupMesh = null;
}