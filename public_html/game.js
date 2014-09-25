// ****************
// 			game.js
//			
//			Mostly responsible for updating game logic.
//			Will more than likely get changed as the game is worked on.
//*****************


function vec2(m_x,m_y)
{
	this.x = m_x;
	this.y = m_y;
}

vec2.prototype.setVelocity = function(m_x, m_y)
{
	this.x = m_x;
	this.y = m_y;
}

var vertices = [ -0.25, 0.5,
						 0.0, 0.0,
						 0.25, 0.5];
 						
var vertexBufferObject;
var vertexShader;
var fragmentShader;
var program;

function moveShip(velocity)
{
		var speedModifier = 0.005 ;
		for(var i = 0; i < 6; i += 2)
		{
			vertices[i] += velocity.x * speedModifier;
			vertices[i+1] += velocity.y * speedModifier;
		};
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		
}

						
function updateGame()
{
	//console.log("Updating Game");
	//theta += 0.001;
	
}

function setupGL()
{
	vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
	var vShaderCode = document.getElementById("vShader").textContent;
	var fShaderCode = document.getElementById("fShader").textContent
	
	vertexShader = createShader(gl.VERTEX_SHADER, vShaderCode);
	fragmentShader = createShader(gl.FRAGMENT_SHADER, fShaderCode);
	
	program = createProgram();
	
	gl.useProgram(program);
	
}

function createShader(shaderType, shaderCode)
{
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader, shaderCode);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
	{
		alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
	}
	return shader;
}


function createProgram()
{
	var glProgram = gl.createProgram();
	gl.attachShader(glProgram, vertexShader);
	gl.attachShader(glProgram, fragmentShader);
	gl.linkProgram(glProgram);
	if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) 
	{
		alert("Unable to initialize the shader glProgram.");
	}
	return glProgram;
}