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
		let buttonGarage2 = this.add.image(config.width / 2, config.height / 4 + 200, 'buttonGarage');
		let buttonSettings = this.add.image(config.width / 2, config.height / 4 + 300, 'buttonSettings');
		
		let buttonsMainMenu = [buttonTakeoff,buttonGarage,buttonGarage2,buttonSettings];
		buttonsMainMenu.forEach(button => button.setInteractive());


		buttonTakeoff.on('pointerdown', () => {
			this.scene.start('playingGame');
		});
		buttonGarage.on('pointerdown', () => {
			this.scene.start('garage');
		});
		buttonGarage2.on('pointerdown', () => {
			this.scene.start('garage2');
		});
		buttonSettings.on('pointerdown', () => {
			this.scene.start('settings');
		});		
	}
	
	update(){
	}
}
