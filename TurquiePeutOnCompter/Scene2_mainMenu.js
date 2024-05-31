class Scene2 extends Phaser.Scene{
	constructor(){
		super("mainMenu");
	}
	
	create(){

		//Current plane or something.
		const currentAirplane = localStorage.getItem('currentAirplane') || 'player';

		let hangarPreview = this.add.image(250, 550, currentAirplane);

		let buttonTakeoff = this.add.image(config.width / 2, config.height / 4, 'buttonTakeoff');
		let buttonGarage = this.add.image(config.width / 2, config.height / 4 + 100, 'buttonGarage');
		let buttonSettings = this.add.image(config.width / 2, config.height / 4 + 200, 'buttonSettings');
		let buttonFEARS = this.add.image(config.width / 2, config.height / 4 + 300, 'buttonFEARS');
		
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
