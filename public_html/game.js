var mainShip;
var shipArray = [];

var borderWidth= 0.0;
var borderHeight = 0.0;
var enemyShipSpeed = 2;

var numShips;
var timer = 0;

function initializeGame()
{
	
	borderWidth= canvas.width/2*0.65;
	borderHeight = canvas.height/2 * 0.55;
}


	
function updateGame()
{
	timer += deltaTime;
	
	if(timer < 20)
	{
		runFormationDiamond();
	}
	else
	{
		cleanupScene();
		mainShip = shipArray[0];
		runFormationV();
	
	}
	
}

function cleanupScene()
{
	scene.remove(bossShipMesh);
	scene.remove(pawnShipArray[0] );
	scene.remove(pawnShipArray[1] );
	scene.remove(pawnShipArray[2] );
	scene.remove(pawnShipArray[3] );


}