/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var backgroundTime = 0.0,
    musicOffset = 0.0,
    firstPlay = true; 

var file = 'audio/Sounds/pacman_beginning.wav',
        player_fire_file = 'audio/Sounds/scifi002.mp3',
        enemy_fire_file = 'audio/Sounds/science_fiction_laser_gun_or_beam_fire_version_3 (1).mp3',
        enemy_fire_file2 = 'audio/Sounds/Photon1.mp3',
        enemy_explosion_file = null, 
        background_music_file = 'audio/Sounds/ChandelierBackgroundAudio.mp3', 
        game_over_file = null, 
        victory_music_file = null; 
        
    var bufferLoader,
        context, 
        request,
        BufferL = [];

var menuMusic,
        player_fire,
        enemy_fire,
        enemy_explosion,
         background_music, 
        game_over,
        victory_music;

function initSound(){
    try{
        context = new (AudioContext || webkitAudioContext)()
        if(context){
            
            bufferLoader = new BufferLoader(context, 
            [
                file,
                player_fire_file,
                enemy_fire_file,
                enemy_fire_file2,
               // enemy_explosion_file,
                  background_music_file, 
//                game_over,
//                victory_music
            ],
            finishedLoading
                    );
          bufferLoader.load(); 
        }
        context.createGain = context.createGainNode; 
    }
    catch(e){
        alert("Your Browser does not support Web Audio API");
    }
}

function finishedLoading(bufferList){
    
   
    BufferL["menuMusic"] = bufferList[0];
    BufferL["player_fire"] = bufferList[1];
    BufferL["enemy_fire"] = bufferList[2];
    BufferL["enemy_fire2"] = bufferList[3];
    //BufferL["enemy_explosion"] = bufferList[3];      
    BufferL["background_music"] = bufferList[4];      
    BufferL["game_over"] = bufferList[5];
    BufferL["victory_music"] = bufferList[6];
    
 
    
    
    startMenuMusic();
    
}
        
function startMenuMusic(){
        menuMusic = context.createBufferSource();
        menuMusic.buffer = BufferL["menuMusic"];
        menuMusic.connect(context.destination);
        menuMusic.loop = true; 
        menuMusic.start(0);
}

function stopMenuMusic(){
    menuMusic.stop();
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
function EnemyFire2(){
    enemy_fire2 = context.createBufferSource(); 
    enemy_fire2.buffer = BufferL["enemy_fire2"];
    enemy_fire2.connect(context.destination);
    enemy_fire2.loop = false; 
    enemy_fire2.playbackRate.value = 1; 
        enemy_fire2.start(0);
}


function EnemyExplosion(){
    enemy_explosion = context.createBufferSource(); 
    enemy_explosion.buffer = BufferL["enemy_explosion"];
    enemy_explosion.connect(context.destination);
    enemy_explosion.loop = false; 
    enemy_explosion.playbackRate.value = 1; 
        enemy_explosion.start(0);
}

function BackgroundMusic(){
    
    if(firstPlay){
        backgroundTimer = new Date().getTime() /1000;
        firstPlay = false;
    }
    
    background_music = context.createBufferSource(); 
    background_music.buffer = BufferL["background_music"];
    background_music.connect(context.destination);
    background_music.loop = true; 
    background_music.playbackRate.value = 1; 
    background_music.start(0, musicOffset);
}

//function resumeBackgroundMusic(){
//    background_music = context.createBufferSource(); 
//    background_music.buffer = BufferL["background_music"];
//    
//    background_music.connect(context.destination);
//    background_music.loop = true; 
//    background_music.playbackRate.value = 1; 
//    background_music.start(0, musicOffset);
//}

function stopBackgroundMusic(){
    musicOffset = (new Date().getTime() / 1000) - backgroundTimer;  
    background_music.stop(0);
}

function GameOverMusic(){
    game_over = context.createBufferSource(); 
    game_over.buffer = BufferL["game_over"];
    game_over.connect(context.destination);
    game_over.loop = false; 
    game_over.playbackRate.value = 1; 
        game_over.start(0);
}

function VictoryMusic(){
    victory_music = context.createBufferSource(); 
    victory_music.buffer = BufferL["victory_music"];
    victory_music.connect(context.destination);
    victory_music.loop = true; 
    victory_music.playbackRate.value = 1; 
        victory_music.start(0);
}