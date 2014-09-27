/*********************
//		main.js
//
// 		Main script that setups up the WebGL context, game loop, and input processing.
// 
//**********************
*/


// Clock variables
var lastFrameTime = 0.0;
var currentFrameTime = 0.0;
var deltaTime = 0.0;
var lag = 0.0;

lastFrameTime = Date.now();



var targetFrameRate = 1.0/60.0;

// To Calculate FPS
var timeAtNextSecond = Date.now();
var fps = 0;


initializeScene();
initializeGame();
setupInputKeys();
gameLoop();



function gameLoop()
{
	if(escapePressed == false)
	{
	
		currentFrameTime = Date.now();
		deltaTime = (currentFrameTime - lastFrameTime) / 1000 ;		// number of seconds since last frame
		
		lag += deltaTime;
		
		while(lag >= targetFrameRate)
		{
			processEvents();
			updateGame();
			lag -= targetFrameRate;
			
		}
		
		render();
		
		//Calculate Frames per Second
		calculateFPS()
		
		lastFrameTime = currentFrameTime;
		
		// call GameLoop again
		requestAnimationFrame(gameLoop);
	}
}



function calculateFPS()
{
		fps++;
		if(Date.now() - timeAtNextSecond >= 1000)			// every one second....
		{
			console.log("Frames Per Second = " + fps );		// ... print the number of frames passed to the console
			fps = 0;																// reset the FPS counter
			timeAtNextSecond = Date.now();						// reset the time at the next second
			
		}

}



