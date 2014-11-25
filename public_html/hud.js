// hud.js

/*

	hudObject displays text and such.
	
*/
function hudObject()
{
	// material for hud texts
	var textMaterial = new THREE.MeshBasicMaterial({color: 0x90be90});
	
	// hi score stuff
	var hiScore = 210;
	var hiScoreWords = "HI-SCORE";
	var hiScoreTextGeometry = new THREE.TextGeometry( hiScoreWords, { size: 10, height: 25,	font: "arkitech medium"});
	var hiScoreTextMesh = new THREE.Mesh( hiScoreTextGeometry, textMaterial );
	
	// player score stuff
	var playerScore = 000000;
	var playerScoreText = "SCORE";
	var playerScoreTextGeometry = new THREE.TextGeometry( playerScoreText, { size: 10, height: 25, font: 'arkitech medium' });
	var playerScoreTextMesh = new THREE.Mesh( playerScoreTextGeometry ,textMaterial);
	
	// player lives stuff
	var playerLivesPosition = new THREE.Vector3();
	playerLivesPosition.set(220, 280, 1);
	var playerLivesArray = [];
	var playerLivesNum = 0;
	
	// registered array of numbers to use for hud
	var numberArray =
	[
		new THREE.TextGeometry( '0', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '1', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '2', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '3', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '4', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '5', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '6', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '7', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '8', { size: 10, height: 25, font: 'arkitech medium' }),
		new THREE.TextGeometry( '9', { size: 10, height: 25, font: 'arkitech medium' }),
	]
	
	// player score is display as individual digit meshes for each number - 0 0 0 0 0 0
	var playerScoreArray = 
	[
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
	];
	
	// hi score is display as individual digit meshes for each number - 0 0 0 0 0 0
	var hiScoreArray =
	[
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
		new THREE.Mesh(numberArray[0], textMaterial),
	]
	
	// will store default locations for each digit in score
	var defaultPlayerScorePositions = [];
	var defaultHiScorePositions = [];
	
	this.scene = null;

	
	this.addToScene = function(_scene)
	{
		
		this.scene = _scene;
		
		// HI-SCORE mesh
		scene.add(hiScoreTextMesh);
		hiScoreTextMesh.position.set(-40, 285, 1);
		
		// SCORE mesh
		scene.add(playerScoreTextMesh);
		playerScoreTextMesh.position.set(-240, 285, 1);
		
		// add player score to scene and set position
		var offset = -240;
		for(var i = 0; i < playerScoreArray.length; i++)
		{
			scene.add(playerScoreArray[i]);
			playerScoreArray[i].position.set(offset, 270, 1);
			defaultPlayerScorePositions[defaultPlayerScorePositions.length] =	playerScoreArray[i].position; 
			offset += 15;
		}
		
		// add hi score to scene and set position
		offset = -40;
		for(var i = 0; i < hiScoreArray.length; i++)
		{
			scene.add(hiScoreArray[i]);
			hiScoreArray[i].position.set(offset, 270, 1);
			defaultHiScorePositions[defaultHiScorePositions.length] = hiScoreArray[i].position;
			offset += 15;
		}
		
		
		this.updateHiScore();
		this.setPlayerLives(playerLives);

	}
	
	
	this.updateScore = function(num)		// num is the value of points for killing certain ship. updateScore() is called from enemywave.checkCollision()
	{
		playerScore += num || 0;			
		var scoreString = playerScore.toString();
		var stringLength = scoreString.length;
		
		var counter = 0;
		for(var i = stringLength - 2; i >= 0; i--)
		{
			var iter = playerScoreArray.length - 2 - counter;

			// change the mesh of the player score mesh array to match the player score variable
			switch(scoreString[i])
			{
				case '0':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[0], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '1':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[1], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '2':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[2], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '3':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[3], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '4':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[4], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '5':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[5], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '6':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[6], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '7':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[7], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '8':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[8], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '9':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[9], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
			}
			// adjust the position of the '1' mesh to compensate for the off-centered font
			playerScoreArray[iter].position.copy(defaultPlayerScorePositions[iter]);
			if(scoreString[i] == '1')
			{
				playerScoreArray[iter].translateX(5);
			}
			counter++;
			
			
		}
		
		// check if the player's score is higher than the hiscore
		if(playerScore > hiScore)
		{
			hiScore = playerScore;
			this.updateHiScore();
		}
	}
	
	this.updateHiScore = function()
	{
		var scoreString1 = hiScore.toString();
		var stringLength1 = scoreString1.length;
		
		var counter1 = 0;
		for(var i = stringLength1 - 2; i >= 0; i--)
		{
			var iter = hiScoreArray.length - 2 - counter1;

			var oldPosition = new THREE.Vector3();
			oldPosition = hiScoreArray[iter].position;

			// change the mesh of the hi score mesh array to match the hiscore variable
			switch(scoreString1[i])
			{
				case '0':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[0], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '1':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[1], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '2':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[2], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '3':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[3], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '4':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[4], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '5':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[5], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '6':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[6], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '7':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[7], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '8':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[8], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
				case '9':
					scene.remove(hiScoreArray[iter]);
					hiScoreArray[iter] = new THREE.Mesh(numberArray[9], textMaterial);
					scene.add(hiScoreArray[iter]);
					break;
			}
			// adjust the position of the '1' mesh to compensate for the off-centered font
			hiScoreArray[iter].position.copy(defaultHiScorePositions[iter]);
			if(scoreString1[i] == '1')
			{
				hiScoreArray[iter].translateX(5);
			}
			counter1++;
		}
	}
	
	this.resetScore = function(num)
	{
		var scoreToReset = 1000000;		// the leading 1 will not actually be added to the score
		var scoreString = scoreToReset.toString();
		var stringLength = scoreString.length;
		
		var counter = 0;
		for(var i = stringLength - 2; i >= 1; i--)
		{
			var iter = playerScoreArray.length - 2 - counter;

			var oldPosition = new THREE.Vector3();
			oldPosition = playerScoreArray[iter].position;

			// change the mesh of the player score mesh array to match the player score variable
			switch(scoreString[i])
			{
				case '0':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[0], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '1':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[1], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '2':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[2], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '3':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[3], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '4':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[4], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '5':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[5], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '6':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[6], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '7':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[7], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '8':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[8], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
				case '9':
					scene.remove(playerScoreArray[iter]);
					playerScoreArray[iter] = new THREE.Mesh(numberArray[9], textMaterial);
					scene.add(playerScoreArray[iter]);
					break;
			}
			playerScoreArray[iter].position.copy(oldPosition);
			counter++;
		}
	}
	
	this.reset = function()
	{
		playerScore = 000000;
		this.resetScore();
		
		// remove player lives meshes from scene and empty the player lives array
		for(var i = 0; i < playerLivesArray.length; i++)
		{
			scene.remove(playerLivesArray[i]);
		}
		playerLivesArray = [];
	}
	
	
	this.setPlayerLives = function(num)
	{
		// sets the number passed in to the number of player lives in this hud object
		playerLivesNum = num;
		
		// prepares player lives variables
		
		var playerLivesMesh;
		var playerLivesGeometry = new THREE.PlaneGeometry(36,36,32);
		var playerLivesTexture = new THREE.ImageUtils.loadTexture('Sprites/player_ship.gif');
		
		
		// creates new player lives meshes 
		var i;
		for(i = 0; i < playerLivesNum; i++)
		{
			playerLivesMesh = new THREE.Mesh( playerLivesGeometry, new THREE.MeshBasicMaterial({transparent: true, map: playerLivesTexture}) );
			playerLivesArray[i] = playerLivesMesh;
			scene.add(playerLivesArray[i]);
			playerLivesArray[i].position.copy(playerLivesPosition);
			playerLivesArray[i].position.setX(playerLivesPosition.x - (45 * i) );
			
		}	
		
	}
}