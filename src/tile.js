/**
 * Represents a Tile in a Maze.
 * 
 * Methods:
 *
 * <int> getTileNumber();
 * <<Tile, Direction>[]> getChildren();
 * <void> removeBorder(<direction>);
 * <void> draw();
 * <void> erase();
 */
function Tile(tileNumber) {
	if (tileNumber == undefined) {
		throw "IllegalStateException: tile number connot be undefined!";
	}
	if (tileNumber < 0) {
		throw "IllegalStateException: tile number cannot be negative!";
	}
	
	this.tileNumber = tileNumber;
	this.row = Math.floor(tileNumber / MAZE.COLS);
	this.col = Math.floor(tileNumber % MAZE.COLS);
	this.boarder = [];
	
	this.boarder[DIRECTION.UP] = true;
	this.boarder[DIRECTION.RIGHT] = true;
	this.boarder[DIRECTION.DOWN] = true;
	this.boarder[DIRECTION.LEFT] = true;
	
	var shuffle = function(a) {
		var j, x;
		for (var i = a.length-1; i >= 0; --i) {
			j = Math.floor(Math.random() * (i+1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	
	var getTileDirectionPair = function(tileNumber, direction) {
		return {
			tile : new Tile(tileNumber),
			direction : new Direction(direction)
		};
	}
	
	var drawSegments = function(color) {
		var segments = this.getLineSegments();
		var canvas2dContext = canvas.getContext("2d");
		
		canvas2dContext.strokeStyle = color;
		
		for (var i = 0; i < segments.length; ++i) {
			canvas2dContext.beginPath();
			canvas2dContext.moveTo(segments[i].x1, CANVAS.HEIGHT - segments[i].y1);
			canvas2dContext.lineTo(segments[i].x2, CANVAS.HEIGHT - segments[i].y2);
			canvas2dContext.stroke();
			canvas2dContext.closePath();
		}
	}
	
	this.getTileNumber = function() {
		return this.tileNumber;
	}
	
	this.getChildren = function() {
		var validTiles = [];
		var newRow, newCol;
		
		for (var i = 0; i < MOVES.length; ++i) {
			newRow = this.row + MOVES[i].row;
			newCol = this.col + MOVES[i].col;
			if (newRow < 0 || newCol < 0 || newRow >= MAZE.ROWS || newCol >= MAZE.COLS) {
				continue;
			}
			
			validTiles[validTiles.length] = getTileDirectionPair(newRow * MAZE.COLS + newCol, MOVES[i].direction);
		}
		return shuffle(validTiles);
	}
	
	this.removeBoarder = function(direction) {
		if (this.boarder[direction] == undefined) {
			throw "IllegalStateException: " + direction + " is undefined!";
		}
		
		this.boarder[direction] = false;
	}
	
	this.getLineSegments = function() {
		var segments = [];
		var x = this.col * TILE.WIDTH;
		var y = this.row * TILE.HEIGHT;
		
		if (this.boarder[DIRECTION.UP] && this.row > 0) {
			segments[segments.length] = new Segment(
				new Point(x, CANVAS.HEIGHT - y),
				new Point(x + TILE.WIDTH, CANVAS.HEIGHT - y));
		}
		
		if (this.boarder[DIRECTION.RIGHT] && this.col < (MAZE.COLS - 1)) {
			segments[segments.length] = new Segment(
				new Point(x + TILE.WIDTH, CANVAS.HEIGHT - y),
				new Point(x + TILE.WIDTH, CANVAS.HEIGHT - (y + TILE.HEIGHT)));
		}
		
		if (this.boarder[DIRECTION.DOWN] && this.row < (MAZE.ROWS - 1)) {
			segments[segments.length] = new Segment(
				new Point(x, CANVAS.HEIGHT - (y + TILE.HEIGHT)),
				new Point(x + TILE.WIDTH, CANVAS.HEIGHT - (y + TILE.HEIGHT)));
		}
		
		if (this.boarder[DIRECTION.LEFT] && this.col > 0) {
			segments[segments.length] = new Segment(
				new Point(x, CANVAS.HEIGHT - y),
				new Point(x, CANVAS.HEIGHT - (y + TILE.HEIGHT)));
		}
		
		return segments;
	}
	
	this.draw = function() {
		drawSegments.call(this, TILE.COLOR);
	}
	
	this.erase = function() {
		drawSegments.call(this, CANVAS.BACKGROUND_COLOR);
	}
}