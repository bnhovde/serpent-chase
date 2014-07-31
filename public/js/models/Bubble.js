
define(['settings'], function (settings) {

  	'use strict';

	/**************************************************
	** CHAT BUBBLE CLASS
	**************************************************/

	var Bubble = function(playerId) {
		var id = playerId,
			text = '',
			prevText = '',
			isSubmitted = false;
		
		// Getters and setters
		var getText = function() {
			return text;
		};		

		var getPrevText = function() {
			return prevText;
		};

		var setPrevText = function(text) {
			prevText = text;
		};

		var setText = function(e) {

			var c = e.keyCode;
			switch (c) {	
				case 37: 	// Arrows
				case 38: 	// Arrows
				case 39: 	// Arrows
				case 40: 	// Arrows
					break;				
				case 8: 	// Erase
					text = text.slice(0, - 1);
					break;				
				case 13: 	// Enter
					isSubmitted = true;
					break;
				default: 	// Otherwise, assume text input
					text += String.fromCharCode(c);
			};
		};

		// Draw text for localplayer (show typed text)
		var drawLocal = function(ctx, x, y) {
			if ( text != '' ) {
				ctx.fillStyle = settings.canvas.textCol;
				ctx.fillText( text, x, y );
			};
		};

		// Draw text
		var draw = function(ctx, x, y) {
			if ( prevText != '' ) {
				ctx.fillStyle = settings.canvas.textCol;
				ctx.fillText( prevText, x, y );
			};
		};

		var checkSubmitted = function() {
			return isSubmitted;
		};		

		var resetText = function() {
			prevText = text;
			text = '';
			isSubmitted = false;
		};

		// Define which variables and methods can be accessed
		return {
			getText: 	getText,
			getPrevText: getPrevText,
			setText: 	setText,
			setPrevText: setPrevText,
			text: 		text,
			draw: 		draw,
			drawLocal: 	drawLocal,
			checkSubmitted: checkSubmitted,
			resetText: resetText
		};
	};

	return Bubble;

});