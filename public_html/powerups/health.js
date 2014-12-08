var healthTexture = new THREE.ImageUtils.loadTexture("Sprites/HealthPickUp.jpg");
var sonicWaveTexture = new THREE.ImageUtils.loadTexture("Sprites/SonicWave.gif");
var rapidFireTexture = new THREE.ImageUtils.loadTexture("Sprites/rapidFire.gif");


function healthPickup(position)
{
	var healthPickupMaterial = new THREE.MeshBasicMaterial( { map: healthTexture, side : THREE.DoubleSide, transparent: true } );
	this.mesh = new THREE.Mesh( new THREE.BoxGeometry(30,30,30), healthPickupMaterial);
	scene.add(this.mesh);
	this.mesh.position.copy(position);
	this.update = function()
	{
		
		this.mesh.position.y -= 3;
			
	}
	
	return this;
}

function sonicWavePickup(position)		// not yet added
{
	var swPickupMaterial = new THREE.MeshBasicMaterial( { map: sonicWaveTexture, side : THREE.DoubleSide, transparent: true } );
	this.mesh = new THREE.Mesh(new THREE.BoxGeometry(30,30,30), swPickupMaterial);
	scene.add(this.mesh);
	this.mesh.position.copy(position);
	
	this.update = function()
	{
		this.mesh.position.y -= 3;
	}
	
	return this;
}

function rapidFirePickup(position)		
{
	var rapidFirePickupMaterial = new THREE.MeshBasicMaterial( { map: rapidFireTexture, side : THREE.DoubleSide, transparent: true } );
	this.mesh = new THREE.Mesh(new THREE.BoxGeometry(30,30,30), rapidFirePickupMaterial);
	scene.add(this.mesh);
	this.mesh.position.copy(position);
	
	this.update = function()
	{
		this.mesh.position.y -= 3;
	}
	
	return this;
}