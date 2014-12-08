/*
	pattern.js
	
	pattern is an object that contains a list paths to take at a defined
	speed. The properties of a pattern are:
	
	dest: where the target destination of each subpath is (a THREE.Vector3)
	speed: at what speed it should travel to dest
	
	To create a pattern, call new pattern() and then call push_back() to add
	a new path to the pattern like so:
	
	var p = new pattern();
	p.push_back({ 
					dest: new THREE.Vector3(-200, 125, 1),
					speed: 1
				} );  



*/

function pattern(name)
{
	this.list = [];
	this.name = name;
	this.push_back = function(properties)
	{
		var size = this.list.length;
		this.list[size] = properties;
	
	}
	
	this.run = function()
	{
		var dirVector = new THREE.Vector3();
		dirVector.subVectors(this.list[this.patternIndex].dest, this.mesh.position);
		dirVector.normalize();
		this.mesh.translateOnAxis(dirVector, this.list[this.patternIndex].speed);
		if(this.mesh.position.distanceTo(this.list[this.patternIndex].dest) < 1)
		{
					this.patternIndex = this.patternIndex + 1;
					if(this.patternIndex % this.list.length == 0)
					{
						this.patternIndex = 0;
						
						if(this.shield != null)
							this.shield.activate();
						return false;
					}
		}
	}

}