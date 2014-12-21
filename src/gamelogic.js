$(window).load(function() {
	var maze = new Maze();
	maze.setLevel(LEVEL.SUPEREASY).init();
	maze.generate();
	maze.draw();

	var mazeman = new Mazeman(MAZEMAN.SIZE + 3.0, MAZEMAN.SIZE + 3.0, MAZEMAN.SIZE, DIRECTION.RIGHT);
	mazeman.draw();
	
	var stats = new Stats();
	
	stats.setInitialScore(maze.getDistanceToTarget() * Math.max(TILE.HEIGHT, TILE.WIDTH))
		 .setInitialSpeed(mazeman.getInfo().moveStep) /** pixels/frame */
		 .init();

	var animate = function() {
		stats.erase();
		stats.draw();
		/** give the player more time to remember the maze */
		if (!canGameStart()) {
			return;
		}
		stats.subtractScore();
		timePlaying = timePlaying + FRAMEMILLISECONDS;
		
		var canMove = true;
		var mazemanInfo = mazeman.getInfo();
		
		var checkForDir = null;
		for (var i = 0; i < possibleDirections.length; ++i) {
			if (possibleDirections[i] == DIRECTION.NEW && turnDir != null) {
				checkForDir = turnDir;
			} else {
				checkForDir = mazemanInfo.direction;
			}
			
			canMove = checkForBorder(mazemanInfo, checkForDir);
			if (canMove == MOTION.MOVE) {
				canMove = checkForBlocker(mazemanInfo, checkForDir, maze);
				if (canMove == MOTION.MOVE) {
					mazeman.turn(checkForDir);
					break;
				}
			}
		}
		
		/** only erase and draw if Mazeman can move for efficiency */
		if (canMove == MOTION.MOVE) {
			mazeman.erase();
			mazeman.swallow();
			mazeman.move();
			mazeman.draw();
			
			if (hasWon(mazeman.getInfo(), maze)) {
				clearInterval(t);
			}
		} else if (canMove == MOTION.GAMEOVER) {
			clearInterval(t);
			stats.eraseScore();
			stats.erase();
			stats.draw();
		}
	};
	
	t = setInterval(animate, 1000.0/FPS);
});

/** register events */
$(document).keydown(function(e) {
	/** the previous instruction was not yet processed */
	if (turnDir != null && strictMode == true) {
		return;
	}
	
	switch(e.which) {
		case KEY.LEFT:
			turnDir = DIRECTION.LEFT;
			break;
		case KEY.UP:
			turnDir = DIRECTION.UP;
			break;
		case KEY.RIGHT:
			turnDir = DIRECTION.RIGHT;
			break;
		case KEY.DOWN:
			turnDir = DIRECTION.DOWN;
			break;
		case KEY.SHIFT:
			MAZEMAN.INITIALSPEED *= 1.5;
			break;
	}
});

$(document).keyup(function(e) {
	switch (e.which) {
		case KEY.SHIFT:
			MAZEMAN.INITIALSPEED /= 1.5;
			break;
	}
});
