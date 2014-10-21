// Responsible for setting up events and behaviors for events and inputs
// 

var escapePressed = false;
var keyPressedRight = false;
var keyPressedLeft = false;
var keyPressedDown = false;
var keyPressedUp = false;

function setupInputKeys()
{
	// Check for Key Presses
	document.onkeydown = function(evt) 
	{
		if(evt.keyCode == 39 || evt.keyCode == 68)
			keyPressedRight = true;
		if(evt.keyCode == 37 || evt.keyCode == 65)
			keyPressedLeft = true;
		if(evt.keyCode == 38 || evt.keyCode == 87)
			keyPressedUp = true;
		if(evt.keyCode == 40 || evt.keyCode == 83){
			keyPressedDown = true;
                    }
			
		if(evt.keyCode == 27)
		{
			escapePressed = true;
		}
	};
	
	document.onkeyup = function(evt)
	{
		if(evt.keyCode == 39)
			keyPressedRight = false;
		
		if(evt.keyCode == 37)
			keyPressedLeft = false;
		
		if(evt.keyCode == 38)
			keyPressedUp = false;
			
		if(evt.keyCode == 40)
			keyPressedDown = false;
	
	}

	// Add Resize Event function
	window.addEventListener("resize", resizeCanvas);
	
}
	
//Not used at the moment. 
function processEvents()
{
	if( !document.hasFocus() )
		releaseAllKeys();
		
	var velocity = new THREE.Vector2(0,0);
	
	// check for single key presses
	if(keyPressedRight == true)
	{ 
		velocity.set(+1, 0);
	}
	else if(keyPressedUp == true)
	{
		velocity.set(0, 1);
	}
	else if(keyPressedLeft == true)
	{
		velocity.set(-1, 0);
	}
	else if(keyPressedDown == true)
	{
		velocity.set(0, -1);
	}
	
	// check for double-axes key presses
	if(keyPressedLeft && keyPressedUp)
		velocity.set(-.707, +.707);
	else if(keyPressedLeft && keyPressedDown)
		velocity.set(-.707, -.707);
	else if(keyPressedRight && keyPressedUp)
		velocity.set(.707, +.707);
	else if(keyPressedRight && keyPressedDown)
		velocity.set(.707, -.707);
	
	shipVelocity = velocity;
		
	// finally call moveShip()
	//moveShip(velocity);
}



function releaseAllKeys()
{
	keyPressedRight = false;
    keyPressedLeft = false;
    keyPressedDown = false;
    keyPressedUp = false;
}

function resizeCanvas()
{
	
}