
var bossShipGeometry;
var bossShipMaterial;
var bossShipMesh;

var pawnShipGeometry;
var pawnShipMaterial;
var pawnShipMesh;

var pawnShipArray = [];
var diamondPoints = [];

var testBox0, testBox1, testBox2, testBox3;


function initFormationDiamond()
{
	// initialize the bossShipMesh and add to scene
	bossShipGeometry = new THREE.Geometry();
	bossShipGeometry.vertices.push( new THREE.Vector3( -20.0, 75.0, 0.0) );
	bossShipGeometry.vertices.push( new THREE.Vector3( 20.0, 75.0, 0.0) );
	bossShipGeometry.vertices.push( new THREE.Vector3( 0.0, 0.0, 0.0) );
	bossShipGeometry.faces.push( new THREE.Face3( 0,1, 2));
	
	bossShipMaterial = new THREE.MeshBasicMaterial(  	{ color: "red", side : THREE.DoubleSide } );
	
	bossShipMesh = new THREE.Mesh(bossShipGeometry, bossShipMaterial);
	bossShipMesh.position.set(0, 0, 0);
	scene.add(bossShipMesh);

	// initialize diamondPoint positions
	for(var i = 0; i < 4; i++)
	{
		diamondPoints[i] = new THREE.Vector3();
		diamondPoints[i].copy(bossShipMesh.position);
	}
	diamondPoints[0].setX(bossShipMesh.position.x + 150);
	diamondPoints[1].setY(bossShipMesh.position.y - 150);
	diamondPoints[2].setX(bossShipMesh.position.x - 150);
	diamondPoints[3].setY(bossShipMesh.position.y + 150);
	
	testBox0 = new THREE.Mesh( testBoxGeometry, testBoxMaterial );
	testBox1 = new THREE.Mesh( testBoxGeometry, testBoxMaterial );
	testBox2 = new THREE.Mesh( testBoxGeometry, testBoxMaterial );
	testBox3 = new THREE.Mesh( testBoxGeometry, testBoxMaterial );
	
	/*
	scene.add(testBox0)
	scene.add(testBox1)
	scene.add(testBox2)
	scene.add(testBox3)
	*/
	testBox0.position.copy(diamondPoints[0]);
	testBox1.position.copy(diamondPoints[1]);
	testBox2.position.copy(diamondPoints[2]);
	testBox3.position.copy(diamondPoints[3]);
	
	
	
	// initialize pawnShip meshes
	pawnShipGeometry = new THREE.Geometry();
	pawnShipGeometry.vertices.push( new THREE.Vector3( -20.0, 75.0, 0.0) );
	pawnShipGeometry.vertices.push( new THREE.Vector3( 20.0, 75.0, 0.0) );
	pawnShipGeometry.vertices.push( new THREE.Vector3( 0.0, 0.0, 0.0) );
	pawnShipGeometry.faces.push( new THREE.Face3( 0,1, 2));
	
	pawnShipMaterial = new THREE.MeshBasicMaterial( {color: "green", side: THREE.DoubleSide });
	
	// create pawn ship array and assign positions
	for( var i = 0; i < 4; i++)
	{
		pawnShipArray[i] = new THREE.Mesh(pawnShipGeometry, pawnShipMaterial);
		scene.add(pawnShipArray[i] );
		pawnShipArray[i].position.copy(diamondPoints[i]);//50, -60 * (i + 1), 0);
		
	}
	
	
	// assign source and lerp points for each pawn ship
	for(var i = 0, lp = 3; i < 4; i++)
	{
	
		pawnShipArray[i].sourceLerpPoint = 0;//lp;
		pawnShipArray[i].destLerpPoint = (i + 1) % 4;//1;//((lp++) % 4);
	}
	
	// assigns target direction for each pawn ship
	for(var i = 0; i < 4; i++)
	{
		pawnShipArray[i].targetDirection = new THREE.Vector3();
		pawnShipArray[i].targetDirection.subVectors(diamondPoints[pawnShipArray[i].destLerpPoint], diamondPoints[pawnShipArray[i].sourceLerpPoint]);//pawnShipArray[i].position);
		pawnShipArray[i].targetDirection.normalize();
		//bossShipMesh.add(pawnShipArray[i]);
	}
	
	mainShip = bossShipMesh;
}




function runFormationDiamond()
{
	// Set triangle's X and Y positions
	mainShip.translateX(enemyShipSpeed);

	
	// Check if triangle is past the border
	if(mainShip.position.x > borderWidth  - 50 || mainShip.position.x < -borderWidth + 50 )	
	{
			enemyShipSpeed *= -1;
			mainShip.translateX(enemyShipSpeed);
	}
	
	// update diamond points
	updateDiamondPointPositions();
	
	// update test box positions
	updateTestBoxPostions();
		
	// update  movement for pawnShips
	for(var i = 0; i < 4; i++)
	{
		pawnShipArray[i].targetDirection.subVectors(diamondPoints[pawnShipArray[i].destLerpPoint],  pawnShipArray[i].position);
		pawnShipArray[i].targetDirection.normalize();	
			
		pawnShipArray[i].translateX(enemyShipSpeed);
		pawnShipArray[i].translateOnAxis(pawnShipArray[i].targetDirection, 2);
		
	}
	
	// test the distance to the diamond points with the first pawnShip
	var len = diamondPoints[pawnShipArray[0].destLerpPoint].distanceTo(pawnShipArray[0].position);
	len = Math.sqrt(Math.sqrt(len));
	//console.log(len);
	if(len < 1.2)
	{
		for(var i = 0; i < 4; i++)
		{
			targetNextLerpPoint(pawnShipArray[i]);
		}
	}	
}

function updateDiamondPointPositions()
{
	diamondPoints[0].setX(bossShipMesh.position.x+ 150);
	diamondPoints[1].setX(bossShipMesh.position.x);
	diamondPoints[2].setX(bossShipMesh.position.x - 150);
	diamondPoints[3].setX(bossShipMesh.position.x);

}
function updateTestBoxPostions()
{
	testBox0.position.copy(diamondPoints[0]);
	testBox1.position.copy(diamondPoints[1]);
	testBox2.position.copy(diamondPoints[2]);
	testBox3.position.copy(diamondPoints[3]);

}

function targetNextLerpPoint(ship)
{
	ship.sourceLerpPoint = ship.destLerpPoint;
	ship.destLerpPoint = (ship.destLerpPoint + 1) % 4;

}




















