// Responsible for setting up events and behaviors for events and inputs
// 

var escapePressed = false;
var keyPressedRight = false;
var keyPressedLeft = false;
var keyPressedDown = false;
var keyPressedUp = false;

function setupInputKeys()
{
	document.onkeydown = function(evt) 
	{
		if(evt.keyCode == 39)
			keyPressedRight = true;
		if(evt.keyCode == 37)
			keyPressedLeft = true;
		if(evt.keyCode == 38)
			keyPressedUp = true;
		if(evt.keyCode == 40)
			keyPressedDown = true;
			
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

		
	

}
	

function processEvents()
{
	if( !document.hasFocus() )
		releaseAllKeys();
		
	var vel = new vec2(0,0);
	
	// check for single key presses
	if(keyPressedRight == true)
	{ 
		vel.setVelocity(+1, 0);
	}
	else if(keyPressedUp == true)
	{
		vel.setVelocity(0, +1);
	}
	else if(keyPressedLeft == true)
	{
		vel.setVelocity(-1, 0);
	}
	else if(keyPressedDown == true)
	{
		vel.setVelocity(0, -1);
	}
	
	// check for double-axes key presses
	if(keyPressedLeft && keyPressedUp)
		vel.setVelocity(-.707, .707);
	else if(keyPressedLeft && keyPressedDown)
		vel.setVelocity(-.707, -.707);
	else if(keyPressedRight && keyPressedUp)
		vel.setVelocity(.707, .707);
	else if(keyPressedRight && keyPressedDown)
		vel.setVelocity(.707, -.707);
		
		
	// finally call moveShip()
	moveShip(vel);
}



function releaseAllKeys()
{
	keyPressedRight = false;
    keyPressedLeft = false;
    keyPressedDown = false;
    keyPressedUp = false;
}