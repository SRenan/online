class Scene6 extends Phaser.Scene{
	constructor(){
		super("FEARS");
		console.log("Scene6");
	}

	create(){
		 // Calculate the scale factor to match the width of the game's configuration
        let scale = config.width / this.textures.get("mainMenuBackground").getSourceImage().width;
		
		this.background = this.add.tileSprite(0,0, 800, 1040, "mainMenuBackground");
		this.background.setOrigin(0,0);
        this.background.setScale(scale);
		
// Debugging: Display the scale factor
        this.add.text(300, 300, "Scale: " + scale.toFixed(2), { font: "25px Arial", fill: "black" });

        this.add.text(20, 20, "Main Menu", { font: "25px Arial", fill: "black" });
	}
	
	update(){
		this.background.tilePositionY -= 0.5;
	}
}

