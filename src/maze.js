/**
 * Represents a maze
 */
function Maze() {
	/** stores the state of a tile {|VISITED| or |NOT_VISITED|} */
	this.tiles = [];
	this.usedTiles = 0;
	this.startTile = 0;
	this.endTile = -1;
	
	var levelFunctions = [];
	
	levelFunctions[LEVEL.SUPEREASY] = function() {
		MAZE.ROWS = 12;
		MAZE.COLS = 20;
		MAZEMAN.INITIALSPEED = 100;
		STATSCANVAS.SCOREFACTOR = 1.0;
	};
	
	levelFunctions[LEVEL.EASY] = function() {
		MAZE.ROWS = 20;
		MAZE.COLS = 30;
		MAZEMAN.INITIALSPEED = 100;
		STATSCANVAS.SCOREFACTOR = 1.5;
	};
	
	levelFunctions[LEVEL.MEDIUM] = function() {
		MAZE.ROWS = 30;
		MAZE.COLS = 40;
		MAZEMAN.INITIALSPEED = 50;
		STATSCANVAS.SCOREFACTOR = 2.0;
	};
	
	levelFunctions[LEVEL.HARD] = function() {
		MAZE.ROWS = 40;
		MAZE.COLS = 50;
		MAZEMAN.INITIALSPEED = 30;
		STATSCANVAS.SCOREFACTOR = 4.0;
	};
	
	this.init = function() {
		this.endTile = MAZE.ROWS * MAZE.COLS - 1;
		
		for (var i = 0; i <= this.endTile; ++i) {
			this.tiles[i] = {
				state : TILE.NOT_VISITED,
				tile : null, /** the Depth-First-Search fills this */
				distanceFromSource : 0
			};
		}
	};
	
	this.isTargetTile = function(tileNumber) {
		return tileNumber == this.endTile;
	};
	
	this.getDistanceToTarget = function() {
		return this.tiles[this.endTile].distanceFromSource;
	}
	
	this.setLevel = function(level) {
		if (levelFunctions[level] == undefined) {
			throw "IllegalStateException: " + level + " is undefined!";
		}
	
		/** setting the Maze complexity level */
		levelFunctions[level]();
		TILE.HEIGHT = CANVAS.HEIGHT / MAZE.ROWS;
		TILE.WIDTH = CANVAS.WIDTH / MAZE.COLS;
		MAZEMAN.SIZE = Math.min(TILE.HEIGHT, TILE.WIDTH) * 0.25;
		return this;
	}
	
	this.getTile = function(tileNumber) {
		if (tileNumber < 0 || tileNumber > this.endTile) {
			throw "IllegalStateException: incorrect tile " + tileNumber + "!";
		}
		
		return this.tiles[tileNumber].tile;
	}
	
	this.generate = function() {
		var dfs = function(tile) {
			var children = tile.getChildren();
			
			for (var i = 0; i < children.length; ++i) {
				if (this.tiles[children[i].tile.getTileNumber()].state != TILE.NOT_VISITED) {
					continue;
				}
				
				var child = children[i].tile;
				var direction = children[i].direction;
				
				tile.removeBoarder(direction.getDirection());
				child.removeBoarder(direction.getOppositeDirection());
				
				this.tiles[child.getTileNumber()].state = TILE.VISITED;
				this.tiles[child.getTileNumber()].tile = child;
				this.tiles[child.getTileNumber()].distanceFromSource =
					this.tiles[tile.getTileNumber()].distanceFromSource + 1;
				
				dfs.call(this, child);
			}
		}
		
		this.tiles[this.startTile].state = TILE.VISITED;
		this.tiles[this.startTile].tile = new Tile(this.startTile);
		dfs.call(this, this.tiles[this.startTile].tile);
		
		return this;
	};
	
	this.draw = function() {
		for (var i = 0; i <= this.endTile; ++i) {
			this.tiles[i].tile.draw();
		}
		
		return this;
	};
	
	this.erase = function() {
		for (var i = 0; i <= this.endTile; ++i) {
			this.tiles[i].tile.erase();
		}
		
		return this;
	}
}
