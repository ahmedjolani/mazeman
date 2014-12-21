/**
 * Represents player's direction.
 *
 * Methods:
 * 
 */
function Direction(direction) {
	var oppositeDirection = [];
	
	oppositeDirection[DIRECTION.UP] = DIRECTION.DOWN;
	oppositeDirection[DIRECTION.DOWN] = DIRECTION.UP;
	oppositeDirection[DIRECTION.RIGHT] = DIRECTION.LEFT;
	oppositeDirection[DIRECTION.LEFT] = DIRECTION.RIGHT;
	
	if (oppositeDirection[direction] == undefined) {
		throw "IllegalStateException: " + direction + " direction is undefined!";
	}
	
	this.direction = direction;
	
	this.getDirection = function() {
		return this.direction;
	}
	
	this.getOppositeDirection = function() {
		return oppositeDirection[this.direction];
	}
}