// Responsible for setting up events and behaviors for events and inputs
// 

var escapePressed = false;
var keyPressedRight = false;
var keyPressedLeft = false;
var keyPressedDown = false;
var keyPressedUp = false;
var keyPressedSpace = false; 
var keyPressedEnter = false;
var keyPressedBackspace = false;

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
		if(evt.keyCode == 32){
			keyPressedSpace = true; 
		}
			
		if(evt.keyCode == 27)
		{
			escapePressed = true;
		}
		
		if(evt.keyCode == 13)
		{
			keyPressedEnter = true;
		}
		if(evt.keyCode == 8)
		{
			keyPressedBackspace = true;
		}
	};
	
	document.onkeyup = function(evt)
	{
		if(evt.keyCode == 39 || evt.keyCode == 68)
			keyPressedRight = false;
		
		if(evt.keyCode == 37 || evt.keyCode == 65)
			keyPressedLeft = false;
        
		
		if(evt.keyCode == 38 || evt.keyCode == 87)
			keyPressedUp = false;
			
		if(evt.keyCode == 40 || evt.keyCode == 83)
			keyPressedDown = false;
			
		if(evt.keyCode == 13)
		{
			keyPressedEnter = false;
		}
		             
		if (evt.keyCode == 32 )
			keyPressedSpace = false;
		
		if(evt.keyCode == 27)
		{
			escapePressed = false;
		}
		
		if(evt.keyCode == 8)
		{
			keyPressedBackspace = false;
		}
	
	}

	// Add Resize Event function
	window.addEventListener("resize", resizeCanvas);
	
}
	
//Not used at the moment. 
function processEvents()
{
	if( !document.hasFocus() )
		releaseAllKeys();
}



function releaseAllKeys()
{
	keyPressedRight = false;
    keyPressedLeft = false;
    keyPressedDown = false;
    keyPressedUp = false;
	escapePressed = false;
	
}

function resizeCanvas()
{
	
}