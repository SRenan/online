class Scene4 extends Phaser.Scene{
	constructor(){
		super("garage");
	}
	
	create(){

		this.anims.create({
			key: 'smoke_effect',
			frames: this.anims.generateFrameNumbers('smoke_sheet', {start: 0, end: 6}),
			frameRate: 5,
			repeat: 1
		});
		
		
		let charSelectOpt1 = this.add.image(config.width * 0.125, config.height * 0.30, 'opt1');
		let charSelectOpt2 = this.add.image(config.width * 0.375, config.height * 0.30, 'opt2');
		let charSelectOpt3 = this.add.image(config.width * 0.625, config.height * 0.30, 'opt3');
		let charSelectOpt4 = this.add.image(config.width * 0.875, config.height * 0.30, 'opt4');
		let charSelectSlot1 = this.add.image(config.width * 0.125, config.height * 0.30, 'locked');
		let charSelectSlot2 = this.add.image(config.width * 0.375, config.height * 0.30, 'locked');
		let charSelectSlot3 = this.add.image(config.width * 0.625, config.height * 0.30, 'locked');
		let charSelectSlot4 = this.add.image(config.width * 0.875, config.height * 0.30, 'locked');		
		let charSelectSlot5 = this.add.image(config.width * 0.125, config.height * 0.50, 'locked');		
		let charSelectSlot6 = this.add.image(config.width * 0.375, config.height * 0.50, 'locked');
		let charSelectSlot7 = this.add.image(config.width * 0.625, config.height * 0.50, 'locked');
		let charSelectSlot8 = this.add.image(config.width * 0.875, config.height * 0.50, 'locked');
			
		let buttonCharSelect = [charSelectOpt1, charSelectOpt2, charSelectOpt3, charSelectOpt4];
		buttonCharSelect.forEach(button => button.setInteractive());
		buttonCharSelect.forEach(button => button.on('pointerdown', () => this.equipAirplane('player', button)));
		
		/*
        	this.equipAirplaneCommon = this.add.image(config.width * 0.66 , config.height / 2, 'player')
			.setInteractive()
			.on('pointerdown',() => this.equipAirplane('player', this.equipAirplaneCommon));
		
		this.equipAirplaneRare = this.add.image(config.width * 0.33 , config.height / 2, 'playerAltStyle')
			.setInteractive()
			.on('pointerdown',() => this.equipAirplane('playerAltStyle', this.equipAirplaneRare));
		*/

		
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
