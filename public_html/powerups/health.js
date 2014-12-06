var healthTexture = new THREE.ImageUtils.loadTexture("Sprites/HealthPickUp.jpg");
var sonicWaveTexture = new THREE.ImageUtils.loadTexture("Sprites/HealthPickUp.jpg");


function healthPowerup(position)
{
	var healthPickupMaterial = new THREE.MeshBasicMaterial( { map: healthTexture, side : THREE.DoubleSide, transparent: true } );
	this.mesh = new THREE.Mesh( new THREE.BoxGeometry(30,30,30), healthPickupMaterial);
	scene.add(this.mesh);
	this.mesh.position.copy(position);
	this.update = function()
	{
		
		this.mesh.position.y -= 5;
			
	}
	
	return this;
}

function sonicWavePowerup(position)		// not yet added
{
	var swPickupMaterial = new THREE.MeshBasicMaterial( { map: sonicWaveTexture, side : THREE.DoubleSide, transparent: true } );
	this.mesh = new THREE.Mesh(new THREE.BoxGeometry(30,30,30), swPickupMaterial);
	scene.add(this.mesh);
	this.mesh.position.copy(position);
	
	this.update = function()
	{
	
	}
	
	return this;
}