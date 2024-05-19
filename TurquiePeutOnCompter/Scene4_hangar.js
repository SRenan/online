class Scene4 extends Phaser.Scene{
	constructor(){
		super("garage");
	}
	
	create(){

        this.add.text(20, 20, "And it's back to the garage!", { font: "25px Arial", fill: "black" });
		
	}

}