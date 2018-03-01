"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    
    var player;    
    var floors;
    var boxes;
    var bullets;

    var elevator;
    var door;

    var block1;
    var block2;
    var block3;
    var block4;
    var block5;
    var block6;

    var switch1;
    var switch2;
    var switch3;

    //sound effect
    var fire_sound;
    var background_music;
    var button_click;
    var block_open;
    var gameover;

    var enemy6;
    var enemy7;
    var enemy8;
    var enemy9;
    var enemy10;
    var enemy11;
    var enemy12;
    var enemy13;
    var enemy14;
    var enemy15;
    var enemy16;
    var enemy17;
    var enemy18;

    var message;   
    var enemy1;
    var enemy2;
    var enemy3;
    var enemy4;
    var enemy5;

    var bopen1 = false;
    var bopen2 = false;
    var bopen3 = false;
    var reuse = false;


    var jumpwait = 0;
    var firewait = 0;
    var enemywait = 0;

    var facing = 'right';
    var inJump = false;
    var msg_style = { font: "60px Verdana", fill: "#ffffff", align: "center" }; 

    var cursors;
    var jumpButton;
    var fireButton;

    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    return {
    
        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.gravity.y = 1200;

            background_music = game.add.audio('background_music');
            block_open = game.add.audio('block_open');
            gameover = game.add.audio('gameover');
            button_click = game.add.audio('button_click');

            var background = game.add.sprite(0,0,'background_2');
            background = game.add.sprite(800,0,'background_3');
            background = game.add.sprite(-800,0,'background_1');
            game.world.setBounds(-800,0,2400,600);

            floors = game.add.group();
            floors.enableBody = true;
            game.physics.enable( floors, Phaser.Physics.ARCADE );   

            boxes = game.add.group();
            boxes.enableBody = true;
            game.physics.enable( boxes, Phaser.Physics.ARCADE );      

            this.createScenes();

            player = game.add.sprite(-760, 460, 'player');
            game.physics.enable(player, Phaser.Physics.ARCADE);
            player.body.setSize(12,30,10,18);
            player.scale.setTo(1.3,1.3);
            player.animations.add('left', [0,1,2,3],15,true);
            player.animations.add('right', [5,6,7,8],15,true);

            bullets = game.add.group();
            bullets.enableBody = true;
            game.physics.enable( bullets, Phaser.Physics.ARCADE );
            bullets.setAll('checkWorldBounds', true);
            bullets.setAll('outOfBoundsKill', true);
            fire_sound = game.add.audio('fire_sound');

            cursors = game.input.keyboard.createCursorKeys();
            fireButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
            jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            game.camera.follow(player);
            background_music.play();
        },

        createScenes()
        {	
        	//First scene

        	elevator = floors.create(-750,381,'block_2');
        	elevator.body.allowGravity = false;
        	elevator.body.immovable = true;
        	elevator.outOfBoundsKill = true;

        	door = floors.create(-160,32,'block');
        	door.body.allowGravity = false;
        	door.body.immovable = true;
        	door.outOfBoundsKill = true;


        	for(var i = 0;i< 2;i++)
        	{
        	    var ground = floors.create(-800,536 + i*32,'ground');
        	    ground.body.allowGravity = false;
        	    ground.body.immovable = true;
        	}

        	for(var i = 0;i< 12;i++)
        	{
        	    var platform = floors.create(-160,504 - i*32,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	    
        	}

        	for(var i = 0;i< 4;i++)
        	{
        	    var platform = floors.create(-128+i*32,152,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	    
        	}

        	for(var i = 0;i<2;i++)
        	{
        	    var platform = floors.create(-64+i*32,408,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;

        	    platform = floors.create(-128+i*32,312,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	    
        	}

        	for(var i = 0; i <25;i++)
        	{
        	    var platform = floors.create(i*32 - 800,0,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	}

        	for(var i = 0; i <17;i++)
        	{
        	    var platform = floors.create(-800,504 - i*32,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	}

        	for(var i = 0; i <15;i++)
        	{
        	    var platform = floors.create(-768 + i*32,408,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;

        	    platform = floors.create(-160 - i*32,280,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	}

        	for(var i = 0; i <12;i++)
        	{
        	    var platform = floors.create(-576 + i*32,184,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	}

        	for(var i = 0; i <6;i++)
        	{
        	    var platform = floors.create(-640,280 - i*32,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	}

        	for(var i = 0; i <3;i++)
        	{
        	    var platform = floors.create(-512,32 + i*32,'rock');
        	    platform.body.allowGravity = false;
        	    platform.body.immovable = true;
        	}

        	var platform = floors.create(-160,120,'rock');
        	platform.body.allowGravity = false;
        	platform.body.immovable = true;

        	enemy6 = game.add.sprite(-600, 300, 'enemy');
        	game.physics.enable(enemy6, Phaser.Physics.ARCADE);
        	enemy6.body.setSize(12,30,10,18);
        	enemy6.scale.setTo(1.3,1.3);
        	enemy6.animations.add('e_left', [0,1,2,3],12,true);
        	enemy6.animations.add('e_right', [5,6,7,8],12,true);

        	enemy7 = game.add.sprite(-500, 450, 'enemy');
        	game.physics.enable(enemy7, Phaser.Physics.ARCADE);
        	enemy7.body.setSize(12,30,10,18);
        	enemy7.scale.setTo(1.3,1.3);
        	enemy7.animations.add('e_left', [0,1,2,3],12,true);
        	enemy7.animations.add('e_right', [5,6,7,8],12,true);

        	enemy8 = game.add.sprite(-300, 450, 'enemy');
        	game.physics.enable(enemy8, Phaser.Physics.ARCADE);
        	enemy8.body.setSize(12,30,10,18);
        	enemy8.scale.setTo(1.3,1.3);
        	enemy8.animations.add('e_left', [0,1,2,3],12,true);
        	enemy8.animations.add('e_right', [5,6,7,8],12,true);

        	enemy9 = game.add.sprite(-500, 300, 'enemy');
        	game.physics.enable(enemy9, Phaser.Physics.ARCADE);
        	enemy9.body.setSize(12,30,10,18);
        	enemy9.scale.setTo(1.3,1.3);
        	enemy9.animations.add('e_left', [0,1,2,3],12,true);
        	enemy9.animations.add('e_right', [5,6,7,8],12,true);

        	enemy10 = game.add.sprite(-350, 300, 'enemy');
        	game.physics.enable(enemy10, Phaser.Physics.ARCADE);
        	enemy10.body.setSize(12,30,10,18);
        	enemy10.scale.setTo(1.3,1.3);
        	enemy10.animations.add('e_left', [0,1,2,3],12,true);
        	enemy10.animations.add('e_right', [5,6,7,8],12,true);

        	enemy11 = game.add.sprite(-250, 100, 'enemy');
        	game.physics.enable(enemy11, Phaser.Physics.ARCADE);
        	enemy11.body.setSize(12,30,10,18);
        	enemy11.scale.setTo(1.3,1.3);
        	enemy11.animations.add('e_left', [0,1,2,3],12,true);
        	enemy11.animations.add('e_right', [5,6,7,8],12,true);

        	enemy12 = game.add.sprite(-300, 100, 'enemy');
        	game.physics.enable(enemy12, Phaser.Physics.ARCADE);
        	enemy12.body.setSize(12,30,10,18);
        	enemy12.scale.setTo(1.3,1.3);
        	enemy12.animations.add('e_left', [0,1,2,3],12,true);
        	enemy12.animations.add('e_right', [5,6,7,8],12,true);

        	enemy13 = game.add.sprite(-320, 100, 'enemy');
        	game.physics.enable(enemy13, Phaser.Physics.ARCADE);
        	enemy13.body.setSize(12,30,10,18);
        	enemy13.scale.setTo(1.3,1.3);
        	enemy13.animations.add('e_left', [0,1,2,3],12,true);
        	enemy13.animations.add('e_right', [5,6,7,8],12,true);

        	enemy14 = game.add.sprite(-430, 100, 'enemy');
        	game.physics.enable(enemy14, Phaser.Physics.ARCADE);
        	enemy14.body.setSize(12,30,10,18);
        	enemy14.scale.setTo(1.3,1.3);
        	enemy14.animations.add('e_left', [0,1,2,3],12,true);
        	enemy14.animations.add('e_right', [5,6,7,8],12,true);

        	enemy15 = game.add.sprite(-500, 100, 'enemy');
        	game.physics.enable(enemy15, Phaser.Physics.ARCADE);
        	enemy15.body.setSize(12,30,10,18);
        	enemy15.scale.setTo(1.3,1.3);
        	enemy15.animations.add('e_left', [0,1,2,3],12,true);
        	enemy15.animations.add('e_right', [5,6,7,8],12,true);

        	enemy16 = game.add.sprite(-400, 200, 'enemy');
        	game.physics.enable(enemy16, Phaser.Physics.ARCADE);
        	enemy16.body.setSize(12,30,10,18);
        	enemy16.scale.setTo(1.3,1.3);
        	enemy16.animations.add('e_left', [0,1,2,3],12,true);
        	enemy16.animations.add('e_right', [5,6,7,8],12,true);

        	enemy17 = game.add.sprite(-350, 200, 'enemy');
        	game.physics.enable(enemy17, Phaser.Physics.ARCADE);
        	enemy17.body.setSize(12,30,10,18);
        	enemy17.scale.setTo(1.3,1.3);
        	enemy17.animations.add('e_left', [0,1,2,3],12,true);
        	enemy17.animations.add('e_right', [5,6,7,8],12,true);

        	enemy18 = game.add.sprite(-50, 470, 'enemy');
        	game.physics.enable(enemy18, Phaser.Physics.ARCADE);
        	enemy18.body.setSize(12,30,10,18);
        	enemy18.scale.setTo(1.3,1.3);
        	enemy18.animations.add('e_left', [0,1,2,3],12,true);
        	enemy18.animations.add('e_right', [5,6,7,8],12,true);

        	//Second scene

        	block1 = floors.create(768,32,'block');
        	block1.body.allowGravity = false;
        	block1.body.immovable = true;
        	block1.outOfBoundsKill = true;

        	block2 = floors.create(160,32,'block');
        	block2.body.allowGravity = false;
        	block2.body.immovable = true;
        	block2.outOfBoundsKill = true;

        	block3 = floors.create(288,120,'block_2');
        	block3.body.allowGravity = false;
        	block3.body.immovable = true;
        	block3.outOfBoundsKill = true;

        	block4 = floors.create(0,344,'block');
        	block4.body.allowGravity = false;
        	block4.body.immovable = true;
        	block4.outOfBoundsKill = true;

        	block5 = floors.create(130,535,'block');
        	block5.scale.setTo(1,1.1);
        	block5.body.allowGravity = false;
        	block5.body.immovable = true;
        	block5.outOfBoundsKill = true;

        	block6 = floors.create(325,445,'block');
        	block6.body.allowGravity = false;
        	block6.body.immovable = true;
        	block6.outOfBoundsKill = true;

        	switch1 = game.add.sprite(700, 87, 'switch');
        	game.physics.enable(switch1, Phaser.Physics.ARCADE);

        	switch2 = game.add.sprite(650, 504, 'switch');
        	game.physics.enable(switch2, Phaser.Physics.ARCADE);

        	switch3 = game.add.sprite(-100, 504, 'switch');
        	game.physics.enable(switch3, Phaser.Physics.ARCADE);

        	enemy1 = game.add.sprite(500, 400, 'enemy');
        	game.physics.enable(enemy1, Phaser.Physics.ARCADE);
        	enemy1.body.setSize(12,30,10,18);
        	enemy1.scale.setTo(1.3,1.3);
        	enemy1.body.collideWorldBounds = true;
        	enemy1.animations.add('e_left', [0,1,2,3],12,true);
        	enemy1.animations.add('e_right', [5,6,7,8],12,true);

        	enemy2 = game.add.sprite(700, 400, 'enemy');
        	game.physics.enable(enemy2, Phaser.Physics.ARCADE);
        	enemy2.body.setSize(12,30,10,18);
        	enemy2.scale.setTo(1.3,1.3);
        	enemy2.body.collideWorldBounds = true;
        	enemy2.animations.add('e_left', [0,1,2,3],12,true);
        	enemy2.animations.add('e_right', [5,6,7,8],12,true);

        	enemy3 = game.add.sprite(500, 30, 'enemy');
        	game.physics.enable(enemy3, Phaser.Physics.ARCADE);
        	enemy3.body.setSize(12,30,10,18);
        	enemy3.scale.setTo(1.3,1.3);
        	enemy3.body.collideWorldBounds = true;
        	enemy3.animations.add('e_left', [0,1,2,3],12,true);
        	enemy3.animations.add('e_right', [5,6,7,8],12,true);

        	enemy4 = game.add.sprite(-80, 80, 'enemy');
        	game.physics.enable(enemy4, Phaser.Physics.ARCADE);
        	enemy4.body.setSize(12,30,10,18);
        	enemy4.scale.setTo(1.3,1.3);
        	enemy4.animations.add('e_left', [0,1,2,3],12,true);
        	enemy4.animations.add('e_right', [5,6,7,8],12,true);

        	enemy5 = game.add.sprite(400, 150, 'enemy');
        	game.physics.enable(enemy5, Phaser.Physics.ARCADE);
        	enemy5.body.setSize(12,30,10,18);
        	enemy5.scale.setTo(1.3,1.3);
        	enemy5.body.collideWorldBounds = true;
        	enemy5.animations.add('e_left', [0,1,2,3],12,true);
        	enemy5.animations.add('e_right', [5,6,7,8],12,true);

        	var box = boxes.create(600,40,'brown_box');
        	var box = boxes.create(60,120,'brown_box');

            for(var i = 0;i< 2;i++)
            {
                var ground = floors.create(0,536 + i*32,'ground');
                ground.body.allowGravity = false;
                ground.body.immovable = true;
                
            }

            for(var i = 0; i < 5;i++)
            {
                var platform1 = floors.create(640+ i*32,435,'rock');
                platform1.body.allowGravity = false;
                platform1.body.immovable = true;

            }

            for(var i = 0; i < 3;i++)
            {
                var platform2 = floors.create(704+ i*32,330,'rock');
                platform2.body.allowGravity = false;
                platform2.body.immovable = true;
            }

            for(var i = 0; i < 12;i++)
            {            	
                var platform3 = floors.create(160+i*32,250,'rock');
                platform3.body.allowGravity = false;
                platform3.body.immovable = true;
            }

            for(var i = 0; i < 16;i++)
            {
                var platform4 = floors.create(768 - i*32,120,'rock');
                platform4.body.allowGravity = false;
                platform4.body.immovable = true;
            }

            for(var i = 0; i < 12;i++)
            {
                var platform5 = floors.create(768,i*32+ 152,'rock');
                platform5.body.allowGravity = false;
                platform5.body.immovable = true;
            }

            for(var i = 0; i < 4;i++)
            {
                var platform6 = floors.create(160,218 - i*32,'rock');
                platform6.body.allowGravity = false;
                platform6.body.immovable = true;
            }

            for(var i = 0; i <9;i++)
            {
            	if(i !== 6 && i !== 7)
            	{
                	var platform7 = floors.create(0,408 - i*32,'rock');
                	platform7.body.allowGravity = false;
                	platform7.body.immovable = true;
                }
            }

            for(var i = 0; i <25;i++)
            {
                var platform7 = floors.create(i*32,0,'rock');
                platform7.body.allowGravity = false;
                platform7.body.immovable = true;
            }


            for(var i = 0; i < 3;i++)
            {

                var terrain_2 = floors.create(228,504 - i*32 - 2*32,'rock');
                terrain_2.body.allowGravity = false;
                terrain_2.body.immovable = true;

                var terrain_3 = floors.create(260 + i *32,408 ,'rock');
                terrain_3.body.allowGravity = false;
                terrain_3.body.immovable = true;
            }

            for(var i = 0; i < 2;i++)
            {
                var terrain_4 = floors.create(164 + i *32,440 ,'rock');
                terrain_4.body.allowGravity = false;
                terrain_4.body.immovable = true;

                var terrain_4 = floors.create(32+ i*32,152,'rock');
                terrain_4.body.allowGravity = false;
                terrain_4.body.immovable = true;

                var terrain_4 = floors.create(96+i*32,250,'rock');
                terrain_4.body.allowGravity = false;
                terrain_4.body.immovable = true;

            }

            //Third scene

            for(var i = 0;i< 2;i++)
            {
            	ground = floors.create(800,336 + i*32,'ground');
            	ground.body.allowGravity = false;
	            ground.body.immovable = true;
	        }
        },

        touchGround()
        {
            inJump = false;
        },

        killBullet(bullet,floors)
        {
            bullet.kill();
        },

        enemiesMove()
        {
        	if(enemywait < game.time.now)
        	{
        	    this.enemyMove(enemy1);
        	    this.enemyMove(enemy2);
        	    this.enemyMove(enemy3);
        	    this.enemyMove(enemy4);
        	    this.enemyMove(enemy5); 
        	    this.enemyMove(enemy6);
        	    this.enemyMove(enemy7); 
        	    this.enemyMove(enemy8); 
        	    this.enemyMove(enemy9); 
        	    this.enemyMove(enemy10);
        	    this.enemyMove(enemy11);  
        	    this.enemyMove(enemy12);  
        	    this.enemyMove(enemy13);  
        	    this.enemyMove(enemy14);  
        	    this.enemyMove(enemy15);  
        	    this.enemyMove(enemy16);     
        	    this.enemyMove(enemy17); 
        	    this.enemyMove(enemy18); 
        	} 
        },

        enemyMove(enemy)
        {   
            var rand = Math.random()*100;
            if(rand > 30)
            {
                enemy.body.velocity.x = 0;
                enemy.animations.stop();
                enemy.frame = 0;
            }
            else if ( rand <= 30 && rand >= 15)
            {
                enemy.body.velocity.x = 100;
                enemy.animations.play('e_right');
            }
            else
            {
                enemy.body.velocity.x = -100;
                enemy.animations.play('e_left');
            }
            enemywait = game.time.now + 500; 
        },

        lose()
        {
            player.kill();
            background_music.stop();
            message = game.add.text(game.camera.x + 400,game.camera.y + 300,"You lose! \n Press F5 to restart",msg_style);
            message.anchor.setTo(0.5,0.5);
            gameover.play();
        },
        win()
        {
            player.kill();
            background_music.stop();
            message = game.add.text(game.camera.x + 400,game.camera.y + 300,"You've escaped \n from the jail!",msg_style);
            message.anchor.setTo(0.5,0.5);
        },

        killEnemy(enemy,bullet)
        {
            enemy.kill();
            bullet.kill();
        },

        killEnemySp(enemy,bullet)
        {
            enemy.kill();
            bullet.kill();

            door.body.velocity.y = -50;
            block_open.play();
        },

        switch1clicked()
        {
        	if(bopen1 === false)
        	{
        		block2.body.velocity.y = -50;
        		bopen1 = true;
        		button_click.play();
        		switch1.frame = 1;
        		block_open.play();
        		block3.body.velocity.x = -50;
        		block_open.play();
        	}
        },

        switch2clicked()
        {
        	if(bopen2 === false)
        	{
        		block1.body.velocity.y = -50;
        		bopen2 = true;
        		button_click.play();
        		switch2.frame = 1;
                block_open.play();
                block4.body.velocity.y = 50;
        		block_open.play();
        		block3.body.velocity.x = -50;
        		block_open.play();
        	}
        },

        switch3clicked()
        {
        	if(bopen3 === false)
        	{
        		block4.body.velocity.y = 200;
        		bopen3 = true;
        		button_click.play();
        		switch3.frame = 1;
                block_open.play();
                block5.body.velocity.y = -50;
                block_open.play();
                block6.body.velocity.y = 50;
                block_open.play();
        	}
        },

        collidecheck()
        {
        	game.physics.arcade.collide(player, floors,this.touchGround);
        	game.physics.arcade.collide(player, boxes,this.touchGround);
        	game.physics.arcade.collide(bullets, floors,this.killBullet); 
        	game.physics.arcade.collide(player, boxes);
        	game.physics.arcade.collide(floors, boxes);

        	game.physics.arcade.collide(enemy3, block1);
        	game.physics.arcade.collide(switch1, floors);
        	game.physics.arcade.collide(switch2, floors);
        	game.physics.arcade.collide(switch3, floors);

        	game.physics.arcade.overlap(switch1, boxes,this.switch1clicked);
        	game.physics.arcade.overlap(switch2, boxes,this.switch2clicked);
        	game.physics.arcade.overlap(switch3, boxes,this.switch3clicked);

        	game.physics.arcade.collide(enemy1, floors); 
        	game.physics.arcade.collide(enemy2, floors); 
        	game.physics.arcade.collide(enemy3, floors); 
        	game.physics.arcade.collide(enemy4, floors);
        	game.physics.arcade.collide(enemy5, floors);
        	game.physics.arcade.collide(enemy6, floors);
        	game.physics.arcade.collide(enemy7, floors);
        	game.physics.arcade.collide(enemy8, floors);
        	game.physics.arcade.collide(enemy9, floors);
        	game.physics.arcade.collide(enemy10, floors);
        	game.physics.arcade.collide(enemy11, floors);
        	game.physics.arcade.collide(enemy12, floors);
        	game.physics.arcade.collide(enemy13, floors);
        	game.physics.arcade.collide(enemy14, floors);
        	game.physics.arcade.collide(enemy15, floors);
        	game.physics.arcade.collide(enemy16, floors);
        	game.physics.arcade.collide(enemy17, floors);
        	game.physics.arcade.collide(enemy18, floors);

        	game.physics.arcade.collide(enemy1, player,this.lose); 
        	game.physics.arcade.collide(enemy2, player,this.lose); 
        	game.physics.arcade.collide(enemy3, player,this.lose);
        	game.physics.arcade.collide(enemy4, player,this.lose); 
        	game.physics.arcade.collide(enemy5, player,this.lose);
        	game.physics.arcade.collide(enemy6, player,this.lose);
        	game.physics.arcade.collide(enemy7, player,this.lose);
        	game.physics.arcade.collide(enemy8, player,this.lose);
        	game.physics.arcade.collide(enemy9, player,this.lose);
        	game.physics.arcade.collide(enemy10, player,this.lose);
        	game.physics.arcade.collide(enemy11, player,this.lose);
        	game.physics.arcade.collide(enemy12, player,this.lose);
        	game.physics.arcade.collide(enemy13, player,this.lose);
        	game.physics.arcade.collide(enemy14, player,this.lose);
        	game.physics.arcade.collide(enemy15, player,this.lose);
        	game.physics.arcade.collide(enemy16, player,this.lose);
        	game.physics.arcade.collide(enemy17, player,this.lose);
        	game.physics.arcade.collide(enemy18, player,this.lose);

        	game.physics.arcade.collide(enemy1, bullets,this.killEnemy); 
        	game.physics.arcade.collide(enemy2, bullets,this.killEnemy); 
        	game.physics.arcade.collide(enemy3, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy4, bullets,this.killEnemy); 
        	game.physics.arcade.collide(enemy5, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy6, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy7, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy8, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy9, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy10, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy11, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy12, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy13, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy14, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy15, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy16, bullets,this.killEnemy);
        	game.physics.arcade.collide(enemy17, bullets,this.killEnemySp);
        	game.physics.arcade.collide(enemy18, bullets,this.killEnemy);
        },
    
        update: function () 
        {
            player.body.velocity.x = 0;
            this.collidecheck();

            if(!background_music.isPlaying && player.alive)
               background_music.play();  
            
            this.enemiesMove();
           
            if(cursors.left.isDown)
            {
                facing = 'left';
                player.body.velocity.x = -250;
                player.animations.play('left');
            }
            else if(cursors.right.isDown)
            {   
                facing = 'right';
                player.body.velocity.x = 250;
                player.animations.play('right');
            }
            else{
                if(facing === 'left')
                    player.frame = 0;
                else if (facing === 'right')
                    player.frame = 5;
            }

            if(jumpButton.isDown && !inJump && jumpwait < game.time.now)
            {
                player.body.velocity.y = -600;
                inJump = true;
                jumpwait = game.time.now + 800;
            }
            if(inJump)
            {
                if(facing === 'left')
                    player.frame = 1;
                else if (facing === 'right')
                    player.frame = 6;
            }

            if(fireButton.isDown && firewait < game.time.now)
            {

                if(facing === 'left')
                {   
                    player.frame = 9;
                    var bullet = bullets.create(player.x - 37,player.y + 43,'bullet_left');
                    bullet.body.allowGravity = false;
                    fire_sound.play();
                    bullet.body.velocity.x = -200;
                }
                else if(facing === 'right')
                {   
                    player.frame = 10;
                    var bullet = bullets.create(player.x + 37,player.y + 43,'bullet_right');
                    bullet.body.allowGravity = false;
                    fire_sound.play();
                    bullet.body.velocity.x = 200;
                }

                firewait = game.time.now + 200;
            }

            // Scene 1
            if(elevator.y <70)
            	elevator.body.velocity.y = 50;
            else if (elevator.y > 370)
            	elevator.body.velocity.y = -50;

            // Scene 2
            if(block3.x < 200)
            	block3.body.velocity.x = 0;
            if(block4.y > 440 && reuse === false)
            {
            	block4.body.velocity.y = 0;
            	reuse = true;
            }
            if(block5.y < 440)
            	block5.body.velocity.y = 0;

            // Scene 3
            if(player.x >= 1500)
                this.win();

        }
    };
};
