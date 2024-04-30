var gameScene; // Reference to the game scene

// Initialize Phaser
var config = {
    type: Phaser.AUTO,
    width: 503,
    height: 600,
	backgroundColor: '#a9d46e',
	    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var startButton; // Define start button object
var player; // Define player object
var patternGroup; // Define group for patterns
var gameStarted = false; // Track whether the game has started
var maxPatterns = Phaser.Math.Between(5, 15); // Randomize the initial number of patterns

var score = 0;
var scoreText;

// Preload assets like images, audio files, etc.
function preload() {
    // Add your preload code here
	this.load.setBaseURL('https://raw.githubusercontent.com/SRenan/online/gh-pages/phaser/assets/');
	this.load.image('Vwing', 'Vwing.png');
	this.load.image('enemy', 'enemy_64.png');
	this.load.image('star', 'star.png');
	this.load.image('player', 'Vwing_small.png');
}

// Create game objects and set up initial game state
function create() {
    gameScene = this; // Store reference to the scene

    

    // Create a group for patterns
    patternGroup = this.add.group();
    

	scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#c90076' });
	
    // Create start button
    startButton = this.add.text(200, 300, 'Start Game', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
        .setInteractive()
        .on('pointerdown', startGame);
		
	// Create a red rectangle at the bottom
	player = this.physics.add.sprite(250, 550, 'player');
	player.setCollideWorldBounds(true);
	
	stars = this.physics.add.group();
    this.physics.add.collider(player, stars, CollectStars, null, this);
}

// Update game logic in each frame
function update() {
    // Check if the game has started
    if (!gameStarted) {
        return; // Exit update function if the game has not started
    }

    // Move the player left if not at left edge
    if (gameScene.input.keyboard.createCursorKeys().left.isDown) {
        player.x -= 5;
    }
    
    // Move the player right if not at right edge
    if (gameScene.input.keyboard.createCursorKeys().right.isDown) {
        player.x += 5;
    }
	
	//Generate stars
	if(Phaser.Math.Between(0,60) == 1){ //I assume 60 fps so drop on average 1 star/second
		var star = stars.create(
			Phaser.Math.Between(25, 475), // Random X position within the game area
			Phaser.Math.Between(-600, -50), // Random Y position above the game area, 'bomb');
			'star');
		star.setVelocity(0, 70);
	}


    // Move patterns downward
    patternGroup.getChildren().forEach(function(pattern) {
        pattern.y += 3; // Adjust the speed of the pattern
        // Reset pattern position when it reaches the bottom
        if (pattern.y > 600) {
            pattern.destroy(); // Remove the pattern from the group
        }
    });
    // Add new patterns if the number is less than the maximum
    if (patternGroup.getLength() < maxPatterns) {
        createPattern(gameScene);
    }
}

// CollectStars
function CollectStars(player, star){
	star.disableBody(true, true);
	score += 10;
    scoreText.setText('Score: ' + score);
}

// Function to create a single pattern
function createPattern(scene) {
    /*
	var pattern = scene.add.rectangle(
        Phaser.Math.Between(25, 475), // Random X position within the game area
        Phaser.Math.Between(-600, -50), // Random Y position above the game area
        50,
        50,
        0x00ff00
    );
	*/
	var pattern = scene.add.sprite(
	    Phaser.Math.Between(25, 475), // Random X position within the game area
        Phaser.Math.Between(-600, -50), // Random Y position above the game area
		'enemy');

    patternGroup.add(pattern);
}

// Function to start the game
function startGame() {
    // Hide the start button
    startButton.setVisible(false);
    // Set gameStarted to true
    gameStarted = true;
    // Create and add patterns
    createPattern(game.scene.scenes[0]); // Pass the first scene object as a parameter
    // Enable keyboard input
    game.scene.scenes[0].input.keyboard.createCursorKeys(); // Create cursor keys for keyboard input
}
