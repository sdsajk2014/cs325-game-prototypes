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
        game.load.image( 'background', 'assets/background.png' );
        game.load.image( 'player', 'assets/player.png' );
        game.load.image( 'wall','assets/wall.png' );
        game.load.image( 'wall2','assets/wall2.png' );
        game.load.image( 'door1','assets/door1.png' );
        game.load.image( 'door2','assets/door2.png' );
        game.load.image( 'door3','assets/door3.png' );
        game.load.image( 'door4','assets/door4.png' );
        game.load.image( 'door5','assets/door5.png' );
        game.load.image( 'key1','assets/key1.png' );
        game.load.image( 'key2','assets/key2.png' );
        game.load.image( 'key3','assets/key3.png' );
        game.load.image( 'key4','assets/key4.png' );
        game.load.image( 'key5','assets/key5.png' );
        game.load.image( 'book','assets/book.png' );
        game.load.audio( 'background_music', 'assets/background_music.wav');
        game.load.audio( 'collect', 'assets/collect.mp3');
    }

    var background;
    var control;
    var action;
    var doors;
    var door1;
    var door2;
    var door3;
    var door4;
    var door5;
    var keys;
    var key1;
    var key2;
    var key3;
    var key4;
    var key5;
    var book;
    var walls;
    var player;
    var message;

    var background_music;
    var collect;

    var score = 0;
    var msg_style = { font: "60px Verdana", fill: "#ffffff", align: "center" }; 
    
    function create() {
    	background = game.add.sprite( 0, 0, 'background' );
        background_music = game.add.audio('background_music');
        collect = game.add.audio('collect');
    	player = game.add.sprite( 96, 500, 'player' );
    	game.physics.enable( player, Phaser.Physics.ARCADE );
    	player.scale.setTo(1.2,1.2);
    	player.anchor.setTo( 0.5, 0.5 );
    	player.body.setSize(22,35,5,0);

        book = game.add.sprite(400,250,'book');
        game.physics.enable( book, Phaser.Physics.ARCADE );

    	walls = game.add.group();
    	walls.enableBody = true;
    	game.physics.enable( walls, Phaser.Physics.ARCADE );

        doors = game.add.group();
        doors.enableBody = true;
        game.physics.enable( doors, Phaser.Physics.ARCADE );
        keys = game.add.group();
        keys.enableBody = true;
        game.physics.enable( keys, Phaser.Physics.ARCADE );

    	createWorld();

        control = game.input.keyboard.createCursorKeys();
        action = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        background_music.play(); 
    }

    function createWorld(){
    	 for(var i = 0; i < 7;i++){
    	 	var wall_1 = walls.create(250 + i*48,150,'wall');
    	 	wall_1.body.immovable = true;

            if(i !== 3){
                var wall_2 = walls.create(250 + i*48,362,'wall');
                wall_2.body.immovable = true;
            }
    	 }

         for(var i = 0;i < 6;i++){
            var wall2_1 = walls.create(250,150 + i * 38,'wall2');
            wall2_1.body.immovable = true;

            var wall2_2 = walls.create(576,150 + i * 38,'wall2');
            wall2_2.body.immovable = true;
         }

         for(var i = 0;i < 2;i++){
            var wall1_3 = walls.create(i * 48 + 18,228,'wall');
            wall1_3.body.immovable = true;

            var wall1_4 = walls.create(i * 48 + 66,340,'wall');
            wall1_4.body.immovable = true;

            var wall1_5 = walls.create(641 + i * 48,212,'wall');
            wall1_5.body.immovable = true;

            var wall1_6 = walls.create(641 + i * 48 ,340,'wall');
            wall1_6.body.immovable = true;
        }

         for(var i = 0;i < 6;i++){
            var wall2_3 = walls.create(145,i * 38,'wall2');
            wall2_3.body.immovable = true;

            var wall2_4 = walls.create(145,340 + i * 38,'wall2');
            wall2_4.body.immovable = true;

            var wall2_5 = walls.create(641,i * 38,'wall2');
            wall2_5.body.immovable = true;

            var wall2_6 = walls.create(641,340 + i * 38,'wall2');
            wall2_6.body.immovable = true;
        }

        door1 = doors.create(250 + 3*48,362,'door1');
        door1.body.immovable = true;
        door2 = doors.create(18+ 2*48,228,'door2');
        door2.body.immovable = true;
        door3 = doors.create(18,340,'door3');
        door3.body.immovable = true;
        door4 = doors.create(737,212,'door4');
        door4.body.immovable = true;
        door5 = doors.create(737,340,'door5');
        door5.body.immovable = true;

        key1 = keys.create(750,450,'key1');     
        key2 = keys.create(700,50,'key2');
        key3 = keys.create(20,500,'key3');
        key5 = keys.create(100,100,'key5');
        key4 = keys.create(300,50,'key4');
    }

    //use score instead of 5 booleans, which makes it easier to code
    function collectKey(player, key){
        collect.play();
        score ++;
        keys.remove(key);
    }

    function update() {
    	game.physics.arcade.collide(player, doors);
    	game.physics.arcade.collide(player, walls);
        game.physics.arcade.overlap(player, keys,collectKey);
        game.physics.arcade.overlap(player, book,win);

    	player.body.velocity.x = 0;
    	player.body.velocity.y = 0;

    	if (control.left.isDown){
    		if(player.x >= 37)
    	    	player.body.velocity.x = -300;       
    	}
    	if (control.right.isDown){
    		if(player.x <= game.world.width - 37)
    	    	player.body.velocity.x = 300; 
    	}
    	if (control.up.isDown){
    		if(player.y >= 60)
    	    	player.body.velocity.y = -300; 
    	}
    	if (control.down.isDown){
    		if(player.y <= game.world.height - 75)
    	    	player.body.velocity.y = 300; 
    	}
        if(action.isDown){
            if(player.x >= 400 && player.x <= 440 && player.y >=420 && player.y <= 430 && score === 5){
                doors.remove(door1);
            }
            if(player.x >= 120 && player.x <= 150 && player.y >=295 && player.y <= 300 && score === 3){
                doors.remove(door2);
            }
            if(player.x >= 31 && player.x <= 50 && player.y >=407 && player.y <= 410 && score === 1){
                doors.remove(door3);
            }           
            if(player.x >= 747 && player.y >=275 && player.y <= 300 && score === 2){
                doors.remove(door4);
            }
            if(player.x >= 747 && player.y >=316 && player.y <= 320 && score === 4){
                doors.remove(door5);
            }
        }
    }

    function win(){
        book.kill();
        message = game.add.text(game.world.centerX,game.world.centerY,"You Win!",msg_style);
        message.anchor.setTo(0.5,0.5);
    }

};
