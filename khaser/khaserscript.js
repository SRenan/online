var gameScene; // Reference to the game scene

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
var startTime; // Variable to store the start time when the game starts
var elapsedTime = 0; // Variable to track the elapsed time

// Preload assets like images, audio files, etc.
function preload() {
    // Add your preload code here
	this.load.setBaseURL('https://raw.githubusercontent.com/SRenan/online/gh-pages/phaser/assets/');
	this.load.image('Vwing', 'Vwing.png');
	this.load.image('enemy', 'enemy_64.png');
	this.load.image('star', 'star.png');
	this.load.image('player', 'Vwing_small.png');

	//load sounds
	this.load.audio('coin-return', 'coin-return.mp3');
	this.load.audio('can-open', 'can-open.mp3');
}

// Create game objects and set up initial game state
function create() {
    gameScene = this; // Store reference to the scene

    //add sounds, vérifier si c'est bien l'endroit ou le faire
	soundCoinReturn = this.sound.add('coin-return');
	soundCanOpen = this.sound.add('can-open');
	soundCanOpen.play();

	// Create a group for patterns
	patternGroup = this.add.group();
    


	
	// Create start button
	startButton = this.add.text(200, 300, 'Start Game', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
        .setInteractive()
        .on('pointerdown', startGame);
		
	// Create player
	player = this.physics.add.sprite(250, 550, 'player');
	player.setCollideWorldBounds(true);
	
	// Other elements
	stars = this.physics.add.group();
	this.physics.add.collider(player, stars, CollectStars, null, this);
	enemies = this.physics.add.group();
	this.physics.add.collider(player, enemies, EnemyCollision, null, this);
	
	//TODO: Figure out how to keep interface on top
	scoreText = this.add.text(16, 16, 'SCore: 0', { fontSize: '32px', fill: '#c90076' });
	// Add a text object to display elapsed time
    	elapsedTimeText = this.add.text(16, 48, 'Elapsed Time: 0', { fontSize: '24px', fill: '#ffffff' });
}

// Update game logic in each frame
function update(time, delta) {
    // Check if the game has started
    if (!gameStarted) {
        return; // Exit update function if the game has not started
    }

    // Controls
    if (gameScene.input.keyboard.createCursorKeys().left.isDown) {
        player.x -= 5;
    }
    if (gameScene.input.keyboard.createCursorKeys().right.isDown) {
        player.x += 5;
    }
	
    // Calculate elapsed time since the game started
    elapsedTime = time - startTime;
    // Update text to display elapsed time in seconds
    elapsedTimeText.setText('Elapsed Time: ' + (elapsedTime / 1000).toFixed(2) + 's');

	//Generate stars
	if(Phaser.Math.Between(0,60) == 1){ //I assume 60 fps so drop on average 1 star/second
		var star = stars.create(
			Phaser.Math.Between(25, 475), // Random X position within the game area
			Phaser.Math.Between(-600, -50), // Random Y position above the game area, 'bomb');
			'star');
		star.setVelocity(0, 70);
	}
	
	if(Phaser.Math.Between(0,60) == 1){ //I assume 60 fps so drop on average 1 star/second
		var enemy = enemies.create(
			Phaser.Math.Between(25, 475), // Random X position within the game area
			Phaser.Math.Between(-600, -50), // Random Y position above the game area, 'bomb');
			'enemy');
		enemy.setVelocity(0, 150);
	}


    // Check if score is 50
    if (score >= 50) {
        // Switch to Scene1
        game.scene.start('Scene1', { elapsedTime: elapsedTime });
    }
	
}

// CollectStars
function CollectStars(player, star){
	star.disableBody(true, true);
	score += 10;
	soundCoinReturn.play(); //KKK tests audio
    scoreText.setText('Score: ' + score);
}

function EnemyCollision(player, enemy){
	enemy.disableBody(true, true);
	score = score-5;
	soundCanOpen.play(); //KKK tests audio
	scoreText.setText('Score: ' + score);
	if(score < 0){
		this.physics.pause();
		//TODO: Go to menu or at least reset everything
		startButton.setVisible(true);
		scoreText.setText('Score: ' + score + '\n Game Over!');
		gameOver = true;
	}
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
	// Store the start time
	startTime = gameScene.time.now;
	// Create and add patterns
	createPattern(game.scene.scenes[0]); // Pass the first scene object as a parameter
	// Enable keyboard input
	game.scene.scenes[0].input.keyboard.createCursorKeys(); // Create cursor keys for keyboard input
}

