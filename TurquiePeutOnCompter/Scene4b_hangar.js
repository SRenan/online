class Scene4b extends Phaser.Scene{
	constructor(){
		super("garage2");
	}
	
	create(){

		const backToMenuButton = this.add.text(400, 10, 'Back to\nmenu', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
		backToMenuButton.setInteractive()
		backToMenuButton.on('pointerdown', () => {this.scene.start('mainMenu');});

		player = this.physics.add.sprite(250, 550, player_config.sprite_key);
		player.setCollideWorldBounds(true);

		const setSkin1 = this.add.text(config.width/2, 100, 'Set skin1', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
		setSkin1.setInteractive()
		setSkin1.on('pointerdown', () => {
			player_config.sprite_key = 'player';
			player.setTexture(player_config.sprite_key);
		});
		const setSkin2 = this.add.text(config.width/2, 200, 'Set skin2', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
		setSkin2.setInteractive()
		setSkin2.on('pointerdown', () => {
			player_config.sprite_key = 'playerAltStyle';
			player.setTexture(player_config.sprite_key);
		});

	}
}
