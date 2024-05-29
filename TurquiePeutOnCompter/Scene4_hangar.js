class Scene4 extends Phaser.Scene{
	constructor(){
		super("garage");
	}
	
	create(){

        	this.equipAirplaneCommon = this.add.image(config.width * 0.33 , config.height / 2, 'player')
			.setInteractive()
			.on('pointerdown',() => this.equipAirplane('player'));
		
		this.equipAirplaneRare = this.add.image(config.width * 0.66 , config.height / 2, 'playerAltStyle')
			.setInteractive()
			.on('pointerdown',() => this.equipAirplane('playerAltStyle'));

		
		let buttonBack = this.add.image(config.width / 2 , config.height *0.80, 'buttonBack')
			.setScale(0.20, 0.20)
			.setInteractive()
			.on('pointerdown',() => this.scene.start('mainMenu'));	
		
	}

	equipAirplane(choice) {
		localStorage.setItem('currentAirplane', choice);
	}
}
