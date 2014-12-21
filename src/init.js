INIT = "init.js";
SEP = "/";
SPECIALCHAR = "$";
BASEDIR = null;

/**
 * defines source types
 */
SRCTYPE = {
	JAVASCRIPT : "text/javascript"
};

/**
 * includes a src file in an html code
 */
function require(filename, type) {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	
	script.src = filename;
	script.type = type;
	
	head.appendChild(script);
}

/**
 * Extracts the base for the javascript source files
 */
function setBaseDir() {
	if (BASEDIR != undefined) {
		return;
	}
	
	var lastIndex = null;
	var path = null;
	var scripts = document.getElementsByTagName("script");
	for (var i = 0; i < scripts.length; ++i) {
		path = scripts[i].src.split(SEP);
		if (path[path.length - 1] == INIT) {
			BASEDIR = scripts[i].attributes.src.name;
			if (BASEDIR != undefined) {
				BASEDIR = BASEDIR + SEP;
			} else {
				BASEDIR = "";
			}
			return;
		}
	}
	
	console.error("Could not find [" + INIT + "].");
	throw "IllegalStateException";
}

/** Set the BASEDIR for javascript source files includes */
setBaseDir();

/** Constants */
require(BASEDIR + "constants.js", SRCTYPE.JAVASCRIPT);
/** Point class */
require(BASEDIR + "point.js", SRCTYPE.JAVASCRIPT);
/** Vector class */
require(BASEDIR + "vector.js", SRCTYPE.JAVASCRIPT);
/** Segment class */
require(BASEDIR + "segment.js", SRCTYPE.JAVASCRIPT);
/** Utils */
require(BASEDIR + "utils.js", SRCTYPE.JAVASCRIPT);
/** Rectangle Class */
require(BASEDIR + "rectangle.js", SRCTYPE.JAVASCRIPT);
/** Direction Class */
require(BASEDIR + "direction.js", SRCTYPE.JAVASCRIPT);
/** Tile Class */
require(BASEDIR + "tile.js", SRCTYPE.JAVASCRIPT);
/** Mazeman Class */
require(BASEDIR + "mazeman.js", SRCTYPE.JAVASCRIPT);
/** Maze Class */
require(BASEDIR + "maze.js", SRCTYPE.JAVASCRIPT);
/** Stats Class */
require(BASEDIR + "stats.js", SRCTYPE.JAVASCRIPT);
/** Game Logic */
require(BASEDIR + "gamelogic.js", SRCTYPE.JAVASCRIPT);
