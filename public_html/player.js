/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var playerGeometry; 
var playerMaterial; 
var playerMesh; 
var playerImage;

var projGeo,
    projMaterial,
    projectile,
    projPresent = false;

function _Ship(id){
    return this; 
}

function initPlayer(){
    
var player = [ 0, 0, 0,
                -35, -50, 0,
                35, -50, 0];

playerMesh = _Ship.prototype.makeShip(player, new THREE.MeshBasicMaterial({color:"green"}));
playerMesh.position.set(0,-250,0);
scene.add(playerMesh);
   
}

//Updates player movement with each game loop
function playerUpdate(){
    //Prevents passing the left border
    if(playerMesh.position.x < -250){playerMesh.position.x += 1}
    //Prevents passing the right border
    else if (playerMesh.position.x > 250){playerMesh.position.x -=1}
    else if (keyPressedRight){ playerMesh.position.x+=1.5;}
    else if (keyPressedLeft) { playerMesh.position.x-=1.5;}
     
    if(keyPressedSpace && projPresent == false){_Ship.prototype.fireProjectile(playerMesh.position.x,
        playerMesh.position.y, new THREE.MeshBasicMaterial({color:0xffffff}));}
    

}

_Ship.prototype ={
    
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
    
   fireProjectile: function(x,y,mat){
       projPresent = true; 
       
       projGeo = new THREE.CircleGeometry(10,32);
       this.projMaterial = mat; 
       
       projectile = new THREE.Mesh(projGeo, projMaterial);
       projectile.position.set(x, y+5, 1);
       scene.add(projectile);
      
      

    },
    
    moveProjectile: function(){
        
           projectile.position.y += 2;
        if (projectile.position.y > 285){
           scene.remove(projectile);
           projPresent = false; 
       }
    }
       
};