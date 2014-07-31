define([], function () {

  	'use strict';

	/**************************************************
	** GAME SETTINGS
	**************************************************/

	var settings = {
		
		// General
		serverIP: 		'10.0.0.14',	// IP address of server (or localhost for dev)
		canvasWidth: 	400, 		// Width in px
		canvasHeight: 	400,		// Height in px
		gridSquares: 	100,		// Number of units in grid
		canvasUnit: 	0,			// One canvas unit in px (calculated/w gridsize)
		fps: 			60, 		// Frames Per Second

		// Styling
		canvas: {
			textCol: 	'black'
		}

	};

	return settings;

});