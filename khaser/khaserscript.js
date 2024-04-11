// Initialize Phaser
var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// Preload assets like images, audio files, etc.
function preload() {
    // Add your preload code here
}

// Create game objects and set up initial game state
function create() {
    // Add your create code here
    
    // Create a red rectangle at the bottom
    player = this.add.rectangle(150, 575, 50, 25, 0xff0000);

    // Enable keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
}

// Update game logic in each frame
function update() {
    // Add your update code here
    
    // Move the player left
    if (this.cursors.left.isDown) {
        player.x -= 5;
    }
    
    // Move the player right
    if (this.cursors.right.isDown) {
        player.x += 5;
    }
}
