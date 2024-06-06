// Initialize Phaser
var config = {
	type: Phaser.AUTO,
	width: 500,
	height: 600,
	backgroundColor: '#ADD8E6',
	physics: {
        	default: 'arcade',
        		arcade: {
            			gravity: { y: 0 },
            			debug: false
			}
	},
	scene: [Scene1, Scene2, Scene3, Scene4, Scene4b, Scene5, Scene6]
}


var game = new Phaser.Game(config);
var player;
var player_config = {
	player_name: 'player',
	sprite_key: 'player'
}
var stars;
var enemies;
var player_projectiles;

