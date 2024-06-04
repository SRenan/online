class Scene3 extends Phaser.Scene{
	constructor(){
		super("playingGame");
                this.timer = 0;
	}

	preload(){
	}

	create(){
		this.gameStarted = false; // Track whether the game has started
		this.soundCoinReturn = this.sound.add('coin-return');
		this.soundCanOpen = this.sound.add('can-open');
		
		player = this.physics.add.sprite(250, 550, 'player');
		player.setCollideWorldBounds(true);
	
		// Other elements
		stars = this.physics.add.group();
		enemies = this.physics.add.group();
		
		this.anims.create({
			key: 'explosion_blue',
			frames:  this.anims.generateFrameNumbers('explosion_blue_sheet', { start: 0, end: 4 }),
			frameRate: 10,
			repeat: 0
		});

		this.player_projectiles = this.physics.add.group();

		/*-------------------- colliders --------------------*/
		this.physics.add.collider(player, enemies, this.EnemyCollision, null, this);
		this.physics.add.collider(player, stars, this.CollectStars, null, this);
		this.physics.add.collider(this.player_projectiles, enemies, this.EnemyHit, null, this);
		
		/*-------------------- interface --------------------*/
		// Create buttons
		this.startButton = this.add.text(200, 300, 'Start Game', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
		this.startButton.setInteractive();
		this.startButton.on('pointerdown', this.startGame.bind(this));

		const backToMenuButton = this.add.text(400, 10, 'Back to\nmenu', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
		backToMenuButton.setInteractive()
		backToMenuButton.on('pointerdown', () => {this.scene.start('mainMenu');});

		this.score = 0;
		this.scoreText = this.add.text(16, 16, 'SCore: 0', { fontSize: '32px', fill: '#c90076' });
		this.startTime = 0;
		this.elapsedTime = 0;
    	this.elapsedTimeText = this.add.text(16, 48, 'Elapsed Time: '+ this.score, { fontSize: '24px', fill: '#ffffff' });
	}
	
	update(time, delta){
		if (!this.gameStarted) {
			return; // Exit update function if the game has not started
		}

		// Controls
		if (this.input.keyboard.createCursorKeys().left.isDown) {
			player.x -= 5;
		}
		if (this.input.keyboard.createCursorKeys().right.isDown) {
			player.x += 5;
		}
		
		if(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q).isDown){
			//this.player_shoot(player);
			var player_projectile = this.player_projectiles.create(
				player.body.position.x + player.body.width/2, 
				player.body.position.y,				
				'bullet');
				//console.log(player.body.height);
			player_projectile.setVelocity(0, -50);
		}
	
		// Calculate elapsed time since the game started
		this.elapsedTime = time - this.startTime;
		// Update text to display elapsed time in seconds
		this.elapsedTimeText.setText('Elapsed Time: ' + (this.elapsedTime/1000).toFixed(2) + 's');

		//Generate stars
		if(Phaser.Math.Between(0,60) == 1){ //I assume 60 fps so drop on average 1 star/second
			var star = stars.create(
				Phaser.Math.Between(25, 475), // Random X position within the game area
				Phaser.Math.Between(-600, -50), // Random Y position above the game area, 'bomb');
				'star');
			star.setVelocity(0, 70);
		}
		
		if(Phaser.Math.Between(0,60) == 1){ //I assume 60 fps so drop on average 1 star/second
			var enemy = enemies.create(
				Phaser.Math.Between(25, 475), // Random X position within the game area
				Phaser.Math.Between(-600, -50), // Random Y position above the game area, 'bomb');
				'enemy');
			enemy.setVelocity(0, 150);
		}
	        this.timer += delta;
	        if(this.timer >= 3000){
	            this.createEnemy();
	            this.createPlatform();
	            this.timer = 0;
	        }   

		// Check if score is 50
		if (this.score >= 50) {
			// Switch to Scene1
			game.scene.start('Scene2', { elapsedTime: this.elapsedTime });
		}
	}
	
	// Other methods
	createEnemy(){
		const randX
        	const bomb = this.bombs.create(randX, -100, 'enemy2');
        	bomb.setVelocityY(-100);
    	}   

	startGame(){
		// Store the start time
		this.startTime = this.time.now;
		// Hide the start button
		this.startButton.setVisible(false);
		this.gameStarted = true;
	}
	CollectStars(player, star){
		star.disableBody(true, true);
		this.score += 10;
		this.soundCoinReturn.play(); //KKK tests audio
		this.scoreText.setText('Score: ' + this.score);
	}
	EnemyCollision(player, enemy){
		enemy.disableBody(true, true);
		this.soundCanOpen.play(); //KKK tests audio
		this.scoreText.setText('Score: ' + this.score);
		player.anims.play('explosion_blue', true);
		player.on('animationcomplete', (animation, frame) => {
		if (animation.key === 'explosion_blue') {
			player.setVisible(false);
		}}); //Listen to the animationcomplete event and remove the player
		this.physics.pause();
		this.gameOver();
	}
	EnemyHit(player_projectile, enemy){
		enemy.anims.play('explosion_blue', true);
		enemy.destroy();//disableBody(true, true);
		player_projectile.destroy();//disableBody(true, true);
		this.score += 1;
		this.scoreText.setText('Score: ' + this.score);	
	}
	gameOver(){
		this.summaryText = this.add.text(200, 200, 'Good run\nFinal score: '+this.score, { fontSize: '32px', fill: '#000' });
	    this.time.delayedCall(5000, () => this.scene.start('mainMenu')); //After 5s, go to main menu
	}
}

