/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var file = 'audio/Sounds/pacman_beginning.wav',
        player_fire_file = 'audio/Sounds/PlayerFire.wav',
        enemy_fire_file = null,
        enemy_explosion_file = null, 
        bufferLoader,
        context, 
        request,
        BufferL = [];

var menuMusic,
        player_fire,
        enemy_fire,
        enemy_explosion;

function initSound(){
    try{
        context = new (AudioContext || webkitAudioContext)();
        if(context){
            
            bufferLoader = new BufferLoader(context, 
            [
                file,
                player_fire_file,
                //enemy_fire_file,
               // enemy_explosion_file,
            ],
            finishedLoading
                    );
          bufferLoader.load(); 
        }
    }
    catch(e){
        alert("Your Browser does not support Web Audio API");
    }
}

function finishedLoading(bufferList){
    menuMusic = context.createBufferSource();
   
    menuMusic.buffer = bufferList[0];
    BufferL["player_fire"] = bufferList[1];
    BufferL["enemy_fire"] = bufferList[2];
    BufferL["enemy_explosion"] = bufferList[3];
    
      
    menuMusic.connect(context.destination);
    
    
    startMenuMusic();
    
}
        
function startMenuMusic(){
                    
        menuMusic.loop = true; 
        menuMusic.start(0);
}

function stopMenuMusic(){
    menuMusic.stop();
}

function enemyFire(){
    
}

function PlayerFire(){
    player_fire = context.createBufferSource(); 
    player_fire.buffer = BufferL["player_fire"];
    player_fire.connect(context.destination);
    player_fire.loop = false; 
    player_fire.playbackRate.value = 1; 
        player_fire.start(0);
}
function PlayerFireStop(){
   // player_fire.stop(0);
}

function EnemyFire(){
    enemy_fire = context.createBufferSource(); 
    enemy_fire.buffer = BufferL["enemy_fire"];
    enemy_fire.connect(context.destination);
    enemy_fire.loop = false; 
    enemy_fire.playbackRate.value = 1; 
        enemy_fire.start(0);
}

function EnemyExplosion(){
    enemy_explosion = context.createBufferSource(); 
    enemy_explosion.buffer = BufferL["enemy_explosion"];
    enemy_explosion.connect(context.destination);
    enemy_explosion.loop = false; 
    enemy_explosion.playbackRate.value = 1; 
        enemy_explosion.start(0);
}