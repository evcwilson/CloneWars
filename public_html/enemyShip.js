// enemyShip.js
/*
	enemyShip

	enemyShip is the base class for all enemy ships. Each enemy ship has:
	


*/



var pawnShipSprite = new THREE.ImageUtils.loadTexture("Sprites/EnemyShip1.gif");
var centurionShipSprite = new THREE.ImageUtils.loadTexture("Sprites/EnemyShip2.gif");

function enemyShip(shipRank)
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
	this.healthBarPosition = new THREE.Vector3(0, 25, 1);
	this.damageAmount;				// will be set according to ship type
	this.killPoints;					// will be set according to ship type

	this.mesh = null;				// will be created based on ship type
	
	this.rank;						// to keep track of what type of ship this is
	
	// array of all available ship ranks to use
	var shipRanks = [pawn, centurion];
	
	// loop through shipRanks array to see if the passed-in ship type matches one in this class
	for(var i = 0; i < shipRanks.length; i++)
	{
		if(shipRank.name.toString() == shipRanks[i].name.toString() )		// if shipRank passed to function exists in shipRanks array...
		{
			// create a temp ship and copy its variables to this
			var ship = new shipRanks[i]();
			this.rank = shipRank;	
			this.health = ship.health;
			this.healthBarColor = ship.healthBarColor;
			this.killPoints = ship.killPoints;
			this.damageAmount = ship.damageAmount;
			this.mesh = new THREE.Mesh(ship.geometry, ship.material);//ship.createMesh();
		}
	}
	
	// adding health bar 
	this.healthBarMaterial = new THREE.MeshBasicMaterial( {color: this.healthBarColor, side: THREE.DoubleSide } );
	this.healthBar = new THREE.Mesh(healthBarGeometry[this.health], this.healthBarMaterial);			// create health bar for this ship	
	scene.add(this.healthBar);																	// add it to scene
	this.healthBar.position.copy(this.healthBarPosition);
	this.mesh.add(this.healthBar);
	
	this.getHealth = function()
	{
		return this.health;
	}
	
	this.damage = function()
	{
		var oldHealth = this.health;
		this.health -= this.damageAmount;
		
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
	
	
	return this;
}

// SHIP TYPES!!
function pawn()
{
	this.health = 10;
	this.healthBarColor = 0xFF7878;
	this.damageAmount = 5;
	this.killPoints = 30;
	this.geometry = geometry = new THREE.PlaneGeometry( 50, 50, 32 );
	this.material = new THREE.MeshBasicMaterial( { map: pawnShipSprite, side : THREE.DoubleSide, transparent: true } );
}

function centurion()
{
	this.health = 10;
	this.healthBarColor = 0xFF7878;
	this.damageAmount = 4;
	this.killPoints = 70;
	this.geometry = new THREE.PlaneGeometry( 50, 50, 32 );
	this.material = new THREE.MeshBasicMaterial( { map: centurionShipSprite, side : THREE.DoubleSide, transparent: true } );
	
}