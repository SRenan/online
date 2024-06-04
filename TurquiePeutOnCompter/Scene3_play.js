class Scene3 extends Phaser.Scene{
	//public field. //TODO: I don't think that is the correct way to hold class variables.
	soundCoinReturn;
	player_projectiles;
	
	constructor(){
		super("playingGame");
                this.timer = 0;
	}

	create(){
		this.soundCoinReturn = this.sound.add('coin-return');
		soundCanOpen = this.sound.add('can-open');
		soundCanOpen.play();
		
		// Create buttons
		startButton = this.add.text(200, 300, 'Start Game', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
			.setInteractive()
			.on('pointerdown', startGame);
		backToMenuButton = this.add.text(200, 300, 'Back to menu', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
			.setVisible(false)
			.setInteractive()
			.on('pointerdown', () => {this.scene.start('mainMenu');});

		player = this.physics.add.sprite(250, 550, 'player');
		player.setCollideWorldBounds(true);
	
		// Other elements
		stars = this.physics.add.group();
		this.physics.add.collider(player, stars, this.CollectStars, null, this);
		enemies = this.physics.add.group();
		
		this.anims.create({
			key: 'explosion_blue',
			frames:  this.anims.generateFrameNumbers('explosion_blue_sheet', { start: 0, end: 4 }),
			frameRate: 10,
			repeat: 0
		});
		this.physics.add.collider(player, enemies, this.EnemyCollision, null, this);
		this.player_projectiles = this.physics.add.group();
		this.physics.add.collider(this.player_projectiles, enemies, this.EnemyHit, null, this);
		
		//TODO: Figure out how to keep interface on top
		scoreText = this.add.text(16, 16, 'SCore: 0', { fontSize: '32px', fill: '#c90076' });
		// Add a text object to display elapsed time
    	elapsedTimeText = this.add.text(16, 48, 'Elapsed Time: 0', { fontSize: '24px', fill: '#ffffff' });
	}
	
	update(time, delta){
		if (!gameStarted) {
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
		elapsedTime = time - startTime;
		// Update text to display elapsed time in seconds
		elapsedTimeText.setText('Elapsed Time: ' + (elapsedTime).toFixed(2) + 's');

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
		if (score >= 50) {
			// Switch to Scene1
			game.scene.start('Scene2', { elapsedTime: elapsedTime });
		}
	}
	
	// Other methods
	createEnemy(){
		const randX
        	const bomb = this.bombs.create(randX, -100, 'enemy2');
        	bomb.setVelocityY(-100);
    	}   

	CollectStars(player, star){
		star.disableBody(true, true);
		score += 10;
		this.soundCoinReturn.play(); //KKK tests audio
		scoreText.setText('Score: ' + score);
	}
	EnemyCollision(player, enemy){
		enemy.disableBody(true, true);
		score = score-5;
		soundCanOpen.play(); //KKK tests audio
		scoreText.setText('Score: ' + score);
		if(score < 0){
			player.anims.play('explosion_blue', true);
			player.on('animationcomplete', (animation, frame) => {
			if (animation.key === 'explosion_blue') {
				player.setVisible(false);
			}}); //Listen to the animationcomplete event and remove the player
			this.physics.pause();
			//TODO: Go to menu or at least reset everything
			backToMenuButton.setVisible(true);
			scoreText.setText('Score: ' + score + '\n Game Over!');
			gameOver = true;
		}
	}
	EnemyHit(player_projectile, enemy){
		enemy.anims.play('explosion_blue', true);
		enemy.destroy();//disableBody(true, true);
		player_projectile.destroy();//disableBody(true, true);
		score += 1;
		scoreText.setText('Score: ' + score);	
	}
	player_shoot(player){
	}
}

