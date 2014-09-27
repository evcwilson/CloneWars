var mainShip;
var shipVelocity;
var shipArray = [];

var borderWidth= 0.0;
var borderHeight = 0.0;
var enemyShipSpeed = 2;

function initializeGame()
{
	mainShip = shipArray[0];
	borderWidth= canvas.width/2*0.65;
	borderHeight = canvas.height/2 * 0.55;
}


function updateGame()
{
	moveShip();
}

function moveShip()
{
	var speedModifier = -2 ;

	var currentPosition = mainShip.position;
		
	// Set triangle's X and Y positions
	mainShip.translateX(enemyShipSpeed);

	
	// Check if triangle is past the border
	if(mainShip.position.x > borderWidth  - 50 || mainShip.position.x < -borderWidth + 50 )	
	{
			enemyShipSpeed *= -1;
			mainShip.translateX(enemyShipSpeed);
	}
		
}