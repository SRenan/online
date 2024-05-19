// Initialize Phaser
var config = {
	type: Phaser.AUTO,
	width: 500,
	height: 600,
	backgroundColor: '#a9d46e',
	physics: {
        	default: 'arcade',
        		arcade: {
            			gravity: { y: 0 },
            			debug: false
			}
	},
	scene: [Scene1, Scene2,Scene3,Scene4,Scene5,Scene6]
}


var game = new Phaser.Game(config);
var player;
var stars;
var enemies;

var startButton;
var backToMenuButton;
var gameStarted = false; // Track whether the game has started
var score = 0;
var scoreText;
var startTime; // Variable to store the start time when the game starts
var elapsedTime = 0; // Variable to track the elapsed time
var elapsedTimeText;


var soundCanOpen;

function startGame() {
	// Hide the start button
    startButton.setVisible(false);
    // Set gameStarted to true
    gameStarted = true;
	// Store the start time
	startTime = game.time.now;
}