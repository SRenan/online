class Scene4 extends Phaser.Scene{
	constructor(){
		super("garage");
	}
	
	create(){

        	this.equipAirplaneCommon = this.add.image(config.width * 0.33 , config.height / 2, 'airplane.png')
			.setInteractive()
			.on('pointerdown',() => this.equipAirplane('airplane.png'));
		
		this.equipAirplaneRare = this.add.image(config.width * 0.66 , config.height / 2, 'airplane_rare.png')
			.setInteractive()
			.on('pointerdown',() => this.equipAirplane('airplane_rare.png'));

		s
		
		let buttonBack = this.add.image(config.width / 2 , config.height *0.66, 'buttonBack.png');
			.setInteractive()
			.on('pointerdown',() => this.scene.start('mainMenu'));	
		
	}

	equipAirplane(choice) {
		localStorage.setItem('currentPlane', choice);
	}
}
