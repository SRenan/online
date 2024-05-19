class Scene1 extends Phaser.Scene {
	constructor(){

		super("bootGame");
		
	}

	preload(){
		this.load.image("mainMenuBackground","assets/images/800px-Flat_Earth_Society_Logo.png");
		this.load.image('Vwing', 'assets/images/Vwing.png');
		this.load.image('enemy', 'assets/images/enemy_64.png');
		this.load.image('star', 'assets/images/star.png');
		this.load.image('player', 'assets/images/Vwing_small.png');
		this.load.image('buttonTakeoff', 'assets/images/buttonTakeoff.png');
		this.load.image('buttonGarage', 'assets/images/buttonGarage.png');
		this.load.image('buttonSettings', 'assets/images/buttonSettings.png');
		this.load.image('buttonFEARS', 'assets/images/buttonFEARS.png');
	}
	
	create(){
		this.add.text(20,20, "Loading The Disk...");
		this.scene.start("mainMenu");
	}
}