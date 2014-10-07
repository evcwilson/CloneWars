/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var playerGeometry; 
var playerMaterial; 
var playerMesh; 
var playerImage;

function _Ship(id){
    return this; 
}

function initPlayer(){
    
var player = [ 0, -225, 0,
                -35, -275, 0,
                35, -275, 0];

playerMesh = _Ship.prototype.makeShip(player, new THREE.MeshBasicMaterial({color:"green"}));

scene.add(playerMesh);
    
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
       
    moveShip: function(ship, x, y, z){
        ship.position.setX;
        ship.position.setY; 
        ship.position.setZ; 
    } 
};