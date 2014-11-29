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

// STATE REGISTER
var stateRegister = []; // keeps list of states the game will ever use.
var statePointer = 0;	// points to the currently active State in the list of registered states

// STATE STACK
var stateStack = [];	// keeps list of ACTIVE states
var currentState;		// will point to the last state in the list of ACTIVE states

var numStates = 0;

var gamePaused = false;
var gameRestart = false;
var gameOver = false;
var playerWon = false;
var playerLost = false;

// SCORE STUFF
var hud = new hudObject();
var playerScore = "000000";
var hiScore = "5000";

function initializeGame()
{
	borderWidth= canvas.width/2*0.85;
	borderHeight = canvas.height/2 * 0.55;
	
	registerState(new startMode());
	registerState(new gameMode());
	registerState(new pausedMode() );
	registerState(new gameOverMode() );
	// registerState(new creditsState() );		// for future use
	
	pushState(stateRegister[0]);
	
	stateStack[statePointer].init();
	
}

	
function updateGame()
{
	currentState = stateStack.length - 1;
	
	// run the current state of the game
	stateStack[currentState].run();
	
	// if something triggers the game to proceed to the next State
	
	if( stateStack[currentState].nextState() == true)
	{
		nextState();
		return;
	}
	
	// check if something made the game pause
	if(stateStack[currentState].paused() == true)
	{
		// if so, push the next registered state in the list
		pushState(stateRegister[++statePointer]);
		stateStack[stateStack.length - 1].init();
		gamePaused = true;
		return;
	}
	
	// if something triggers the game to exit the current state
	if( stateStack[currentState].exit() == true)
	{	
		// if player exits the game from Paused menu
		if(gameRestart == true)
		{
			restartGame();			
		}
		else
		{
			// remove the state from the stateStack
			popState();

			// check if the statePointer points to the very first state in the register already
			if(statePointer == 0)
			{
				exitGame = true;
			}
			else	// if not...
			{	
				// ...check if the game is paused...
				if(gamePaused == true)
				{
					// ...push state pointer to the previous state in the registered state list
					statePointer--;
					gamePaused = false;
				}
				else
				{
					// ...or push the previous state into the list of active states
					pushState(stateRegister[--statePointer]);
				}
			}
		}
	}
	
	
}

function registerState(newState)
{
	// make sure the argument passed into this function is of type 'state'
	if(newState instanceof state)
		stateRegister[stateRegister.length] = newState;
	else
	{
		console.log(newState.constructor.name + " is not an instance of state");
	}
}

function pushState(_state)
{
	var cur = stateStack.length;
	stateStack[cur] = _state;
	numStates++;
}

function popState()
{
	var stackLength = stateStack.length - 1;
	stateStack.splice(stackLength, 1);
	numStates--;
}

function nextState()
{
	var currentStateName = stateStack[currentState].constructor.name;
	var stackLength = stateStack.length - 1;
	popState();
	
	switch(currentStateName)
	{
		case "startMode":
			pushState(stateRegister[++statePointer]);
			break;
		default:
			pushState(stateRegister[stateRegister.length - 1]);
	}
	stateStack[stackLength].init();
}

function restartGame()
{
	stateStack[0].cleanupState();
	stateStack.length = [];
	statePointer = 0;
	numStates = 0;
	pushState(stateRegister[0]);
	stateStack[0].init();
	gameRestart = false;
	gamePaused = false;
}


