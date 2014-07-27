
/**************************************************
** GAME PLAYER CLASS
**************************************************/

var Player = function(startX, startY, randomCol) {
	var x = startX,
		y = startY,
		color = randomCol,
		id;

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

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getCol: getCol,
		setX: setX,
		setY: setY,
		id: id
	}
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;