// enemyShip.js
/*
	enemyShip

	enemyShip is the base class for all enemy ships. When creating a new enemy ship, several properties can overwrite 
	the	default shipType's properties: 
	
	shipRank - type of ship
	damageAmount - how much health is taken away each hit
	shield - if ship has shield or not
	
	Create new ship like this:
	var ship = new enemyShip( {
								shipRank	 = pawn, 					// shipRank is REQUIRED
								damageAmount = 3,
								shield		 = true,
							  } );
*/



var pawnShipSprite = new THREE.ImageUtils.loadTexture("Sprites/EnemyShip1.gif");
var centurionShipSprite = new THREE.ImageUtils.loadTexture("Sprites/EnemyShip2.gif");
var scorpionShipSprite = new THREE.ImageUtils.loadTexture("Sprites/EnemyShip3.gif");
//function enemyShip(shipRank, shield)
function enemyShip(properties)
{
	// health bar geometry and material stuff
	var healthBarGeometry = [	
			new THREE.PlaneGeometry(0, 	10),
			new THREE.PlaneGeometry(5, 10),
			new THREE.PlaneGeometry(10, 10), 
			new THREE.PlaneGeometry(15, 10), 
			new THREE.PlaneGeometry(20, 10), 
			new THREE.PlaneGeometry(25, 10), 
			new THREE.PlaneGeometry(30, 10), 
			new THREE.PlaneGeometry(35, 10), 
			new THREE.PlaneGeometry(40, 10), 
			new THREE.PlaneGeometry(45, 10), 
			new THREE.PlaneGeometry(50, 10), 
		];
	
	
	this.health = -1;				// -1 by default
	this.healthBar;					// will be a mesh created later on
	this.healthBarColor;
	this.healthBarMaterial;
	this.healthBarPosition = new THREE.Vector3(0, 25, 0.1);
	this.damageAmount;				// will be set according to ship type
	this.killPoints;					// will be set according to ship type

	this.mesh = null;				// will be created based on ship type
	this.shield = null;
	this.laserBeam = null;
	this.rank;						// to keep track of what type of ship this is
	
	// array of all available ship ranks to use
	var shipRanks = [pawn, centurion, scorpion];
	
	// loop through shipRanks array to see if the passed-in ship type matches one in this class
	for(var i = 0; i < shipRanks.length; i++)
	{
		if(properties.shipRank.name.toString() == shipRanks[i].name.toString() )		// if shipRank passed to function exists in shipRanks array...
		{
			// create a temp ship and copy its variables to this
			var ship = new shipRanks[i]();
			this.rank = properties.shipRank;	
			this.health = ship.health;
			this.healthBarColor = ship.healthBarColor;
			this.killPoints = ship.killPoints;
			this.damageAmount = ship.damageAmount;
			this.mesh = new THREE.Mesh(ship.geometry, ship.material);//ship.createMesh();
		}
	}
	
	// overwrite any default settings
	if(properties.health)
		this.health = properties.health;
	if(properties.damageAmount)
		this.damageAmount = properties.damageAmount;
	if(properties.shield == true)
	{
		this.shield = new shieldObject();
		this.mesh.add(this.shield.line);
	}
	if(properties.laser == true)
	{
		this.laserBeam = new beam();
		this.mesh.add(this.laserBeam.mesh);
		this.laserBeam.mesh.position.setY(-25);
	}
	
	// adding health bar 
	this.healthBarMaterial = new THREE.MeshBasicMaterial( {color: this.healthBarColor, side: THREE.DoubleSide, transparent: true, opacity: 0 } );
	this.healthBar = new THREE.Mesh(healthBarGeometry[this.health], this.healthBarMaterial);			// create health bar for this ship	
	//scene.add(this.healthBar);																	// add it to scene
	this.healthBar.position.copy(this.healthBarPosition);
	//this.healthBar.material.opacity = 0;
	this.mesh.add(this.healthBar);
	
	this.patterns = [];
	this.patternIndex = 0;
	var patternStep = 0;
	this.pushPattern = function(p, name, func)
	{
		var size = this.patterns.length;
		this.patterns[size] = p;
		this.patterns[size].name = name;
		this.patterns[size].func = func;
	}
	
	this.dirIndex = 0;
	this.movementActive = true;
	this.timer = 0;
	this.updateMovement = function(name)
	{
		
		for(var p of this.patterns)
		{
			if(p.name == name)
			{
				if(this.movementActive == true)
				{
					this.timer++;
					var currentPath = p.list[this.dirIndex];
					var dirVector = new THREE.Vector3();
					dirVector.subVectors(currentPath.dest, this.mesh.position);
					dirVector.normalize();
					this.mesh.translateOnAxis(dirVector, currentPath.speed);
					if(p.func)
						p.func(this);
					if(this.mesh.position.distanceTo(currentPath.dest) < 1)
					{
						this.dirIndex = this.dirIndex + 1;
						if(this.dirIndex % p.list.length == 0)
						{
							this.dirIndex = 0;
							this.timer = 0;
							
							//if(this.shield != null)
								//this.shield.activate();
							
							this.movementActive = false;
							return false;
						}
					}
				}
			}
		}
	}
	
	
	this.getPatternIndex = function()
	{
		return this.patternIndex;
	}
	
	
	
	
	this.checkShieldCollision = function(projectile)
	{
		
	
	}
	
	this.getHealth = function()
	{
		return this.health;
	}
	
	this.damage = function()
	{
		var oldHealth = this.health;
		this.health -= this.damageAmount;
		this.hit = true;
		this.healthBar.material.opacity = 1;
		this.healthBarTimer = 500;
		this.healthBarFadeStep = 0;
		// update health bar mesh if health remains
		if(this.health >= 0)			
		{
			// record old position and remove from scene and from parent mesh
			var oldPos = this.healthBar.position;
			scene.remove(this.healthBar);
			this.mesh.remove(this.healthBar);
			
			// create a new healthbar based on new health amount and add it to scene
			this.healthBar = new THREE.Mesh(healthBarGeometry[this.health], this.healthBarMaterial);
			scene.add(this.healthBar);
			
			// offset the position of health bar and add it to the parent mesh
			var newX = oldPos.x - (oldHealth - this.health)*2.5;
			this.healthBarPosition.setX(newX);
			this.healthBar.position.copy(this.healthBarPosition);
			this.mesh.add(this.healthBar);
		}
	}
	
	this.getKillPoints = function()
	{
		return this.killPoints;
	}
	this.hit = false;
	this.healthBarTimer = 500;
	this.healthBarFadeStep = 0;
	this.update = function()
	{
		if(this.hit == true)
		{
			this.healthBarTimer--;
			
			if(this.healthBarTimer == 400)
			{
				//console.log("!!!!!");
				this.healthBarFadeStep = 0.051;
			}
			if(this.healthBarTimer == 200)
			{
				this.healthBarFadeStep = 0.081;
			}
			/*if(this.healthBarTimer == 65)
			{
				this.healthBarFadeStep = 0;
			}*/
			
			this.healthBar.material.opacity -= this.healthBarFadeStep;
			
			
			
			if(this.healthBar.material.opacity == 0)
			{
				this.healthBarTimer = 500;
				this.hit = false;
				this.healthBarFadeStep = 0;
			}
		}
	}
	
	return this;
}



// SHIP TYPES!!
function pawn()
{
	this.health = 10;
	this.healthBarColor = 0xFF7878;
	this.damageAmount = 5;
	this.killPoints = 30;
	this.geometry = geometry = new THREE.PlaneGeometry( 50, 50 );
	this.material = new THREE.MeshBasicMaterial( { map: pawnShipSprite, side : THREE.DoubleSide, transparent: true } );
}

function centurion()
{
	this.health = 10;
	this.healthBarColor = 0xFF7878;
	this.damageAmount = 4;
	this.killPoints = 70;
	this.geometry = new THREE.PlaneGeometry( 50, 50 );
	this.material = new THREE.MeshBasicMaterial( { map: centurionShipSprite, side : THREE.DoubleSide, transparent: true } );
	
}

function scorpion()
{
	this.health = 10;
	this.healthBarColor = 0xFF7878;
	this.damageAmount = 2;
	this.killPoints = 100;
	this.geometry = new THREE.PlaneGeometry(50,50);
	this.material = new THREE.MeshBasicMaterial( { map: scorpionShipSprite, side : THREE.DoubleSide, transparent: true } );

}



function shieldObject()
{
	this.active = true;
	this.line;
	
	setupShieldPoints(this);
	
	this.line.position.setY(-5);
	
	this.checkCollision = function()
	{
		if(this.active == true)
		{
			for(var pAttack of playerAttacks)
			{
				var respectiveProjectilePosition = new THREE.Vector3();
				var dotResult;
				
				this.line.parent.updateMatrixWorld();
				var vector = new THREE.Vector3();
				vector.setFromMatrixPosition( this.line.matrixWorld );
				
				var r = new THREE.Vector3(vector.x + 30, vector.y, 1);
				var c = new THREE.Vector3(vector.x, vector.y - 45, 1);
				var l = new THREE.Vector3(vector.x - 30, vector.y, 1);
				respectiveProjectilePosition.subVectors(pAttack.mesh.position, r)
				
				var wall = new THREE.Vector3(vector.x + 30, vector.y - 45, 1);
				wall.subVectors(c,r);
				wall.normalize();
				var normal = new THREE.Vector3(-wall.y, wall.x);
				normal.normalize();
				dotResult = normal.dot(respectiveProjectilePosition)
				if(pAttack.mesh.position.x >= vector.x && pAttack.mesh.position.x <= (vector.x + 25) 
					&& pAttack.mesh.position.y < vector.y + 25 &&  dotResult < 0)
				{
					pAttack.setVelocity( new THREE.Vector3(4.2426,-4.2426,0));
					//pAttack.mesh.rotation.z = -135 * Math.PI/180;
					pAttack.rotateZ(-135 * Math.PI/180);
				}
				
				var wall = new THREE.Vector3(vector.x - 30, vector.y -45, 1);
				wall.subVectors(c, l);
				wall.normalize();
				var normal = new THREE.Vector3(wall.y, -wall.x);
				normal.normalize();
				dotResult = normal.dot(respectiveProjectilePosition)
				if(pAttack.mesh.position.x < vector.x && pAttack.mesh.position.x >= (vector.x -25) && 
					pAttack.mesh.position.y < vector.y + 25 && dotResult < 45)
				{
					pAttack.setVelocity( new THREE.Vector3(-4.2426,-4.2426,0));
					pAttack.rotateZ(135 * Math.PI/180);
					//pAttack.mesh.rotation.z = 135 * Math.PI/180 ;
				}
			}
		}
	}
	
	this.deactivate = function()
	{
		var op = this.line.material.opacity;
		while(op >= 0){ op -= 0.1 };
		this.line.material.opacity = op;
		this.active = false;
		console.log("DEAC");
	}
	
	this.activate = function()
	{
		var op = this.line.material.opacity;
		while(op <= 1){ op += 0.1 };
		this.line.material.opacity = op;
		this.active = true;
	}
	
	this.toggleShield = function()
	{
		if(this.active == false)
			this.activate();
		else
			this.deactivate();
	}
	
	function setupShieldPoints(obj)
	{
		SUBDIVISIONS = 20;
		geometry = new THREE.Geometry();
		curve = new THREE.QuadraticBezierCurve3();
		curve.v0 = new THREE.Vector3(-30, 0, 1);
		curve.v1 = new THREE.Vector3(0, -45, 1);
		curve.v2 = new THREE.Vector3(30, 0, 1);
		for (j = 0; j < SUBDIVISIONS; j++) 
		{
			geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}
		material = new THREE.LineBasicMaterial( { color: 0x6EA8CF, linewidth: 4, transparent: true, opacity: 1 } );
		
		obj.line = new THREE.Line(geometry, material);
	}
	return this;
}

function beam()
{
	this.active = false;
	this.mesh;
	
	setupBeam(this);
	function setupBeam(obj)
	{
		beamShape = new THREE.Shape();
		beamShape.moveTo( 0,0 );
		beamShape.lineTo( 0, 0 );
		beamShape.lineTo( -5,  -10 );
		beamShape.lineTo( -5,  -11 );
		beamShape.lineTo(  5,  -11 );
		beamShape.lineTo(  5,  -10 );
		beamShape.lineTo(  0,  0 );
		
		beamGeometry = new THREE.ShapeGeometry( beamShape ); 
		beamMaterial = new THREE.MeshBasicMaterial( { color: 0x1d7ada, transparent: true, opacity: 0.0, alphaTest: 0.0 } );

		obj.mesh = new THREE.Mesh( beamGeometry, beamMaterial );		
		
		obj.mesh.geometry.dynamic = true;
	}
	this.timer = 0;
	var num = 1;
	var dir = 1;
	
	this.run = function(wave)
	{
		this.timer += 1;
		switch(this.timer)
		{
			case 1:
				
				break;
			case 50:
				this.setOpacity(0);
				break;
			case 60:
				this.setOpacity(0.8);
				break;
			case 70:
				this.setOpacity(0);
				break;
			case 75:
				this.setOpacity(0.8);
				break;
			case 80:
				this.setOpacity(0);
				break;
			case 85:
				this.setOpacity(0.8);
				break;
			case 350:
				this.setOpacity(0);
				break;
		}
		if(this.timer >= 0 && this.timer <= 50)// && attacking != true)
		{
			this.setOpacity(0.8);
			this.mesh.geometry.vertices[1].y -= 13
			this.mesh.geometry.vertices[2].y -= 13;
			
		}
		if(this.timer > 120 && this.timer < 200 || this.timer >= 250)
		{
			this.active = true;
			this.mesh.geometry.vertices[0].x += num;
			if(this.mesh.geometry.vertices[0].x <= 0) this.mesh.geometry.vertices[0].x += -num;
			
			this.mesh.geometry.vertices[1].x += num;
			if(this.mesh.geometry.vertices[1].x <= 0) this.mesh.geometry.vertices[1].x += -num;
			
			this.mesh.geometry.vertices[2].x -= num;
			if(this.mesh.geometry.vertices[2].x >= 0) this.mesh.geometry.vertices[2].x -= -num;
			
			this.mesh.geometry.vertices[3].x -= num;
			if(this.mesh.geometry.vertices[3].x >= 0) this.mesh.geometry.vertices[3].x -= -num;
			
			this.beamWidth = this.mesh.geometry.vertices[0].x;
			//console.log(this.beamWidth);
			if(this.timer == 250)
			{
				num *= -1;
			}
			if(this.timer == 350)
			{
				num *= -1;
				this.timer = 0;
				this.reset();
				console.log("done");
				
				return false;
			}
		}
		
		this.mesh.geometry.verticesNeedUpdate = true;
		
	}
	this.reset = function()
	{
		this.mesh.geometry.vertices[0].x = 5;
		
		this.mesh.geometry.vertices[1].x = 5;
		this.mesh.geometry.vertices[1].y = -11;
		
		this.mesh.geometry.vertices[2].x = -5;
		this.mesh.geometry.vertices[2].y = -11;
		
		this.mesh.geometry.vertices[3].x = -5;
		this.timer = 0;
		this.active = false;
		//this.beam.material.opacity = 0.8;
	}
	
	this.setOpacity = function(num)
	{
		this.mesh.material.opacity = num;
		
	}
	
	this.getBeamWidth = function()
	{
		return this.mesh.geometry.vertices[0].x;
	}
	
	this.canHurt = function()
	{
		return (this.timer > 120 && this.timer < 200 || this.timer >= 250 && this.timer < 350);
	}
	
	return this;
}