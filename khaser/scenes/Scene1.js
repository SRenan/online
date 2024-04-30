var Scene1 = {
    create: function() {
        // Get the elapsed time from the data passed to the scene
        var elapsedTime = this.scene.settings.data.elapsedTime;

        // Display "Game Over" text
        this.add.text(200, 200, 'Game Over', { fontSize: '32px', fill: '#ffffff' });

        // Display the message with elapsed time
        this.add.text(150, 250, 'You\'ve reached 50 in ' + (elapsedTime / 1000).toFixed(2) + ' seconds', { fontSize: '24px', fill: '#ffffff' });
    }
};

