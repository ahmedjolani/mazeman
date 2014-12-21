/**
 * Creates a Mazeman with fixed swallow angle, and
 * if not provided the default size and direction
 * in the defualt location.
 * 
 * Methods:
 *
 * <InfoObject> getInfo();
 * <void> turn();
 * <void> swallow();
 * <void> move(<direction>);
 * <void> draw();
 * <void> erase();
 *
 * @param x X-coordinate
 * @param y Y-coordinate
 * @param size radius of the Mazeman
 * @param dir direction
 */
function Mazeman(x, y, size, dir) {
	/** if arguments are not specified, use the defaults */
	this.x = (x != null) ? x : MAZEMAN.INITX;
	this.y = (y != null) ? y : MAZEMAN.INITY;
	this.size = (size != null) ? size : MAZEMAN.SIZE;
	this.direction = (dir != null) ? dir : DIRECTION.RIGHT;
	
	/** validation */
	if (this.x < 0 || this.x > CANVAS.WIDTH) {
		console.error("incorrect x value: " + this.x);
		return null;
	}
	
	if (this.y < 0 || this.y > CANVAS.HEIGHT) {
		console.error("incorrect y value: " + this.y);
		return null;
	}
	
	if (this.size < 0) {
		console.error("size can not be negative!");
		return null;
	}
	
	switch (this.direction) {
		case DIRECTION.UP:
		case DIRECTION.DOWN:
		case DIRECTION.LEFT:
		case DIRECTION.RIGHT:
			break;
		default:
			console.error("incorrect direction value: " + this.direction);
			return null;
	}
	
	/** Mazeman max angle delta */
	var ANGLEDELTA = 43.0;
	var counter = 0.0;
	var swallowMovement = MOTION.CONTRACT;
	
	/** canvas reference */
	var canvas = $("#" + CANVAS.NAME)[0];
	/** drawing angles in degrees */
	var angles = [];
	
	/** LEFT */
	angles[DIRECTION.LEFT] = {
		START : 135,
		END : 225
	};
	/** UP */
	angles[DIRECTION.UP] = {
		START : 225,
		END : 315
	};
	/** RIGHT */
	angles[DIRECTION.RIGHT] = {
		START : 315,
		END : 45
	};
	/** DOWN */
	angles[DIRECTION.DOWN] = {
		START : 45,
		END : 135
	};
	
	/** Mazeman default mouth angles */
	var startAngle = angles[this.direction].START;
	var endAngle = angles[this.direction].END;
	
	var getSwallowRate = function() {
		return (MAZEMAN.SWALLOWTIMES * ANGLEDELTA * 2.0) / FPS;
	};
	
	var getMoveRate = function() {
		return MAZEMAN.INITIALSPEED / FPS;
	};
	
	/** Get Mazeman's info */
	this.getInfo = function() {
		return {
			x : this.x,
			y : this.y,
			size : this.size,
			direction : this.direction,
			moveStep : getMoveRate()
		};
	};
	
	/** Change Mazeman's direction */
	this.turn = function(dir) {
		switch (dir) {
			case DIRECTION.UP:
			case DIRECTION.DOWN:
			case DIRECTION.LEFT:
			case DIRECTION.RIGHT:
				this.direction = dir;
				break;
			default:
				console.error("unrecognized direction: " + dir);
				return; /** fatal error */
		}
	};
	
	/** Expand/Contract Mazeman's mouth according to the fps rate */
	this.swallow = function() {
		if (angles[this.direction] == undefined) {
			console.error("unrecognized direction: " + this.direction);
			return;
		}
		
		/** update Mazeman's mouth angles */
		startAngle = angles[this.direction].START + Math.max(Math.min(counter, ANGLEDELTA), 0.0);
		endAngle = angles[this.direction].END - Math.max(Math.min(counter, ANGLEDELTA), 0.0);
		
		var swallowRate = getSwallowRate();
		
		/**
		 * if counter is more than or equal to |ANGLEDELTA|
		 * start decrementing until it hits 1, and then increment back again.
		 */
		if (counter >= ANGLEDELTA) {
			swallowMovement = MOTION.CONTRACT;
		}
		if (counter <= 0.0) {
			swallowMovement = MOTION.EXPAND;
		}
		
		swallowRate = (swallowMovement == MOTION.CONTRACT) ? swallowRate * -1.0 : swallowRate;
		counter = counter + swallowRate;
	};
	
	/** Move one step forward in Mazeman's current direction */
	this.move = function() {
		var step = getMoveRate();
		
		switch(this.direction) {
			case DIRECTION.LEFT:
				this.x = this.x - step;
				break;
			case DIRECTION.UP:
				this.y = this.y - step;
				break;
			case DIRECTION.RIGHT:
				this.x = this.x + step;
				break;
			case DIRECTION.DOWN:
				this.y = this.y + step;
				break;
			default:
				console.error("unrecognized direction: " + this.direction);
				return; /** fatal error */
		}
	};
	
	/** Draws Mazeman according to the object parameters. */
	this.draw = function() {
		var canvas2dContext = canvas.getContext("2d");
		
		/** Mazeman's first-half angles */
		firstHalfStartAngleRad = ((startAngle - 180.0) / 180.0) * Math.PI; /** 180d before the start angle */
		firstHalfEndAgnleRad = (startAngle / 180.0) * Math.PI;
		
		/** Mazeman's second-half angles */
		secondHalfStartAngleRad = (endAngle / 180.0) * Math.PI;
		secondHalfEndAngleRad = ((endAngle + 180.0) / 180.0) * Math.PI; /** 180d after the end angle */
		
		/** draw color */
		canvas2dContext.fillStyle = MAZEMAN.COLOR;
		
		/** draw first-half of Mazeman */
		canvas2dContext.beginPath();
		canvas2dContext.arc(this.x,
							this.y,
							this.size,
							firstHalfStartAngleRad,
							firstHalfEndAgnleRad,
							false); /** clockwise */
		canvas2dContext.closePath();
		canvas2dContext.fill();
		
		/** draw second-half of Mazeman */
		canvas2dContext.beginPath();
		canvas2dContext.arc(this.x,
							this.y,
							this.size,
							secondHalfStartAngleRad,
							secondHalfEndAngleRad,
							false); /** clockwise */
		canvas2dContext.closePath();
		canvas2dContext.fill();
	};
	
	/** Erase current Mazeman state */
	this.erase = function() {
		var canvas2dContext = canvas.getContext("2d");
		
		/** use the current canvas color */
		canvas2dContext.fillStyle = CANVAS.BACKGROUND_COLOR;
		canvas2dContext.beginPath();
		canvas2dContext.arc(this.x, this.y, this.size + 1.5, 0, 2 * Math.PI, false); /** draw from angle 0 to angle 360/0 */
		canvas2dContext.closePath();
		canvas2dContext.fill();
	};
	
	return this;
}
