class Scene4 extends Phaser.Scene{
	constructor(){
		super("garage");
	}

	create(){
		let selectbox = this.add.image(config.width * 0.5 , config.height * 0.2, 'unlock');
	}
	
}
/*	
	create(){

		this.anims.create({
			key: 'smoke_effect',
			frames: this.anims.generateFrameNumbers('smoke_sheet', {start: 0, end: 6}),
			frameRate: 5,
			repeat: 1
		});
		

		
        	this.equipAirplaneCommon = this.add.image(config.width * 0.66 , config.height / 2, 'player')
			.setInteractive()
			.on('pointerdown',() => this.equipAirplane('player', this.equipAirplaneCommon));
		
		this.equipAirplaneRare = this.add.image(config.width * 0.33 , config.height / 2, 'playerAltStyle')
			.setInteractive()
			.on('pointerdown',() => this.equipAirplane('playerAltStyle', this.equipAirplaneRare));


		
		let buttonBack = this.add.image(config.width / 2 , config.height *0.80, 'buttonBack')
			.setScale(0.20, 0.20)
			.setInteractive()
			.on('pointerdown',() => this.scene.start('mainMenu'));	
		
	}

	equipAirplane(choice,image) {
		localStorage.setItem('currentAirplane', choice);
		
	    	const smoke = this.add.sprite(image.x, image.y, 'smoke_sheet').setScale(2);
	    	smoke.play('smoke_effect');
	    	smoke.once('animationcomplete', () => {
			smoke.destroy();
		});	
	}
}
*/