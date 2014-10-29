/*
	cavalry
	
	Cavalry is a child class of the super class 'enemyWave', that contains properties that all future 
	enemy waves will contain. This setup is done immediately after this class is defined
	
	Cavalry formation includes larger ships on the flanks of the formation and cohort ships in the
	middle of the cavalry ships. It is best to keep	the number of calvary ships 1/4 the number 
	of cohort ships.
	
	For the number of cohort ships in the cavalry formation, it's best to have the number of cohort
	ships to be a multiple of 4 when create a new cavalry() enemy wave.
	
	MainShip:
	In code, the this.mainship of the formation is the very first cohort ship created on the top row.
	When the numShipsCohort variable is an even number, the mainship is the first ship to the right
	of x=0. When an odd number, it's the center ship on the top row.
	
*/

function cavalry(numShipsCavalry, numShipsCohort)
{
	enemyWave.call(this);
	this.numShipsCavalry = numShipsCavalry;
	this.numShipsCohort = numShipsCohort;
	
	this.numShips = numShipsCavalry + numShipsCohort;
	this.enemyShipSpeed = 1.5;
	var maxShipsPerRow;
	this.init = function()
	{
	
		// Initializing positions of calvary ships
		var xFlip = 1;
		var xInitPos = -175;
		var yInitPos = 200;
		
		var shipGeometryCavalry = [-30.0, 60.0, 0,
									30.0, 60.0, 0,
									0.00, 0.00, 0];
									
		var shipMaterialCavalry = new THREE.MeshBasicMaterial( { color: "blue", side : THREE.DoubleSide } );
		var shipGeometryCohort = [-15.0, 40.0, 0,
									15.0, 40.0, 0,
									0.00, 0.00, 0];
		var shipMaterialCohort  = new THREE.MeshBasicMaterial( { color: "red", side : THREE.DoubleSide } );
									
		
		for(var i = 0; i < this.numShipsCavalry; i++)
		{
			this.shipArray[i] = _Ship.prototype.makeShip(shipGeometryCavalry, shipMaterialCavalry);
			scene.add(this.shipArray[i]);
			if( i > 0 && i % 2 == 0)
				yInitPos -= 75;
			this.shipArray[i].position.set(xFlip * xInitPos,yInitPos,0);
			xFlip *= -1;
			
		}
		
		// Initializing positions of cohort ships
		var xInitPosOddShips = 53;
		var xInitPosEvenShips = 30;
		maxShipsPerRow = (this.numShipsCohort & 1 ) ? 5 : 4 ; 	// if odd number, 5. if not, 4

		// set xInitPos for cohort ships, depending on number of maxShipsPerRow
		xInitPos = maxShipsPerRow == 5 ? xInitPosOddShips : xInitPosEvenShips;
		yInitPos = 200;

		var counter = 0;
		for(var i = this.numShipsCavalry, xFlip = -1; i < this.numShips; i++ )
		{
			this.shipArray[i] = _Ship.prototype.makeShip(shipGeometryCohort, shipMaterialCohort);
			scene.add(this.shipArray[i]);
			
			// set the x-position of the first ship
			if(counter == 0)
			{
				if(maxShipsPerRow == 5)
					this.shipArray[i].position.set( 0, yInitPos, 0);
				else
					this.shipArray[i].position.set( xInitPos, yInitPos, 0);
			}
			else if(counter % maxShipsPerRow == 0)		// if the number of maxShipsPerRow is reached
			{
				// move the first ship on the next row to x-position to the original xInitPos....
				// ...and set y-init position
				yInitPos -= 50;
				xFlip = -1;
				if(maxShipsPerRow == 5)
					this.shipArray[i].position.set( 0, yInitPos, 0);
				else
					this.shipArray[i].position.set( xInitPos, yInitPos, 0);
			}
			else
			{
				if(maxShipsPerRow == 4)
				{
					// for ships to the left of x = 0
					if(xFlip < 0)
					{
						this.shipArray[i].position.set( xInitPos * xFlip, yInitPos, 0);
						// decrease xFlip by one and multiple by small amount , 
						//which flips to the other side of x = 0 and makes ships appear evenly spread
						xFlip = (xFlip -1) * -1.5;
					}
					else // for ships to the right of x = 0
					{
						this.shipArray[i].position.set( xInitPos * xFlip, yInitPos, 0);
						 // xflip to the other side of x = 0 
						xFlip *= -1;
					}
				}
				else	// (if maxShipsPerRow == 5)
				{
					// for ships to the left of x = 0
					if(xFlip < 0)
					{
						this.shipArray[i].position.set( xInitPos * xFlip, yInitPos, 0);
						xFlip *= -1;	// xflip to the other side of x = 0
					}
					else // for ships to the right of x = 0
					{
						this.shipArray[i].position.set( xInitPos * xFlip, yInitPos, 0);
						xFlip = xFlip * -1 - 1; // xflip to the other side of x = 0 and decrease by 1
					}
				}
			}
		
			counter++;
		}
		
		// Make the mainShip the first cohort ship
		this.mainShip = this.shipArray[this.numShipsCavalry];
		
	}
	
	this.run = function()
	{
		for(var i = 0; i < this.numShips; i++)
		{
			this.shipArray[i].translateX(this.enemyShipSpeed * 0.5);
			if(maxShipsPerRow == 5)
			{
				if( this.mainShip.position.x > 50   || this.mainShip.position.x < -50)
				{
					this.enemyShipSpeed *= -1;
					this.shipArray[i].translateX(this.enemyShipSpeed );
				}
			}
			else if(maxShipsPerRow == 4)
			{
				if( this.mainShip.position.x > 70   || this.mainShip.position.x < -10)
				{
					this.enemyShipSpeed *= -1;
					this.shipArray[i].translateX(this.enemyShipSpeed);
				}
			}
			
		}
	
	}
	
	this.cleanup = function()
	{
		for(var i = 0; i < this.numShips; i++)
		{
			scene.remove(this.shipArray[i]);
			this.shipArray[i] = null;
		}
	
	}


}

cavalry.prototype = new enemyWave;
cavalry.prototype.constructor = cavalry;