// Initialize Phaser
var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player; // Define player object
var patternGroup; // Define group for patterns

// Preload assets like images, audio files, etc.
function preload() {
    // Add your preload code here
}

// Create game objects and set up initial game state
function create() {
    // Add your create code here
    
    // Create a red rectangle at the bottom
    player = this.add.rectangle(250, 575, 50, 25, 0xff0000);

    // Create a group for patterns
    patternGroup = this.add.group();
    
    // Create and add patterns
    createPatterns.call(this);

    // Enable keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
}

// Update game logic in each frame
function update() {
    
    // Move the player left if not at left edge
    if (this.cursors.left.isDown && player.x > 25) {
        player.x -= 5;
    }
    
    // Move the player right if not at right edge
    if (this.cursors.right.isDown && player.x < 475) { // Adjusted to 475
        player.x += 5;
    }

    // Move patterns downward
    patternGroup.getChildren().forEach(function(pattern) {
        pattern.y += 3; // Adjust the speed of the pattern
        // Reset pattern position when it reaches the bottom
        if (pattern.y > 600) {
            pattern.y = -50; // Adjust this value depending on pattern height
        }
    });
}

// Create patterns and add them to the group
function createPatterns() {
    // Add your pattern creation code here
    for (var i = 0; i < 5; i++) {
        var pattern = this.add.rectangle(50 * i + 25, -50 * i, 50, 50, 0x00ff00);
        patternGroup.add(pattern);
    }
}
