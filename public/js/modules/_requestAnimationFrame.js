define(['settings'], function (s) {

	// shim layer with setTimeout fallback by Paul Irih

	var fps = s.fps;

	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       || 
	          window.webkitRequestAnimationFrame || 
	          window.mozRequestAnimationFrame    || 
	          window.oRequestAnimationFrame      || 
	          window.msRequestAnimationFrame     || 
	          function(/* function */ callback, /* DOMElement */ element){
	            window.setTimeout(callback, 1000 / fps);
	          };
	})();

// usage:
// instead of setInterval(render, 16) ....

// (function animloop(){
//   requestAnimFrame(animloop);
//   render();
// })();

// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.

});