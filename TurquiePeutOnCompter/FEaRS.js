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
	scene: [Scene1, Scene2,Scene3,Scene4,Scene5]
}

var game = new Phaser.Game(config);
