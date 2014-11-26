/*********************
//		main.js
//
// 		Main script that sets up the WebGL context, game loop, and input processing.
// 
//**********************
*/

//Global Variables
var WIDTH = 500,
        HEIGHT = 600;
// Clock variables
var lastFrameTime = 0.0;
var currentFrameTime = 0.0;
var deltaTime = 0.0;
var lag = 0.0;

lastFrameTime = Date.now();

var exitGame = false;

var targetFrameRate = 1.0/60.0;

// To Calculate FPS
var timeAtNextSecond = Date.now();
var fps = 0;

//JQuery Function, waits for the game overlay to be clicked before moving to the next page. 
//Very simple, will update later. 
$(document).ready(function(){
    $.ajax({
        url:'audio/Sounds/ChandelierBackgroundAudio.mp3' ,
        success: function(){
            init();
		//setInterval(drawRadar, 1000);
		gameLoop();
        }
	});
});


//puts all the initializers into a function to be called
//when the "start menu" is clicked. 
function init(){
// initializers
initializeScene();
initializeGame();
initSound();
//drawBackground();			// drawBackground() is now called in each state (startState and gameModeState) 

initPlayer(); 

// setup key inputs
setupInputKeys();

}
// Game Loop
//gameLoop();


function gameLoop()
{
    //alert(canvas.width);
	if(exitGame == false)
	{
		
		currentFrameTime = Date.now();
		deltaTime = (currentFrameTime/ 1000 - lastFrameTime/ 1000)  ;		// number of seconds since last frame
		
		lag += deltaTime;
		
		while(lag >= targetFrameRate)
		{
			processEvents();
                       
                        //movePlayer(velocity);
			updateGame();
                      
			lag -= targetFrameRate;
			
		}
		
		render();
		fps++;
		//Calculate Frames per Second
		calculateFPS()
		
		lastFrameTime = currentFrameTime;
		
		// call GameLoop again
		requestAnimationFrame(gameLoop);
	}
}



function calculateFPS()
{
		
		if(Date.now() - timeAtNextSecond >= 1000)			// every one second....
		{
			console.log("Frames Per Second = " + fps );		// ... print the number of frames passed to the console
			fps = 0;																// reset the FPS counter
			timeAtNextSecond = Date.now();						// reset the time at the next second

		}

}





