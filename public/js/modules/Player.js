define([], function () {

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

		// Define which variables and methods can be accessed
		return {
			getX: getX,
			getY: getY,
			getCol: getCol,
			setX: setX,
			setY: setY,
			update: update,
			draw: draw
		}
	};

	return Player;

});