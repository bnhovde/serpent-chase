
define([
  'socket',
  'settings',
  'models/Keys',
  'models/Player'
],

function (io, settings, Keys, Player) {

  'use strict';

	/**************************************************
	** GAME VARIABLES & SETTINGS
	**************************************************/

	var canvas,			// Canvas DOM element
		ctx,			// Canvas rendering context
		keys,			// Keyboard input
		localPlayer,	// Local player
		remotePlayers,	// Remote players
		socket,			// Socket connection
		s; 				// Settings short


	/**************************************************
	** GAME INITIALISATION
	**************************************************/

	function init() {

		// Import settings
		s = settings;

		// Declare the canvas and rendering context
		canvas = document.getElementById("gameCanvas");
		ctx = canvas.getContext("2d");

		// Maximise the canvas (limit to window width)
		canvas.width = s.canvasWidth;
		canvas.height = s.canvasHeight;

		// Calculate one canvas unit
		s.canvasUnit = s.canvasWidth / s.gridSquares;

		// Initialise keyboard controls
		keys = new Keys();

		// Calculate a random start position for the local player
		// The minus half a player size stops the player being
		// placed right on the egde of the screen
		var startX = Math.round( Math.random() * (canvas.width - (s.canvasUnit / 2) ) ),
			startY = Math.round( Math.random() * (canvas.height - (s.canvasUnit / 2) ) );

		var randomCol = getRandomColor();

		// Initialise the local player
		localPlayer = new Player(startX, startY, randomCol);

		// Initialise socket connection
		socket = io.connect('http://' + s.serverIP + ':8000');

		// Initialise remote players array
		remotePlayers = [];

		// Start listening for events
		setEventHandlers();
	};


	/**************************************************
	** GAME EVENT HANDLERS
	**************************************************/

	function setEventHandlers() {

		// Keyboard
		window.addEventListener("keydown", onKeydown, false);
		window.addEventListener("keyup", onKeyup, false);

		// Socket connection successful
		socket.on("connect", onSocketConnected);

		// Socket disconnection
		socket.on("disconnect", onSocketDisconnect);

		// New player message received
		socket.on("new player", onNewPlayer);

		// Player move message received
		socket.on("move player", onMovePlayer);

		// Player removed message received
		socket.on("remove player", onRemovePlayer);
	};

	// Keyboard key down
	function onKeydown(e) {
		if (localPlayer) {
			keys.onKeyDown(e);
		};
	};

	// Keyboard key up
	function onKeyup(e) {
		if (localPlayer) {
			keys.onKeyUp(e);
		};
	};

	// Socket connected
	function onSocketConnected() {
		console.log("Connected to socket server");

		// Send local player data to the game server
		socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), color: localPlayer.getCol()});
	};

	// Socket disconnected
	function onSocketDisconnect() {
		console.log("Disconnected from socket server");
	};

	// New player
	function onNewPlayer(data) {
		console.log("New player connected: " + data.id);

		// Initialise the new player
		var newPlayer = new Player(data.x, data.y, data.color);
		newPlayer.id = data.id;

		// Add new player to the remote players array
		remotePlayers.push(newPlayer);
	};

	// Move player
	function onMovePlayer(data) {
		var movePlayer = playerById(data.id);

		// Player not found
		if (!movePlayer) {
			console.log("Player not found: " + data.id);
			return;
		};

		// Update player position
		movePlayer.setX(data.x);
		movePlayer.setY(data.y);
	};

	// Remove player
	function onRemovePlayer(data) {
		var removePlayer = playerById(data.id);

		// Player not found
		if (!removePlayer) {
			console.log("Player not found: " + data.id);
			return;
		};

		// Remove player from array
		remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
	};


	/**************************************************
	** GAME ANIMATION LOOP
	**************************************************/

	function animate() {

		// Request a new animation frame using Paul Irish's shim
		// placing the rAF *before* the render() to assure as close to
		// 60fps with the setTimeout fallback.
		window.requestAnimFrame(animate);

		update();
		draw();
	};


	/**************************************************
	** GAME UPDATE
	**************************************************/

	function update() {
		// Update local player and check for change
		if (localPlayer.update(keys)) {
			// Send local player data to the game server
			socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
		};
	};


	/**************************************************
	** GAME DRAW
	**************************************************/

	function draw() {
		// Wipe the canvas clean
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the local player
		localPlayer.draw(ctx);

		// Draw the remote players
		var i;
		for (i = 0; i < remotePlayers.length; i++) {
			remotePlayers[i].draw(ctx);
		};
	};


	/**************************************************
	** GAME HELPER FUNCTIONS
	**************************************************/

	// Find player by ID
	function playerById(id) {
		var i;
		for (i = 0; i < remotePlayers.length; i++) {
			if (remotePlayers[i].id == id)
				return remotePlayers[i];
		};
		
		return false;
	};

	// generate radnddm hex color (needs refactoring to prevent whites)
	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	};

	// Expose functions to the outside object

	return {
	    init: init,
	    animate: animate
	}


});