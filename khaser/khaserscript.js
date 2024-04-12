var gameScene; // Reference to the game scene

// Initialize Phaser
var config = {
    type: Phaser.AUTO,
    width: 501,
    height: 600,
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

// Preload assets like images, audio files, etc.
function preload() {
    // Add your preload code here
}

// Create game objects and set up initial game state
function create() {
    gameScene = this; // Store reference to the scene

    // Create a red rectangle at the bottom
    player = this.add.rectangle(250, 575, 50, 25, 0xff0000);

    // Create a group for patterns
    patternGroup = this.add.group();
    
    // Create start button
    startButton = this.add.text(200, 300, 'Start Game', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
        .setInteractive()
        .on('pointerdown', startGame);
}

// Update game logic in each frame
function update() {
    // Check if the game has started
    if (!gameStarted) {
        return; // Exit update function if the game has not started
    }

    // Move the player left if not at left edge
    if (gameScene.input.keyboard.createCursorKeys().left.isDown && player.x > 25) {
        player.x -= 5;
    }
    
    // Move the player right if not at right edge
    if (gameScene.input.keyboard.createCursorKeys().right.isDown && player.x < 475) {
        player.x += 5;
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
        createPattern();
    }
}

// Function to create a single pattern
function createPattern(scene) {
    var pattern = scene.add.rectangle(
        Phaser.Math.Between(25, 475), // Random X position within the game area
        Phaser.Math.Between(-600, -50), // Random Y position above the game area
        50,
        50,
        0x00ff00
    );
    patternGroup.add(pattern);
}

// Function to start the game
function startGame() {
    // Hide the start button
    startButton.setVisible(false);
    // Set gameStarted to true
    gameStarted = true;
    // Create and add patterns
    createPattern(this); // Pass the scene object as a parameter
    // Enable keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
}

