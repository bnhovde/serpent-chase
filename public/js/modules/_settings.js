define([], function () {

  	'use strict';

	/**************************************************
	** GAME SETTINGS
	**************************************************/

	var settings = {
		serverIP: 		'10.0.0.14',	// IP address of node server
		canvasWidth: 	400, 		// Width in px
		canvasHeight: 	400,		// Height in px
		gridSquares: 	100,		// Number of units in grid
		canvasUnit: 	0			// One canvas unit in px (calculated bwith gridsize)
	};

	return settings;

});