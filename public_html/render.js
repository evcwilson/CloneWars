// THREE.js essentials - a renderer, camera, and scene
var renderer;
var scene;
var camera;


// Triangle data
var triangleGeometry;
var triangleMaterial;
var triangleMesh;

var canvas;

function initializeScene()
{
	
	canvas = document.getElementById("canvas");
	
	renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias:true } );
	renderer.setClearColor("black", 1);
	document.getElementById("WebGLCanvas").appendChild(renderer.domElement);
	
	
	var viewSize = canvas.height;
	aspectRatio = canvas.width/canvas.height;
	camera = new THREE.OrthographicCamera( -aspectRatio*viewSize /2, aspectRatio*viewSize/2,
																			viewSize/2, -viewSize/2, 
																			-1000, 1000);
	camera.position.set(0,00,0);
	
	
	scene = new THREE.Scene();
	scene.add(camera);
	
	
	
	triangleGeometry = new THREE.Geometry();
	triangleGeometry.vertices.push( new THREE.Vector3( -20.0, 75.0, 0.0) );
	triangleGeometry.vertices.push( new THREE.Vector3( 20.0, 75.0, 0.0) );
	triangleGeometry.vertices.push( new THREE.Vector3( 0.0, 0.0, 0.0) );
	triangleGeometry.faces.push( new THREE.Face3( 0,1, 2));
	
	triangleMaterial = new THREE.MeshBasicMaterial( 
																						{
																							color: "red",
																							side: THREE.DoubleSide
																						} );
																	
	// Make three ships
	for(var i = 0; i < 3; i++)
	{
		shipArray[i] = new THREE.Mesh(triangleGeometry, triangleMaterial);
		scene.add(shipArray[i]);
		if(i > 0)
		{
			shipArray[0].add(shipArray[i]);
		}
	
	}
	
	// Set each position
	shipArray[0].position.set( 0, 0, 0 );
	shipArray[1].position.set(60,  100, 0);
	shipArray[2].position.set(-60, 100, 0);
	
	
	console.log("Done");
}

function render()
{
	
	
	renderer.render(scene, camera);
}	