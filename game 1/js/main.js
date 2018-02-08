"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'ship', 'assets/spaceship.png' );
        game.load.image( 'background', 'assets/background.jpg' );
        game.load.image( 'enemy', 'assets/enemy.png' );
        game.load.image( 'bullet','assets/bullet.png');
        game.load.audio( 'bullet_sound', 'assets/bullet_sound.mp3');
        game.load.audio( 'background_music', 'assets/background_music.mp3');
        game.load.audio( 'hit', 'assets/hit.mp3');
    }
    
    var player;
    var background;
    var scoreboard;
    var control;
    var fire;
    var bullets;
    var enemies;
    var bullet_sound;
    var background_music;
    var hit;
    var message;

    var score = 0;
    var cooldown = 0;
    var interval = 0;
    var style = { font: "25px Verdana", fill: "#333399ff", align: "center" };
    var msg_style = { font: "60px Verdana", fill: "#ffffff", align: "center" }; 
    
    function create() {
        // Create a sprite at the center of the screen using the 'ship' image.
        background = game.add.sprite( 0, 0, 'background' );
        background.scale.setTo(1.6,1);
        background_music = game.add.audio('background_music');
        player = game.add.sprite( game.world.centerX, 500, 'ship' );
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        player.scale.setTo(1.5,1.5);
        player.anchor.setTo( 0.5, 0.5 );
        player.body.collideWorldBounds = true;

        bullet_sound = game.add.audio('bullet_sound');
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        hit = game.add.audio('hit');

        enemies = game.add.group();
        enemies.scale.setTo(0.5,0.5);
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.createMultiple(80, 'enemy');
        enemies.setAll('anchor.x', 0.5);
        enemies.setAll('anchor.y', 0.5);
        enemies.setAll('outOfBoundsKill', true);
        enemies.setAll('checkWorldBounds', true);

        control = game.input.keyboard.createCursorKeys();
        fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);       
        scoreboard = game.add.text( 650, 10, "Score: " + score, style );
        
        background_music.play();
    }

    function generateEnemy(){
        if(interval < game.time.now)
        {
            var enemy = enemies.getFirstExists(false);
            if(enemy)
            {
                enemy.reset(Math.random()*1600,0);
                enemy.body.velocity.y = 800;
                interval = game.time.now + 50;
            }
        }
    }
    
    function update() {

        checkwinning();
        generateEnemy();
        game.physics.arcade.overlap(player, enemies, die, null, game);
        game.physics.arcade.overlap(bullets, enemies, killEnemy, null, game);

        //loop the background music
        if(!background_music.isPlaying)
            background_music.play();

        if (control.left.isDown)
            player.body.velocity.x = -300;       
        if (control.right.isDown)
            player.body.velocity.x = 300; 
        if (control.up.isDown)
            player.body.velocity.y = -300; 
        if (control.down.isDown)
            player.body.velocity.y = 300; 
        if(fire.isDown && cooldown < game.time.now)
        {
            var bullet = bullets.getFirstExists(false);
            if(bullet)
            {
                bullet.reset(player.x,player.y - 8);
                bullet.body.velocity.y = -350;
                bullet_sound.play(); 
                cooldown = game.time.now + 250;
            }
        }
    }

    function killEnemy(bullet,enemy){
        hit.play();
        bullet.kill();
        enemy.kill();
        score += 5;
        scoreboard.text = "Score: " + score;
    }

    function checkwinning(){
        if(score >= 200)
        {
            //this line is to prenvent the winning message to render so many times
            score = 0;
            bullets.removeAll();     
            message = game.add.text(game.world.centerX,game.world.centerY,"You Win!\n Click to restart",msg_style);
            message.anchor.setTo(0.5,0.5);
            game.input.onTap.addOnce(restart,this);
        }
    }

    function die(){
        hit.play();
        player.kill();
        bullets.removeAll();   
        message = game.add.text(game.world.centerX,game.world.centerY,"You Lose!\n Click to restart",msg_style);
        message.anchor.setTo(0.5,0.5);
        game.input.onTap.addOnce(restart,this);
    }

    function restart(){
        message.visible = false;
        enemies.removeAll();         
        //Recreate players
        player.reset(game.world.centerX, 500);
        //Recreate bullets
        bullet_sound = game.add.audio('bullet_sound');
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        //Recreate enemies
        enemies = game.add.group();
        enemies.scale.setTo(0.5,0.5);
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.createMultiple(50, 'enemy');
        enemies.setAll('anchor.x', 0.5);
        enemies.setAll('anchor.y', 0.5);
        enemies.setAll('outOfBoundsKill', true);
        enemies.setAll('checkWorldBounds', true);

        score = 0;
        interval = 0;
        scoreboard.text = "Score: " + score;
    }
};
