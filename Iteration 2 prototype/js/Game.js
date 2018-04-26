"use strict";

GameStates.makeGame = function( game, shared ) {

    var background_music;

    var player;   
    var shotgun;
    var bullets;
    var enemies;
    var facing = 'right';
    var shotguncooldown = 0;
    var flipflop = false;

    var upkey;
    var downkey;
    var leftkey;
    var rightkey;
    var firekey;

    var msg_style = { font: "60px Verdana", fill: "#ffffff", align: "center" }; 
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    return {
    
        create: function () 
        {
        	background_music = game.add.audio('background_music'); 	
        	game.physics.startSystem(Phaser.Physics.ARCADE);  

        	this.createbackground();

        	enemies = game.add.group();
            game.physics.enable( enemies, Phaser.Physics.ARCADE );
            enemies.enableBody = true;

            this.createscene1();

    		player = game.add.sprite(200, 200, 'player');
    		game.physics.enable(player, Phaser.Physics.ARCADE);
    		player.body.collideWorldBounds = true;
    		player.body.setSize(25,32,3,0);
    		player.scale.setTo(1.3,1.6);
            player.immovable = true;
    		player.animations.add('p_down', [0,1,2,3],15,true);
    		player.animations.add('p_up', [4,5,6,7],15,true);
    		player.animations.add('p_right', [8,9,10,11],15,true);
    		player.animations.add('p_left', [12,13,14,15],15,true);
            player.health = 100;

            shotgun = game.add.sprite(player.x ,player.y + 4,'shotgun');
            shotgun.scale.setTo(0.8,0.8);

            bullets = game.add.group();
            bullets.enableBody = true;
            game.physics.enable( bullets, Phaser.Physics.ARCADE );
            bullets.setAll('checkWorldBounds', true);
            bullets.setAll('outOfBoundsKill', true);
            bullets.health = 500;

    		upkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    		leftkey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    		downkey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    		rightkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
            firekey = game.input.keyboard.addKey(Phaser.Keyboard.J);

    		game.camera.follow(player);
    		background_music.play();
        },

        createbackground()
        {
        	var scene = game.add.sprite(0,0,'scene1');
        	scene = game.add.sprite(800,0,'scene1');
        	scene = game.add.sprite(0,600,'scene1');
        	scene = game.add.sprite(800,600,'scene1');

        	game.world.setBounds(0,0,1600,1200);
        },

        createscene1()
        {
        	for(var i = 0; i < 30; i++)
        	{
        	    var randomX = Math.random()*1600;
        	    var randomY = Math.random()*1200;
        	    var zombie = enemies.create(randomX, randomY, 'zombie');
        	    zombie.body.collideWorldBounds = true;
        	    zombie.body.setSize(25,32,3,0);
        	    zombie.scale.setTo(1.2,1.2);
        	    zombie.animations.add('e_down', [0,1,2,3],5,true);
        	    zombie.animations.add('e_up', [4,5,6,7],5,true);
        	    zombie.animations.add('e_right', [8,9,10,11],5,true);
        	    zombie.animations.add('e_left', [12,13,14,15],5,true);
        	    zombie.locked = false;
        	    zombie.movewait = 0;
                zombie.health = 50;
        	}
        },

        controllistener()
        {
        	player.body.velocity.x = 0;
        	player.body.velocity.y = 0;

        	if(leftkey.isDown && player.health > 0)
        	{
        	    facing = 'left';
                shotgun.frame = 1;
                shotgun.reset(player.x - 25,player.y + 4);
        	    player.body.velocity.x = -200;
        	    player.animations.play('p_left');
        	}
        	else if(rightkey.isDown && player.health > 0)
        	{   
        	    facing = 'right';
                shotgun.frame = 0;
                shotgun.reset(player.x + 3,player.y + 4);
        	    player.body.velocity.x = 200;
        	    player.animations.play('p_right');
        	}
        	else if(upkey.isDown && player.health > 0)
        	{   
        	    facing = 'up';
                shotgun.frame = 3;
                shotgun.reset(player.x ,player.y - 15);
        	    player.body.velocity.y = -200;
        	    player.animations.play('p_up');
        	}
        	else if(downkey.isDown && player.health > 0)
        	{   
        	    facing = 'down';
                shotgun.frame = 2;
                shotgun.reset(player.x ,player.y + 15);
        	    player.body.velocity.y = 200;
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

            if(firekey.isDown && shotguncooldown < game.time.now  && player.health > 0)
            {
                if(!flipflop)
                {
                    if(facing === 'right')
                    {
                        var bullet1 = bullets.create(player.x + 65,player.y + 23,'bullet');
                        bullet1.health = 150;
                        bullet1.body.velocity.x = 300;
                        var bullet2 = bullets.create(player.x + 65,player.y + 23,'bullet');
                        bullet2.health = 150;
                        bullet2.body.velocity.x = 250;
                        bullet2.body.velocity.y = 100;
                        var bullet3 = bullets.create(player.x + 65,player.y + 23,'bullet');
                        bullet3.health = 150;
                        bullet3.body.velocity.x = 300;
                        bullet3.body.velocity.y = - 100;
                        var bullet4 = bullets.create(player.x + 65,player.y + 23,'bullet');
                        bullet4.health = 150;
                        bullet4.body.velocity.x = 350;
                        bullet4.body.velocity.y = 50;
                        var bullet5 = bullets.create(player.x + 65,player.y + 23,'bullet');
                        bullet5.health = 150;
                        bullet5.body.velocity.x = 350;
                        bullet5.body.velocity.y = - 50;
                    }
                    if(facing === 'left')
                    {
                        var bullet1 = bullets.create(player.x - 35,player.y + 23,'bullet');
                        bullet1.health = 150;
                        bullet1.body.velocity.x = -300;
                        var bullet2 = bullets.create(player.x - 35,player.y + 23,'bullet');
                        bullet2.health = 150;
                        bullet2.body.velocity.x = -250;
                        bullet2.body.velocity.y = 100;
                        var bullet3 = bullets.create(player.x - 35,player.y + 23,'bullet');
                        bullet3.health = 150;
                        bullet3.body.velocity.x = -300;
                        bullet3.body.velocity.y = - 100;
                        var bullet4 = bullets.create(player.x - 35,player.y + 23,'bullet');
                        bullet4.health = 150;
                        bullet4.body.velocity.x = -350;
                        bullet4.body.velocity.y = 50;
                        var bullet5 = bullets.create(player.x - 35,player.y + 23,'bullet');
                        bullet5.health = 150;
                        bullet5.body.velocity.x = -350;
                        bullet5.body.velocity.y = - 50;
                    }
                    if(facing === 'up')
                    {
                        var bullet1 = bullets.create(player.x + 35,player.y - 23,'bullet');
                        bullet1.health = 150;
                        bullet1.body.velocity.y = -300;
                        var bullet2 = bullets.create(player.x + 35,player.y - 23,'bullet');
                        bullet2.health = 150;
                        bullet2.body.velocity.y = -250;
                        bullet2.body.velocity.x = 100;
                        var bullet3 = bullets.create(player.x + 35,player.y - 23,'bullet');
                        bullet3.health = 150;
                        bullet3.body.velocity.y = -300;
                        bullet3.body.velocity.x = - 100;
                        var bullet4 = bullets.create(player.x + 35,player.y - 23,'bullet');
                        bullet4.health = 150;
                        bullet4.body.velocity.y = -350;
                        bullet4.body.velocity.x = 50;
                        var bullet5 = bullets.create(player.x + 35,player.y - 23,'bullet');
                        bullet5.health = 150;
                        bullet5.body.velocity.y = -350;
                        bullet5.body.velocity.x = - 50;
                    }
                    if(facing === 'down')
                    {
                        var bullet1 = bullets.create(player.x + 35,player.y + 70,'bullet');
                        bullet1.health = 150;
                        bullet1.body.velocity.y = 300;
                        var bullet2 = bullets.create(player.x + 35,player.y + 70,'bullet');
                        bullet2.health = 150;
                        bullet2.body.velocity.y = 250;
                        bullet2.body.velocity.x = 100;
                        var bullet3 = bullets.create(player.x + 35,player.y + 70,'bullet');
                        bullet3.health = 150;
                        bullet3.body.velocity.y = 300;
                        bullet3.body.velocity.x = - 100;
                        var bullet4 = bullets.create(player.x + 35,player.y + 70,'bullet');
                        bullet4.health = 150;
                        bullet4.body.velocity.y = 350;
                        bullet4.body.velocity.x = 50;
                        var bullet5 = bullets.create(player.x + 35,player.y + 70,'bullet');
                        bullet5.health = 150;
                        bullet5.body.velocity.y = 350;
                        bullet5.body.velocity.x = - 50;
                    }

                    shotguncooldown = game.time.now + 500;
                    flipflop = true;
                }
            }

            if(firekey.isUp)
            {
                flipflop = false;
            }
        },

        enemymove()
        {
        	enemies.forEach(function(enemy)
        	{
        		// if player is within the alert area of an enemy, the enemy will locked player and take player as a target
        		if(enemy.x >= player.x - 100 && enemy.x <= player.x + 100 && enemy.y >= player.y - 100 && enemy.y <= player.y + 100 )
        		{
        			enemy.locked = true;
        		}

        		// if player is excaping from an enemy's chasing, that enemy will lose target
        		if(enemy.x <= player.x - 300 || enemy.x >= player.x + 300 || enemy.y >= player.y + 300 || enemy.y <= player.y - 300 )
        		{
        			enemy.locked = false;
        		}

        		// if enemy found a target, it start to chase the target
        		if(enemy.locked)
        		{
        			if(enemy.x >= player.x - 20 && enemy.x <= player.x + 20 && enemy.y >= player.y - 20 && enemy.y <= player.y + 20 )
        			{
        				enemy.body.velocity.x = 0;
        				enemy.body.velocity.y = 0;
        				enemy.frame = 0;
        			}
        			else
        			{
        				game.physics.arcade.moveToObject(enemy, player, 100);
        				if(enemy.x >= player.x - 80 && enemy.x <= player.x + 80)
        				{
        					if(player.y > enemy.y + 20)
        					{
        						enemy.animations.play('e_down');
        					}
        					else if (player.y < enemy.y - 20)
        					{
        						enemy.animations.play('e_up');
        					}
        					else
        					{
        						if(enemy.x < player.x)
        						{
        							enemy.animations.play('e_right');
        						}
        						else
        						{
        							enemy.animations.play('e_left');
        						}
        					}
        				}
        				else
        				{
        					if(enemy.x < player.x)
        					{
        						enemy.animations.play('e_right');
        					}
        					else
        					{
        						enemy.animations.play('e_left');
        					}
        				}
        			}  
        		}

        		// if an enemy doesn't have any target, it just do random moves
        		else
        		{
        			if(enemy.movewait < game.time.now)
        			{
        				var rand = Math.random()*150;
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
        				    if( enemy.body.velocity.x > 0)
        				    {
        				        enemy.animations.stop();
        				        enemy.frame = 8;
        				        enemy.body.velocity.x = 0;
        				        enemy.body.velocity.y = 0;
        				    }
        				    else if(enemy.body.velocity.x < 0)
        				    {
        				        enemy.animations.stop();
        				        enemy.frame = 12;
        				        enemy.body.velocity.x = 0;
        				        enemy.body.velocity.y = 0;
        				    }
        				    else if(enemy.body.velocity.y < 0)
        				    {
        				        enemy.animations.stop();
        				        enemy.frame = 4;
        				        enemy.body.velocity.x = 0;
        				        enemy.body.velocity.y = 0;
        				    }
        				    else if(enemy.body.velocity.y > 0)
        				    {
        				        enemy.animations.stop();
        				        enemy.frame = 0;
        				        enemy.body.velocity.x = 0;
        				        enemy.body.velocity.y = 0;
        				    }
        				}
        				enemy.movewait = game.time.now + 800;    
        			}
        		}
        	});
        },

        bulletupdate()
        {
            bullets.forEach(function(bullet)
            {
                bullet.health -= 10;
                if(bullet.health <= 0)
                {
                    bullet.kill();
                    bullets.remove(bullet);
                }
            });
        },

        collidecheck()
        {
            game.physics.arcade.collide(player, enemies,this.collideWithEnemies);
            game.physics.arcade.collide(bullets, enemies,this.attackEnemies);
        },

        attackEnemies(bullet,enemy)
        {
            // if(bullet.body.velocity.x > 0)
            // {
            //     enemy.reset(enemy.x + 20,enemy.y);
            // }
            // else if(bullet.body.velocity.x <= 0)
            // {
            //     enemy.reset(enemy.x - 20,enemy.y);
            // }
            // else if(bullet.body.velocity.y > 0)
            // {
            //     enemy.reset(enemy.x ,enemy.y + 20);
            // }
            // else if(bullet.body.velocity.y < 0)
            // {
            //     enemy.reset(enemy.x,enemy.y - 20);
            // }
            bullet.kill();
            bullets.remove(bullet);
            enemy.health -= 10;
            if(enemy.health <= 0)
            {
                enemy.kill();
                enemies.remove(enemy);
            }
        },

        collideWithEnemies()
        {
            player.health -= 10;
            if(player.health <= 0)
            {
                player.kill();
                shotgun.kill();
                background_music.stop();
                var message = game.add.text(game.camera.x + 400,game.camera.y + 300,"You lose! \n Press F5 to restart",msg_style);
                message.anchor.setTo(0.5,0.5);
            }
        },

        wincheck()
        {
            if(enemies.length === 0)
            {
                player.kill();
                shotgun.kill();
                background_music.stop();
                var message = game.add.text(game.camera.x + 400,game.camera.y + 300,"You win!",msg_style);
                message.anchor.setTo(0.5,0.5);
            }
        },
    
        update: function () 
        {
        	if(!background_music.isPlaying && player.alive)
        	   background_music.play(); 
        	    
    		this.controllistener();
    		this.enemymove();
            this.bulletupdate();
            this.collidecheck();
            this.wincheck();

    		//game.debug.body(player);
            //game.debug.physicsGroup(bullets);
        }

    };
};
