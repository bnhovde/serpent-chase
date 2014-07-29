
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
    	game: 'modules/_game',
    	settings: 'modules/_settings',
    	reqAnimFrame: 'modules/_requestAnimationFrame',
    	socket: 'http://10.0.0.14:8000/socket.io/socket.io'
    }
});

// Start loading the main app file. 

requirejs(['main']);