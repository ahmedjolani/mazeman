/**
 * A class that keeps a record of the:
 *  1) FPS.
 *  2) Score.
 *  3) Speed.
 *  4) Difficulty.
 *  5) Non-motivational speech (for fun lol).
 */
function Stats() {
	this.score = 0;
	this.initialSpeed = 0.0;
	this.subtractionFactor = 0.0;
	
	var drawFps = function() {
		var canvas2dContext = statsCanvas.getContext("2d");
		
		canvas2dContext.fillStyle = STATSCANVAS.COLOR;
		canvas2dContext.font = "12pt Courier";
		
		/** FPS */
		canvas2dContext.fillText(FPS + " fps", 10, 15);
	};
	
	var drawScore = function() {
		var canvas2dContext = statsCanvas.getContext("2d");
		
		canvas2dContext.fillStyle = STATSCANVAS.COLOR;
		canvas2dContext.font = "12pt Courier";
		
		canvas2dContext.fillText("Score " + Math.ceil(this.score), 10, 34);
	}
	
	var drawWait = function() {
		var canvas2dContext = statsCanvas.getContext("2d");
		
		canvas2dContext.fillStyle = STATSCANVAS.COLOR;
		canvas2dContext.font = "12pt Courier";
		
		canvas2dContext.fillText("Score " + Math.ceil(this.score), 10, 34);
	}
	
	this.setInitialScore = function(score) {
		this.score = Math.ceil(score);
		return this;
	};
	
	this.setInitialSpeed = function(speed) {
		this.initialSpeed = speed;
		return this;
	};
	
	this.subtractScore = function() {
		this.score = Math.max(this.score - this.subtractionFactor, 0.0);
	}
	
	this.init = function() {
		this.score *= STATSCANVAS.SCOREFACTOR;
		this.subtractionFactor = this.initialSpeed;
	}
	
	this.eraseScore = function() {
		this.score = 0;
		return this;
	}
	
	this.draw = function() {
		drawFps();
		drawScore.call(this);
		return this;
	};
	
	this.wait = function() {
		//
	}
	
	this.start = function() {
		//
	}
	
	this.erase = function() {
		var rect = new Rectangle(0, 0, STATSCANVAS.WIDTH, STATSCANVAS.HEIGHT, STATSCANVAS.BACKGROUND_COLOR, STATSCANVAS);
		rect.draw();
		return this;
	};
	
}