class Scene2 extends Phaser.Scene{
	constructor(){
		super("mainMenu");
	}
	
	create(){

		// Add a button
		
		let buttonTakeoff = this.add.image(config.width / 2, config.height / 2, 'buttonTakeoff');
		let buttonGarage = this.add.image(config.width / 2, config.height / 2 + 100, 'buttonGarage');
		let buttonSettings = this.add.image(config.width / 2, config.height / 2 + 200, 'buttonSettings');	
		
		let buttonsMainMenu = [buttonTakeoff,buttonGarage,buttonSettings];
		buttonsMainMenu.forEach(button => button.setInteractive());


		buttonTakeoff.on('pointerdown', () => {
			this.scene.start('playingGame');
		});

		buttonGarage.on('pointerdown', () => {
			this.scene.start('garage');
		});

		buttonSettings.on('pointerdown', () => {
			this.scene.start('settings');
		});
		

	}
	
	update(){

	}
}
