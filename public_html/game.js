// game.js
/*	

	game.js is the file that initializes and calls all the game's Game States
	
	The states of the game are:
	1.) Start State (the title screen)
	2.) Game State  (where the gameplay is run)
	3.) Credits State (for when the game is complete ) (not yet added)
	4.) Paused State  (not yet added)
	
	States are stored in an array called stateStack[]. The states are defined in separate files.
	
	Every state should have the following functions at minimum:
	1.) init() - to initialize the state. Usually only runs once until state changes again.
	2.) run() - this gets called every frame. Anything that needs updated frequently should be done here.
	3.) exit() - return true if something happens to trigger the game to go to the next gameState or exit the game
	
*/

var borderWidth= 0.0;
var borderHeight = 0.0;

var currentState = 0;
var stateStack = [];
var numStates = 0;

function initializeGame()
{
	borderWidth= canvas.width/2*0.85;
	borderHeight = canvas.height/2 * 0.55;
	
	registerState(new startMode());
	registerState(new gameMode());
	// registerState(new pausedState() ); 		// for future use
	// registerState(new creditsState() );		// for future use
	
	stateStack[currentState].init();
}

	
function updateGame()
{
	// run the current state of the game
	stateStack[currentState].run();
	
	
	// if something triggers the game to exit the current state
	if( stateStack[currentState].exit() == true)
	{
		nextState();
	}
}

function registerState(newState)
{
	// make sure the argument passed into this function is of type 'state'
	if(newState instanceof state)
		stateStack[numStates++] = newState;
	else
	{
		console.log(newState.constructor.name + " is not an instance of state");
	}
}


function nextState()
{
	// increment currentState but loop back to 0 if number equals the number of states...
	currentState = (currentState + 1) % numStates;
	
	// then initialize it
	stateStack[currentState].init();
}


