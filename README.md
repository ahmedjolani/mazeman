mazeman
=======

Real-Time generated Maze with a Mazeman that you need to control in order to win!

The game is not fully done yet, but has the most basic elements for a game:

1. Player.
2. Scoreboard.
3. Controls.
4. Game logic.


This project is meant to be for learning purposes only, the code is not always following best practices (JavaScript makes it really hard!).


Game Objective
==============

Control Mazeman to reach the bottom-right tile in the maze to finish the game, avoid hitting walls as much as possible, hitting a wall/blocker will end the game. The player can rest on the boarder without losing the game, currently there is no constraint on doing so, there might be in the future.

Game Controls
=============

Use the following keys to control the movement of Mazeman:

<- (left arrow to turn "left" duh!)

-> (right arrow to turn "right".)

^ (up arrow to turn up.)

v (down arrow to turn down.)

shift (continuously - to speed up Mazeman, unpress to deactivate.)

Game Rules
==========

1. DO NOT hit walls/blockers (| --)
2. DO NOT move close to walls/blockers.
3. DO use boarders for resting.
4. The score is calculated according to the game complexity and distance to target, the more you spend playing the more points you lose.
5. The game starts after 5 seconds, and requires a refresh when it ends.

Future Development
==================

Mazeman might receive future development, it exited for learning purposes and for an entry to the graphics world.
