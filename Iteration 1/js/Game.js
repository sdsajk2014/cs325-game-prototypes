"use strict";

GameStates.makeGame = function( game, shared ) {
    
    var grass;
    var player;
    var facing;
    var tent;
    var tower;
    var farm;
    var armory;

    var enemy1;
    var enemywait = 0;

    var upkey;
    var downkey;
    var leftkey;
    var rightkey;
    var firekey;

    function quitGame() {

        game.state.start('MainMenu');

    }
    
    return {
    
        create: function () 
        {
        	game.physics.startSystem(Phaser.Physics.ARCADE);

        	this.createbackground();
        	
        	grass = game.add.group();
    		grass.enableBody = true;
            game.physics.enable( grass, Phaser.Physics.ARCADE )

            this.createscene1();
            
    		player = game.add.sprite(200, 200, 'player');
    		game.physics.enable(player, Phaser.Physics.ARCADE);
    		player.body.collideWorldBounds = true;
    		player.body.setSize(25,32,3,0);
    		player.scale.setTo(1.2,1.2);
    		player.animations.add('p_down', [0,1,2,3],15,true);
    		player.animations.add('p_up', [4,5,6,7],15,true);
    		player.animations.add('p_right', [8,9,10,11],15,true);
    		player.animations.add('p_left', [12,13,14,15],15,true);
  		
    		upkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    		leftkey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    		downkey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    		rightkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    		firekey = game.input.keyboard.addKey(Phaser.Keyboard.J);

    		game.camera.follow(player);
        },

        createbackground()
        {
        	var scene1 = game.add.sprite(0,0,'scene1');
        },

        createscene1()
        {
        	var grasses = grass.create(100,50,'grass');
        	grasses.body.immovable = true;
        	grasses.body.setSize(75,80,10,5);
        	grasses.scale.setTo(0.8,0.8);

        	grasses = grass.create(100,300,'grass');
        	grasses.body.immovable = true;
        	grasses.body.setSize(75,80,10,5);
        	grasses.scale.setTo(0.8,0.8);

        	grasses = grass.create(250,450,'grass');
        	grasses.body.immovable = true;
        	grasses.body.setSize(75,80,10,5);
        	grasses.scale.setTo(0.8,0.8);

        	grasses = grass.create(100,450,'grass');
        	grasses.body.immovable = true;
        	grasses.body.setSize(75,80,10,5);
        	grasses.scale.setTo(0.8,0.8);

        	grasses = grass.create(300,150,'grass');
        	grasses.body.immovable = true;
        	grasses.body.setSize(75,80,10,5);
        	grasses.scale.setTo(0.8,0.8);

        	grasses = grass.create(500,0,'grass');
        	grasses.body.immovable = true;
        	grasses.body.setSize(75,80,10,5);
        	grasses.scale.setTo(0.8,0.8);

        	grasses = grass.create(550,300,'grass');
        	grasses.body.immovable = true;
        	grasses.body.setSize(75,80,10,5);
        	grasses.scale.setTo(0.8,0.8);

        	grasses = grass.create(450,520,'grass');
        	grasses.body.immovable = true;
        	grasses.body.setSize(75,80,10,5);
        	grasses.scale.setTo(0.8,0.8);

        	var bush = grass.create(100,10,'bush');        	
        	bush.body.immovable = true;
        	bush.body.setSize(20,18,3,2);
        	bush.scale.setTo(1.5,1.5);

        	for(var i = 0;i < 3;i++)
        	{
        	    bush = grass.create(170 + i * 50,120,'bush');        	
        	    bush.body.immovable = true;
        	    bush.body.setSize(20,18,3,2);
        	    bush.scale.setTo(1.5,1.5);

        	    bush = grass.create(180 + i * 50,320,'bush');        	
        	    bush.body.immovable = true;
        	    bush.body.setSize(20,18,3,2);
        	    bush.scale.setTo(1.5,1.5);

        	    bush = grass.create(500 + i*20,90 + i * 45,'bush');        	
        	    bush.body.immovable = true;
        	    bush.body.setSize(20,18,3,2);
        	    bush.scale.setTo(1.5,1.5);

        	    bush = grass.create(500 + i*20,480 - i * 45,'bush');        	
        	    bush.body.immovable = true;
        	    bush.body.setSize(20,18,3,2);
        	    bush.scale.setTo(1.5,1.5);

        	    bush = grass.create(630 + i*45,330,'bush');        	
        	    bush.body.immovable = true;
        	    bush.body.setSize(20,18,3,2);
        	    bush.scale.setTo(1.5,1.5);

                bush = grass.create(330 + i*45,420,'bush');         
                bush.body.immovable = true;
                bush.body.setSize(20,18,3,2);
                bush.scale.setTo(1.5,1.5);
        	}

        	for(var i = 0;i < 4;i++)
        	{
        	    bush = grass.create(i * 55,560,'bush');        	
        	    bush.body.immovable = true;
        	    bush.body.setSize(20,18,3,2);
        	    bush.scale.setTo(1.5,1.5);
        	}

        	bush = grass.create(0,450,'bush');        	
        	bush.body.immovable = true;
        	bush.body.setSize(20,18,3,2);
        	bush.scale.setTo(1.5,1.5);

        	bush = grass.create(55,450,'bush');        	
        	bush.body.immovable = true;
        	bush.body.setSize(20,18,3,2);
        	bush.scale.setTo(1.5,1.5);

        	bush = grass.create(210,520,'bush');        	
        	bush.body.immovable = true;
        	bush.body.setSize(20,18,3,2);
        	bush.scale.setTo(1.5,1.5);

            tent = game.add.sprite(600, -10, 'tent');
            game.physics.enable(tent, Phaser.Physics.ARCADE);
            tent.enableBody = true;
            tent.body.immovable = true;
            tent.body.setSize(142,110,10,48);

            tower = game.add.sprite(330, 480, 'tower');
            game.physics.enable(tower, Phaser.Physics.ARCADE);
            tower.enableBody = true;
            tower.body.immovable = true;
            tower.scale.setTo(1.5,1.5);

            farm = game.add.sprite(220, 10, 'farm');
            game.physics.enable(farm, Phaser.Physics.ARCADE);
            farm.enableBody = true;
            farm.body.immovable = true;
            farm.scale.setTo(2,2);

            armory = game.add.sprite(600, 400, 'armory');
            game.physics.enable(armory, Phaser.Physics.ARCADE);
            armory.enableBody = true;
            armory.body.immovable = true;
            armory.scale.setTo(1.5,1.5);

            enemy1 = game.add.sprite(400, 600, 'zombie');
            game.physics.enable(enemy1, Phaser.Physics.ARCADE);
            enemy1.enableBody = true;
            enemy1.body.collideWorldBounds = true;
            enemy1.body.setSize(22,45,5,0);
            enemy1.body.immovable = true;
            enemy1.animations.add('e_down', [0,1,2,3],5,true);
            enemy1.animations.add('e_left', [4,5,6,7],5,true);
            enemy1.animations.add('e_right', [8,9,10,11],5,true);
            enemy1.animations.add('e_up', [12,13,14,15],5,true);
        },

        collidecheck()
        {
        	game.physics.arcade.collide(player, grass);
            game.physics.arcade.collide(player, tent);
            game.physics.arcade.collide(player, tower);
            game.physics.arcade.collide(player, farm);
            game.physics.arcade.collide(player, armory);
            game.physics.arcade.collide(player, enemy1);

            game.physics.arcade.collide(enemy1, grass);
            game.physics.arcade.collide(enemy1, tent);
            game.physics.arcade.collide(enemy1, tower);
            game.physics.arcade.collide(enemy1, farm);
            game.physics.arcade.collide(enemy1, armory);
        },

        controllistener()
        {
        	player.body.velocity.x = 0;
        	player.body.velocity.y = 0;

        	if(leftkey.isDown)
        	{
        	    facing = 'left';
        	    player.body.velocity.x = -250;
        	    player.animations.play('p_left');
        	}
        	else if(rightkey.isDown)
        	{   
        	    facing = 'right';
        	    player.body.velocity.x = 250;
        	    player.animations.play('p_right');
        	}
        	else if(upkey.isDown)
        	{   
        	    facing = 'up';
        	    player.body.velocity.y = -250;
        	    player.animations.play('p_up');
        	}
        	else if(downkey.isDown)
        	{   
        	    facing = 'down';
        	    player.body.velocity.y = 250;
        	    player.animations.play('p_down');
        	}
        	else
        	{
        	    if(facing === 'down')
        	        player.frame = 0;
        	    else if (facing === 'up')
        	        player.frame = 4;
        	    else if (facing === 'right')
        	        player.frame = 8;
        	    else if (facing === 'left')
        	        player.frame = 12;
        	}
        },

        enemiesmove()
        {
            if(enemywait < game.time.now)
            {
                this.enemymove(enemy1);
            }
        },

        enemymove(enemy)
        {
            var rand = Math.random()*200;
            if ( rand <= 20 && rand >= 0)
            {
                enemy.body.velocity.x = 50;
                enemy.animations.play('e_right');
            }
            else if ( rand <= 40 && rand >= 21)
            {
                enemy.body.velocity.x = -50;
                enemy.animations.play('e_left');
            }
            else if ( rand <= 60 && rand >= 41)
            {
                enemy.body.velocity.y = -50;
                enemy.animations.play('e_up');
            }
            else if( rand <= 80 && rand >= 61)
            {
                enemy.body.velocity.y = 50;
                enemy.animations.play('e_down');
            }
            else
            {
                enemy.body.velocity.x = 0;
                enemy.body.velocity.y = 0;
                enemy.animations.stop();
                enemy.frame = 0;
            }
           
            enemywait = game.time.now + 800; 
        },
    
        update: function () 
        {
    		this.collidecheck();
    		this.controllistener();
            this.enemiesmove();

            //game.debug.body(armory);
    		//game.debug.physicsGroup(enemies);
            //game.debug.physicsGroup(grass);
        }
    };
};
