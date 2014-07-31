
define([
	'models/Bubble',
	'settings'
], 

function (Bubble, settings) {

  	'use strict';

	/**************************************************
	** GAME PLAYER CLASS
	**************************************************/

	var Player = function(startX, startY, col) {
		var x = startX,
			y = startY,
			id,
			color = col,
			moveAmount = 2;

		// Initialise the player textBubble
		var textBubble = new Bubble(id, '');
		
		// Getters and setters
		var getX = function() {
			return x;
		};

		var getY = function() {
			return y;
		};

		var getCol = function() {
			return color;
		};

		var setX = function(newX) {
			x = newX;
		};

		var setY = function(newY) {
			y = newY;
		};

		// Update player position
		var update = function(keys) {
			// Previous position
			var prevX = x,
				prevY = y;

			// Up key takes priority over down - only one direction allowed
			if (keys.up) {
				y -= moveAmount;
			} else if (keys.down) {
				y += moveAmount;
			} else if (keys.left) {
				x -= moveAmount;
			} else if (keys.right) {
				x += moveAmount;
			};

			return (prevX != x || prevY != y) ? true : false;
		};

		// Draw player
		var draw = function(ctx) {
			ctx.fillStyle = color;
			ctx.fillRect(x-5, y-5, 10, 10);
		};

		// Draw text bubble (for local player)
		var drawBubbleLocal = function(ctx) {
			textBubble.drawLocal(ctx, x - 5, y - 20);
		};

		// Draw text bubble
		var drawBubble = function(ctx) {
			textBubble.draw(ctx, x - 5, y - 20);
		};

		// Define which variables and methods can be accessed
		return {
			getX: getX,
			getY: getY,
			getCol: getCol,
			setX: setX,
			setY: setY,
			update: update,
			draw: draw,
			drawBubble: drawBubble,
			drawBubbleLocal: drawBubbleLocal,
			textBubble: textBubble
		}
	};

	return Player;

});