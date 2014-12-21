/** initial fps */
FPS = 60;
FRAMEMILLISECONDS = (1/FPS);
/** Pacman direction */
turnDir = null;
/** strict mode does retry proposed turns */
strictMode = false;
EPS = 1e-9;
/** calculated in seconds */
timePlaying = 0.0;

startAfterFrame = FPS * 5; /* start after 5 seconds */

collisionDirs = null;


/** Pacman constants */
MAZEMAN = {
	COLOR : "rgba(255, 200, 0, 1.0)", /** orange */
	INITX : 100,
	INITY : 100,
	INITIALSPEED : 50, /** pixels/second */
	PADDING: 8,
	SIZE : 12,
	SWALLOWTIMES : 7 /** swallow times per seconds. Used for Pacman's mouth movement */
};

RECTANGLE = {
	COLOR : "rgba(255, 200, 0, 1.0)" /** orange */
};

/** Main canvas constants */
CANVAS = {
	HEIGHT : null,
	WIDTH : null,
	BACKGROUND_COLOR : "rgba(0, 0, 0, 1.0)", /** black */
	NAME : "mazeman"
};

/** Stats canvas constants */
STATSCANVAS = {
	HEIGHT : null,
	WIDTH : null,
	SCOREFACTOR : 0.0,
	COLOR : "black",
	BACKGROUND_COLOR : "rgba(255, 200, 0, 1.0)", /** dark gray */
	NAME : "stats"
};

/** arrow codes */
KEY = {
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40,
	SHIFT : 16
};

/** Pacman directions */
DIRECTION = {
	LEFT : "LEFT",
	UP : "UP",
	RIGHT : "RIGHT",
	DOWN : "DOWN",
	NEW : "NEW",
	CURRENT : "CURRENT"
};

MOTION = {
	EXPAND : "EXPAND",
	CONTRACT : "CONTRACT",
	GAMEOVER : "GAMEOVER",
	FREEZE : "FREEZE",
	MOVE : "MOVE",
	WON : "WON"
};

MAZE = {
	ROWS : null,
	COLS : null
};

/** Tile possible states */
TILE = {
	VISITED : "VISITED",
	NOT_VISITED : "NOTVISITED",
	COLOR : "rgba(255, 200, 0, 1.0)", /** orange */
	WIDTH : null,
	HEIGHT : null
};

/** Difficulty levels */
LEVEL = {
	SUPEREASY : "SUPEREASY",
	EASY : "EASY",
	MEDIUM : "MEDIUM",
	HARD : "HARD"
};



/** Used to select the tiles to be checked for collision with Pacman's object */
collisionDirs = [];
collisionDirs[DIRECTION.UP] = [
	{
		x : -1.0,
		y : -1.0
	},
	{
		x : 0.0,
		y : -1.0
	},
	{
		x : +1.0,
		y : -1.0
	}
];

collisionDirs[DIRECTION.RIGHT] = [
	{
		x : +1.0,
		y : -1.0
	},
	{
		x : +1.0,
		y : 0.0
	},
	{
		x : +1.0,
		y : +1.0
	}
];

collisionDirs[DIRECTION.DOWN] = [
	{
		x : +1.0,
		y : +1.0
	},
	{
		x : 0.0,
		y : +1.0
	},
	{
		x : -1.0,
		y : +1.0
	}
];

collisionDirs[DIRECTION.LEFT] = [
	{
		x : -1.0,
		y : +1.0
	},
	{
		x : -1.0,
		y : 0.0
	},
	{
		x : -1.0,
		y : -1.0
	}
];

/** describes valid traversal moves */
var MOVES = [];

/** up */
MOVES[0] = {
	col : 0,
	row : -1,
	direction : DIRECTION.UP
};

/** right */
MOVES[1] = {
	col : 1,
	row : 0,
	direction : DIRECTION.RIGHT
};

/** down */
MOVES[2] = {
	col : 0,
	row : 1,
	direction : DIRECTION.DOWN
};

/** left */
MOVES[3] = {
	col : -1,
	row : 0,
	direction : DIRECTION.LEFT
};

canvas = $("#" + CANVAS.NAME)[0];
statsCanvas = $("#" + STATSCANVAS.NAME)[0];
possibleDirections = [DIRECTION.NEW, DIRECTION.CURRENT];

CANVAS.WIDTH = canvas.width;
CANVAS.HEIGHT = canvas.height;
STATSCANVAS.WIDTH = statsCanvas.width;
STATSCANVAS.HEIGHT = statsCanvas.height;
