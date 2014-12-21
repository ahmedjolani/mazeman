/** Euclidean distance */
function distance(p1, p2) {
	return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
};

/** Point distance to line */
function distanceToLine(l, p) {
	var p1 = new Point(l.x1, l.y1);
	var p2 = new Point(l.x2, l.y2);
	return ((Math.abs((l.y2-l.y1)*p.x - (l.x2-l.x1)*p.y + (l.x2*l.y1) - (l.y2*l.x1))) / distance(p1, p2));
};

/** Point distance to line segment */
function distanceToSegment(s, p) {
	var sVector = new Vector(s.x2 - s.x1, s.y2 - s.y1); // towards x1 point from x2 point
	var pVector = new Vector(p.x - s.x1, p.y - s.y1); // towards p from x1 point

	var dotProduct = sVector.x*pVector.x + sVector.y*pVector.y;
	var sVectorSquared = sVector.x*sVector.x + sVector.y*sVector.y;

	if (dotProduct <= 0.0) { // closer to x1 point
		var p1 = new Point(s.x1, s.y1);
		return distance(p1, p);
	}

	if (sVectorSquared <= dotProduct) { // p passes by x2 point
		var p1 = new Point(s.x2, s.y2);
		return distance(p1, p);
	}

	return distanceToLine(s, p);
};

/** Check if a cirlce intersects a line segment */
function circleSegmentIntersect(s, p, radius) {
	return (distanceToSegment(s, p) <= radius);
}


function canGameStart() {
	if (startAfterFrame == 0) {
		return true;
	}
	
	startAfterFrame = startAfterFrame - 1;
	return false;
}

function getRectangleRowCol(n) {
	return {
		row : Math.floor(n / PACMAN.COLS),
		col : n % PACMAN.COLS
	};
}

function getRectangleRowColPosition(x, y) {
	return {
		row : Math.floor(y / TILE.HEIGHT),
		col : Math.floor(x / TILE.WIDTH)
	};
}

function getRectangleNumber(x, y) {
	return (y * PACMAN.COLS + x);
}

function getRectangleTopLeftPosition(x, y) {
	return {
		x : (x - (x % TILE.WIDTH)),
		y : (y - (y % TILE.HEIGHT))
	};
}

function getRectangleTopLeftNumber(n) {
	var rect = getRectangleRowCol(n);
	return {
		x : rect.col * TILE.WIDTH,
		y : rect.row * TILE.HEIGHT 
	};
}

function checkForBorder(mazemanInfo, dir) {
	var circleX = mazemanInfo.x;
	var circleY = mazemanInfo.y;
	switch (dir) {
		case DIRECTION.RIGHT:
			/** checks if Mazeman hit the right edge */
			if (mazemanInfo.x + mazemanInfo.size + mazemanInfo.moveStep > CANVAS.WIDTH) {
				return MOTION.FREEZE;
			}
			break;
		case DIRECTION.DOWN:
			/** checks if Mazeman hit the bottom edge */
			if (mazemanInfo.y + mazemanInfo.size + mazemanInfo.moveStep > CANVAS.HEIGHT) {
				return MOTION.FREEZE;
			}
			break;
		case DIRECTION.LEFT:
			/** checks if Mazeman hit the left edge */
			if (mazemanInfo.x - mazemanInfo.size - mazemanInfo.moveStep < 0) {
				return MOTION.FREEZE;
			}
			break;
		case DIRECTION.UP:
			/** checks if Mazeman hit the top edge */
			if (mazemanInfo.y - mazemanInfo.size - mazemanInfo.moveStep < 0) {
				return MOTION.FREEZE;
			}
			break;
		default:
			throw "UnrecognizedDirectionException: " + dir;
	}
	
	return MOTION.MOVE;
}

function checkForBlocker(mazemanInfo, dir, maze) {
	var mazemanTile = getRectangleRowColPosition(mazemanInfo.x, mazemanInfo.y);
	var circleCenter = null;
	
	switch (dir) {
		case DIRECTION.UP:
			circleCenter = new Point(mazemanInfo.x, CANVAS.HEIGHT - (mazemanInfo.y - mazemanInfo.moveStep));
			break;
		case DIRECTION.RIGHT:
			circleCenter = new Point(mazemanInfo.x + mazemanInfo.moveStep, CANVAS.HEIGHT - (mazemanInfo.y));
			break;
		case DIRECTION.DOWN:
			circleCenter = new Point(mazemanInfo.x, CANVAS.HEIGHT - (mazemanInfo.y + mazemanInfo.moveStep));
			break;
		case DIRECTION.LEFT:
			circleCenter = new Point(mazemanInfo.x - mazemanInfo.moveStep, CANVAS.HEIGHT - (mazemanInfo.y));
			break;
	}
	
	var nRow, nCol, rectInfo;
	for (var i = 0; i < collisionDirs[dir].length; ++i) {
		nRow = mazemanTile.row + collisionDirs[dir][i].y;
		nCol = mazemanTile.col + collisionDirs[dir][i].x;
		if (nRow < 0 || nRow >= MAZE.ROWS || nCol < 0 || nCol >= MAZE.COLS) {
			continue;
		}
		
		var nTile = maze.getTile(nRow * MAZE.COLS + nCol);
		var tileSegments = nTile.getLineSegments();
		for (var j = 0; j < tileSegments.length; ++j) {
			if (circleSegmentIntersect(tileSegments[j], circleCenter, mazemanInfo.size + 2.5)) {
				return MOTION.GAMEOVER;
			}
		}
	}
	
	return MOTION.MOVE;
}

function hasWon(mazemanInfo, maze) {
	var mazemanTile = getRectangleTopLeftPosition(mazemanInfo.x, mazemanInfo.y);
	mazemanTile = getRectangleRowColPosition(mazemanTile.x, mazemanTile.y);
	
	return maze.isTargetTile(mazemanTile.row * MAZE.COLS + mazemanTile.col);
}
