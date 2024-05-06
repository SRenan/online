class Scene2 extends Phaser.Scene{
	constructor(){
		super("mainMenu");
	}
	
	create(){
		 // Calculate the scale factor to match the width of the game's configuration
		// Add a button
        let button = this.add.image(100, 100, 'Play Game'); // Assuming 'button' is the key of your button image
        button.setInteractive();

        // Switch to Scene2 when the button is clicked
        button.on('pointerdown', () => {
            this.scene.start('playingGame');
        });
		

	}
	
	update(){

	}
}
