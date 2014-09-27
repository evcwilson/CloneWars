var vertexAttribPosition;
var thetaUniformLocation;


function render()
{
	vertexAttribPosition = gl.getAttribLocation(program, "pos");
	gl.enableVertexAttribArray(vertexAttribPosition);
	
	thetaUniformLocation = gl.getUniformLocation(program, "theta");
	gl.uniform1f(thetaUniformLocation, theta);
	
	
	gl.vertexAttribPointer(vertexAttribPosition, 2, gl.FLOAT, false, 0,0);
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);

}