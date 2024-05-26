class Scene1 extends Phaser.Scene {
	constructor(){

		super("bootGame");
		
	}

	preload(){
		this.load.image("mainMenuBackground","assets/images/800px-Flat_Earth_Society_Logo.png");
		this.load.image('Vwing', 'assets/images/Vwing.png');
		this.load.image('player', 'assets/images/airplane.png');
		this.load.image('bullet', 'assets/images/bullet.png');
		//this.load.image('enemy', 'assets/images/enemy_64.png');
		this.load.image('enemy', 'assets/images/airplane_gimp.png');
		this.load.image('enemy2', 'assets/images/airplane_gimp_green.png');
		this.load.image('star', 'assets/images/star_sprite64.png');
		this.load.image('buttonTakeoff', 'assets/images/buttonTakeoff.png');
		this.load.image('buttonGarage', 'assets/images/buttonGarage.png');
		this.load.image('buttonSettings', 'assets/images/buttonSettings.png');
		this.load.image('buttonFEARS', 'assets/images/buttonFEARS.png');
		this.load.spritesheet('explosion_blue_sheet', 'assets/images/explosion_blue_sheet.png', { frameWidth: 32, frameHeight: 32});
		
		//load sounds
		this.load.audio('coin-return', 'assets/sounds/coin-return.mp3');
		this.load.audio('can-open', 'assets/sounds/can-open.mp3');
	}
	
	create(){
		this.add.text(20,20, "Loading The Disk...");
		this.scene.start("mainMenu");
	}
}
