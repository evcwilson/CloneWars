

var borderWidth= 0.0;
var borderHeight = 0.0;

var timer = 0;

function initializeGame()
{
	
	borderWidth= canvas.width/2*0.85;
	borderHeight = canvas.height/2 * 0.55;
	
	// initialize game mode, which is currently the first and only mode in the game.
	// when the splash screen and other modes are created, this may not get called just yet
	gameModeInit();
}


	
function updateGame()
{
	// this timer stuff is just a place holder for real game functions.
	// currently, the game will initialize the next wave of enemies
	// after the timer reaches 15. In the real game, the next wave of enemies
	// may be initialized after all enemy ships in that current wave are dead.
	timer += deltaTime;
	if(timer > 15)
	{
		levelInitNextWave();
		timer = 0;//-999999999;
	}
	
	
	gameModeRun();
}
