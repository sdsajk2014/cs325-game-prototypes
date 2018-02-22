"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    
    var player;    
    var floors;
    //var boxes;
    var bullets;
    var block;
    var fire_sound;
    var background_music;
    var gameover;
    var message;   
    var enemy1;
    var enemy2;
    var enemy3;
    var enemy4;
    var enemy5;
    var score = 0;
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
            gameover = game.add.audio('gameover');

            var background = game.add.sprite(0,0,'background');
            background = game.add.sprite(800,0,'background');
            game.world.setBounds(0,0,1600,600);

            block = game.add.sprite(768,32,'block');
            game.physics.enable( block, Phaser.Physics.ARCADE );
            block.body.allowGravity = false;
            block.body.immovable = true;

            floors = game.add.group();
            floors.enableBody = true;
            game.physics.enable( floors, Phaser.Physics.ARCADE );

            //boxes = game.add.group();
            //boxes.enableBody = true;
            //game.physics.enable( boxes, Phaser.Physics.ARCADE );

            this.createScenes();

            player = game.add.sprite(20, 470, 'player');
            game.physics.enable(player, Phaser.Physics.ARCADE);
            player.body.setSize(12,30,10,18);
            player.scale.setTo(1.3,1.3);
            player.body.collideWorldBounds = true;
            player.animations.add('left', [0,1,2,3],15,true);
            player.animations.add('right', [5,6,7,8],15,true);

            enemy1 = game.add.sprite(500, 400, 'enemy');
            game.physics.enable(enemy1, Phaser.Physics.ARCADE);
            enemy1.scale.setTo(1.3,1.3);
            enemy1.body.collideWorldBounds = true;
            enemy1.animations.add('e_left', [0,1,2,3],12,true);
            enemy1.animations.add('e_right', [5,6,7,8],12,true);

            enemy2 = game.add.sprite(700, 400, 'enemy');
            game.physics.enable(enemy2, Phaser.Physics.ARCADE);
            enemy2.scale.setTo(1.3,1.3);
            enemy2.body.collideWorldBounds = true;
            enemy2.animations.add('e_left', [0,1,2,3],12,true);
            enemy2.animations.add('e_right', [5,6,7,8],12,true);

            enemy3 = game.add.sprite(500, 30, 'enemy');
            game.physics.enable(enemy3, Phaser.Physics.ARCADE);
            enemy3.scale.setTo(1.3,1.3);
            enemy3.body.collideWorldBounds = true;
            enemy3.animations.add('e_left', [0,1,2,3],12,true);
            enemy3.animations.add('e_right', [5,6,7,8],12,true);

            enemy4 = game.add.sprite(70, 150, 'enemy');
            game.physics.enable(enemy4, Phaser.Physics.ARCADE);
            enemy4.scale.setTo(1.3,1.3);
            enemy4.body.collideWorldBounds = true;
            enemy4.animations.add('e_left', [0,1,2,3],12,true);
            enemy4.animations.add('e_right', [5,6,7,8],12,true);

            enemy5 = game.add.sprite(400, 150, 'enemy');
            game.physics.enable(enemy5, Phaser.Physics.ARCADE);
            enemy5.scale.setTo(1.3,1.3);
            enemy5.body.collideWorldBounds = true;
            enemy5.animations.add('e_left', [0,1,2,3],12,true);
            enemy5.animations.add('e_right', [5,6,7,8],12,true);

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
            for(var i = 0;i< 2;i++)
            {
                var ground = floors.create(0,536 + i*32,'ground');
                ground.body.allowGravity = false;
                ground.body.immovable = true;

                var ground = floors.create(800,336 + i*32,'ground');
                ground.body.allowGravity = false;
                ground.body.immovable = true;
            }

            for(var i = 0; i < 5;i++)
            {
                var platform1 = floors.create(640+ i*32,435,'rock');
                platform1.body.allowGravity = false;
                platform1.body.immovable = true;

                var platform1 = floors.create(64+i*32,280,'rock');
                platform1.body.allowGravity = false;
                platform1.body.immovable = true;

            }

            for(var i = 0; i < 3;i++)
            {
                var platform2 = floors.create(704+ i*32,330,'rock');
                platform2.body.allowGravity = false;
                platform2.body.immovable = true;

                var platform2 = floors.create(32+ i*32,152,'rock');
                platform2.body.allowGravity = false;
                platform2.body.immovable = true;
            }

            for(var i = 0; i < 12;i++)
            {
                var platform3 = floors.create(160+i*32,250,'rock');
                platform3.body.allowGravity = false;
                platform3.body.immovable = true;
            }

            for(var i = 0; i < 15;i++)
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

            for(var i = 0; i < 5;i++)
            {
                var platform6 = floors.create(160,218 - i*32,'rock');
                platform6.body.allowGravity = false;
                platform6.body.immovable = true;
            }

            for(var i = 0; i <17;i++)
            {
                var platform7 = floors.create(0,504 - i*32,'rock');
                platform7.body.allowGravity = false;
                platform7.body.immovable = true;
            }

            for(var i = 0; i <25;i++)
            {
                var platform7 = floors.create(i*32,0,'rock');
                platform7.body.allowGravity = false;
                platform7.body.immovable = true;
            }


            for(var i = 0; i < 3;i++)
            {
                var terrain_1 = floors.create(132,504 - i*32,'rock');
                terrain_1.body.allowGravity = false;
                terrain_1.body.immovable = true;

                var terrain_2 = floors.create(228,504 - i*32 - 2*32,'rock');
                terrain_2.body.allowGravity = false;
                terrain_2.body.immovable = true;

                var terrain_3 = floors.create(260 + i *32,376 ,'rock');
                terrain_3.body.allowGravity = false;
                terrain_3.body.immovable = true;
            }

            for(var i = 0; i < 2;i++)
            {
                var terrain_4 = floors.create(164 + i *32,440 ,'rock');
                terrain_4.body.allowGravity = false;
                terrain_4.body.immovable = true;

            }

        },

        touchGround()
        {
            inJump = false;
        },

        killBullet(bullet,floor)
        {
            bullet.kill();
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
            enemywait = game.time.now + 1000; 
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
            score ++;
        },
    
        update: function () 
        {
            player.body.velocity.x = 0;
            game.physics.arcade.collide(player, floors,this.touchGround);
            game.physics.arcade.collide(bullets, floors,this.killBullet); 
            game.physics.arcade.collide(player, block);
            game.physics.arcade.collide(enemy3, block);
            game.physics.arcade.collide(enemy1, floors); 
            game.physics.arcade.collide(enemy2, floors); 
            game.physics.arcade.collide(enemy3, floors); 
            game.physics.arcade.collide(enemy4, floors); 
            game.physics.arcade.collide(enemy5, floors);
            game.physics.arcade.collide(enemy1, player,this.lose); 
            game.physics.arcade.collide(enemy2, player,this.lose); 
            game.physics.arcade.collide(enemy3, player,this.lose); 
            game.physics.arcade.collide(enemy4, player,this.lose); 
            game.physics.arcade.collide(enemy5, player,this.lose); 
            game.physics.arcade.collide(enemy1, bullets,this.killEnemy); 
            game.physics.arcade.collide(enemy2, bullets,this.killEnemy); 
            game.physics.arcade.collide(enemy3, bullets,this.killEnemy); 
            game.physics.arcade.collide(enemy4, bullets,this.killEnemy); 
            game.physics.arcade.collide(enemy5, bullets,this.killEnemy);

            if(!background_music.isPlaying && player.alive)
                background_music.play();  
            
            if(enemywait < game.time.now)
            {
                this.enemyMove(enemy1);
                this.enemyMove(enemy2);
                this.enemyMove(enemy3);
                this.enemyMove(enemy4);
                this.enemyMove(enemy5);   
            } 

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
            if(score === 5)
                block.kill();
            if(player.x >= 1500)
                this.win();
        }
    };
};
