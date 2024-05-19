class Scene2 extends Phaser.Scene{
	constructor(){
		super("mainMenu");
	}
	
	create(){

		// Add a button
		
		let buttonTakeoff = this.add.image(config.width / 2, config.height / 3, 'buttonTakeoff');
		let buttonGarage = this.add.image(config.width / 2, config.height / 3 + 100, 'buttonGarage');
		let buttonSettings = this.add.image(config.width / 2, config.height / 3 + 200, 'buttonSettings');
		let buttonFEARS = this.add.image(config.width / 2, config.height / 3 + 300, 'buttonFEARS');
		
		let buttonsMainMenu = [buttonTakeoff,buttonGarage,buttonSettings,buttonFEARS];
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
		
		buttonFEARS.on('pointerdown', () => {
			this.scene.start('FEARS');
		});
		

	}
	
	update(){

	}
}
