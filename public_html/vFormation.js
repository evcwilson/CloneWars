var startPosition;
var targetPosition;
var targetDirection = new THREE.Vector3();

var targetPositions = [];
var allShipsInPosition = false;
var currentMovingShip = 0;

function initFormationV()
{
	startPosition = shipArray[0].position;
	targetPosition = testBox.position;
	
	var numShips = shipArray.length;
	var xFlip = 1;
	targetPositions[0] = new THREE.Vector3();
	targetPositions[0].copy(testBox.position);
	for(var i = 1; i < numShips; i++)
	{
		targetPositions[i] = new THREE.Vector3();
		targetPositions[i].copy(testBox.position);
		targetPositions[i].setX((testBox.position.x + 125) * xFlip);
		
		if(i > 0)
			targetPositions[i].setY(targetPositions[i].y + 50);
		xFlip = xFlip * -1.25;
	}
	
	targetDirection.subVectors(targetPositions[currentMovingShip], shipArray[currentMovingShip].position);
	targetDirection.normalize();
}


function runFormationV()
{	
	var numShips = shipArray.length;
	if(allShipsInPosition == false)
	{
		var distance = shipArray[currentMovingShip].position.distanceTo(targetPositions[currentMovingShip]);
		if(distance > 2)
		{
			shipArray[currentMovingShip].translateOnAxis(targetDirection, 3);
			
		}
		else
		{
			currentMovingShip++;
			if(currentMovingShip == numShips)
			{
				allShipsInPosition = true;
				for(var i =  1; i < numShips; i++)
				{
					shipArray[0].add(shipArray[i]);
				}
			}
			else
			{
					targetDirection.subVectors(targetPositions[currentMovingShip], shipArray[currentMovingShip].position);
					targetDirection.normalize();	
			}
		}
	}
	else
	{
		var numShips = shipArray.length;
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

}