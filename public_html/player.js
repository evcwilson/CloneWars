/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var playerGeometry; 
var playerMaterial; 
var playerMesh; 
var playerImage, 
    powerup = false; 

var projGeo,
    projMaterial,
    projectile,
    projPresent = false;
    
var enemyProjectGeo,
    enemyProjectMaterial,
    enemyProject = [],
    enemyProjectCount=0; 
	
var enemyProjectLimit = 3;

function _Ship(id){
    return this; 
}

function initPlayer(){
    
var player = [50,50];
var playerTexture = new THREE.ImageUtils.loadTexture('Sprites/player_ship.gif');
playerMesh = _Ship.prototype.makeShipSprite(player, new THREE.MeshBasicMaterial({transparent: true, map: playerTexture}));
playerMesh.position.set(0,-250,0);
//scene.add(playerMesh);
   
}

//Updates player movement with each game loop
function playerUpdate(){
    //Prevents passing the left border
    if(playerMesh.position.x < -250){playerMesh.position.x += 1}
    //Prevents passing the right border
    else if (playerMesh.position.x > 250){playerMesh.position.x -=1}
    else if (keyPressedRight){ playerMesh.position.x+=1.5;}
    else if (keyPressedLeft) { playerMesh.position.x-=1.5;}
     
    if(keyPressedSpace && projPresent == false || powerup == true){
        projPresent = true; 
        _Ship.prototype.playerProjectile(playerMesh.position.x,
        playerMesh.position.y + 10, new THREE.MeshBasicMaterial({color:'white'}));
    }
    

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
    health: function(health, damage, ship){
        health -= damage; 

        if (health <= 0){
            _Ship.prototype.destoryShip(ship);
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
    
    enemyProjectile: function(x,y,mat){
      
      if (enemyProjectCount <= enemyProjectLimit ){
       enemyProjectGeo = new THREE.PlaneGeometry(10,10, 32);
       enemyProject[enemyProjectCount] = new THREE.Mesh(enemyProjectGeo, mat);
       enemyProject[enemyProjectCount].position.set(x, y, 1);
       scene.add(enemyProject[enemyProjectCount]);
       enemyProjectCount++; 
        }
    }, 
    
    moveEneProjectile: function(i){
        
        enemyProject[i].position.y -=2; 
        if (enemyProject[i].position.y < -285){
            scene.remove(enemyProject[i]);
            enemyProjectCount--;
            enemyProject.splice(i,1);
        }
        
    },
             
    moveProjectile: function(){
        
           projectile.position.y += 9;
        if (projectile.position.y > 285){
           scene.remove(projectile);
           projPresent = false; 
       }
    }
       
};