/**
 * Represents a rectangle
 */
function Rectangle(x, y, width, height, color, canvas) {	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = (color != undefined) ? color : RECTANGLE.COLOR;
	this.canvas = (canvas != undefined) ? canvas : CANVAS;

	/**
	 * returns an Array of segments for the current Rectangle object
	 */
	this.getSegments = function() {
		var leftSegment = new Segment(new Point(this.x, this.canvas.HEIGHT - (this.y)),
			new Point(this.x, this.canvas.HEIGHT - (this.y+this.height)));
		var topSegment = new Segment(new Point(this.x, this.canvas.HEIGHT - (this.y)),
			new Point(this.x+this.width, this.canvas.HEIGHT - (this.y)));
		var rightSegment = new Segment(new Point(this.x+this.width, this.canvas.HEIGHT - (this.y)),
			new Point(this.x+this.width, this.canvas.HEIGHT - (this.y+this.height)));
		var bottomSegment = new Segment(new Point(this.x, this.canvas.HEIGHT - (this.y+this.height)),
			new Point(this.x+this.width, this.canvas.HEIGHT - (this.y+this.height)));

		return [
			leftSegment,
			topSegment,
			rightSegment,
			bottomSegment
		];
	}
	
	this.draw = function() {
		var canvas2dContext = $("#" + this.canvas.NAME)[0].getContext("2d");
		
		canvas2dContext.fillStyle = this.color;
		
		canvas2dContext.beginPath();
		canvas2dContext.rect(this.x, this.y, this.width, this.height);
		canvas2dContext.closePath();
		canvas2dContext.fill();
	};

	this.erase = function() {
		var canvas2dContext = $("#" + this.canvas.NAME)[0].getContext("2d");

		canvas2dContext.fillStyle = this.canvas.BACKGROUND_COLOR;

		canvas2dContext.beginPath();
		canvas2dContext.rect(this.x, this.y, this.width, this.height);
		canvas2dContext.closePath();
		canvas2dContext.fill();
	};
}
