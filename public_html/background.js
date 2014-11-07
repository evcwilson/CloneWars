/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var width, height;
var particleSystem;
function _Screen(width, height){
    this.width = canvas.width;
    this.height = canvas.width; 
    return this; 
}

function drawBackground(_scene){
    
    var particleCount = 700,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            size: 1,
            map: THREE.ImageUtils.loadTexture("particle.png"),
            blending: THREE.AdditiveBlending,
            transparent: true
        });
        
        for (var p = 0; p < particleCount; p++){
            var pX = Math.random() * 500-250,
                pY = Math.random() * 600-250,
                pZ = -.5;
               
           //var particle = new THREE.Vertex(new THREE.Vector3(pX, pY, pZ));
           //alert(pX);
            
            particles.vertices.push(new THREE.Vector3(pX, pY, pZ));
        }
        //alert("here");
        particleSystem = new THREE.ParticleSystem(particles, pMaterial);
        
        particleSystem.sortParticles = true; 

		_scene.add(particleSystem); 
		//scene.add(particleSystem);
			
}

