
// Configure require.js

requirejs.config({
    baseUrl: 'js',
    shim: {
        'socketio': {
            exports: 'io'
        },
    },
    wrap: false,
    paths: {
    	game: 'modules/game',
    	socket: 'http://10.0.0.14:8000/socket.io/socket.io',
    	reqAnimFrame: 'modules/requestAnimationFrame',
        bower_cmp: '../bower_components',
        node_mod: '../node_modules'
    }
});

// Start loading the main app file. 

requirejs(['main']);