"use strict";

GameStates.makeGame = function( game, shared ) {

    var player;   
    var shotgun;
    var bullets;
    var enemies;
    var updates;
    var shop;
    var update1 = null;
    var update2 = null;
    var update3 = null;
    var facing = 'right';
    var money = 0;
    var shotguncooldown = 0;
    var damagecooldown = 0;
    var flipflop = false;

    var upkey;
    var downkey;
    var leftkey;
    var rightkey;
    var firekey;
    var syskey;

    var background_music;
    var shotgun_music;
    var game_over;
    var collect_music;
    var msg_style = { font: "60px Verdana", fill: "#ffffff", align: "center" }; 
    var msg_style2 = { font: "20px Verdana", fill: "#ffffff", align: "center" }; 
    var m_health;
    var m_stage;
    var m_money;
    var m_update1;
    var m_update2;
    var m_update3;
    var sys_message;
    var final_message;
    var stage = 1;
    var msg_stay = false;
    
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
            shotgun_music = game.add.audio('shotgun_music');
            game_over = game.add.audio('game_over');
            collect_music = game.add.audio('collect_music');

        	game.physics.startSystem(Phaser.Physics.ARCADE);  

        	this.createbackground();

        	enemies = game.add.group();
            game.physics.enable( enemies, Phaser.Physics.ARCADE );
            enemies.enableBody = true;

            updates = game.add.group();       
            updates.enableBody = true;  
            game.physics.enable( updates, Phaser.Physics.ARCADE );

            m_update1 = game.add.text(0,0,"nothing",msg_style2);
            m_update1.anchor.setTo(0.5,0.5);
            m_update1.visible = false;
            m_update2 = game.add.text(0,0,"nothing",msg_style2);
            m_update2.anchor.setTo(0.5,0.5);
            m_update2.visible = false;
            m_update3 = game.add.text(0,0,"nothing",msg_style2);
            m_update3.anchor.setTo(0.5,0.5);
            m_update3.visible = false;

    		player = game.add.sprite(400, 400, 'player');
    		game.physics.enable(player, Phaser.Physics.ARCADE);
    		player.body.collideWorldBounds = true;
    		player.body.setSize(25,32,3,0);
    		player.scale.setTo(1.3,1.6);
    		player.animations.add('p_down', [0,1,2,3],15,true);
    		player.animations.add('p_up', [4,5,6,7],15,true);
    		player.animations.add('p_right', [8,9,10,11],15,true);
    		player.animations.add('p_left', [12,13,14,15],15,true);
            player.health = 100;
            player.speed = 200;
            player.damage = 10;

            shotgun = game.add.sprite(player.x ,player.y + 4,'shotgun');
            shotgun.scale.setTo(0.8,0.8);

            shop = game.add.sprite(-300,-300,'shop');
            shop.anchor.setTo(0.5,0.5)           
            game.physics.enable( shop, Phaser.Physics.ARCADE );
            shop.scale.setTo(2,2);
            shop.enableBody = true;
            shop.body.immovable = true;
            shop.visible = false;

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
            syskey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            this.createstage1();
            this.createUI();

    		game.camera.follow(player);
    		background_music.play();
        },

        createUI()
        {
            m_health = game.add.text(game.camera.x + 5,game.camera.y + 5, "Health: " + player.health,msg_style2); 
            m_money = game.add.text(game.camera.x + 5,game.camera.y + 35, "Money: " + money,msg_style2);
            m_stage = game.add.text(game.camera.x + 5,game.camera.y + 65, "Stage: " + stage,msg_style2);
            sys_message = game.add.text(game.camera.x + 400,game.camera.y + 80,"nothing",msg_style2);
            sys_message.anchor.setTo(0.5,0.5);
            sys_message.visible = false;
        },


        createbackground()
        {
        	var scene = game.add.sprite(0,0,'scene1');
        	scene = game.add.sprite(800,0,'scene1');
        	scene = game.add.sprite(0,600,'scene1');
        	scene = game.add.sprite(800,600,'scene1');

        	game.world.setBounds(0,0,1600,1200);
        },

        createstage1()
        {
        	for(var i = 0; i < 20; i++)
        	{
        	    var randomX = Math.random()*1600;
        	    var randomY = Math.random()*1200;
        	    while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
        	    {
        	    	randomX = Math.random()*1600;
        	    	randomY = Math.random()*1200;
        	    }
        	    var zombie = enemies.create(randomX, randomY, 'zombie');
        	    zombie.body.collideWorldBounds = true;
                zombie.body.setSize(25,40,5,6);
                zombie.scale.setTo(1.2,1.2);
                zombie.animations.add('e_down', [0,1,2,3],5,true);
                zombie.animations.add('e_left', [4,5,6,7],5,true);
                zombie.animations.add('e_up', [8,9,10,11],5,true);
                zombie.animations.add('e_right', [12,13,14,15],5,true);
                zombie.locked = true;
                zombie.health = 50;
                zombie.speed = 75;
                zombie.damage = 10;
                zombie.money = 10;
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
        	    player.body.velocity.x = -player.speed;
        	    player.animations.play('p_left');
        	}
        	else if(rightkey.isDown && player.health > 0)
        	{   
        	    facing = 'right';
                shotgun.frame = 0;
                shotgun.reset(player.x + 3,player.y + 4);
        	    player.body.velocity.x = player.speed;
        	    player.animations.play('p_right');
        	}
        	else if(upkey.isDown && player.health > 0)
        	{   
        	    facing = 'up';
                shotgun.frame = 3;
                shotgun.reset(player.x ,player.y - 15);
        	    player.body.velocity.y = -player.speed;
        	    player.animations.play('p_up');
        	}
        	else if(downkey.isDown && player.health > 0)
        	{   
        	    facing = 'down';
                shotgun.frame = 2;
                shotgun.reset(player.x ,player.y + 15);
        	    player.body.velocity.y = player.speed;
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
                    shotgun_music.play();
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
        		// if(enemy.x >= player.x - 100 && enemy.x <= player.x + 100 && enemy.y >= player.y - 100 && enemy.y <= player.y + 100 )
        		// {
        		// 	enemy.locked = true;
        		// }

        		// if player is excaping from an enemy's chasing, that enemy will lose target
        		// if(enemy.x <= player.x - 300 || enemy.x >= player.x + 300 || enemy.y >= player.y + 300 || enemy.y <= player.y - 300 )
        		// {
        		// 	enemy.locked = false;
        		// }

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
        				game.physics.arcade.moveToObject(enemy, player, enemy.speed);
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
            game.physics.arcade.overlap(player, updates,this.getupdate);
            game.physics.arcade.collide(enemies);
            game.physics.arcade.collide(player,shop);          
        },

        getupdate(player,update)
        {
            if(money >= update.cost)
            {
                money -= update.cost;
                m_money.text = "Money: " + money;

                if(update.name === 'health')
                {
                    player.health += 100;
                    m_health.text = "Health: " + player.health;
                    m_update1.visible = false;
                }
                if(update.name === 'speed')
                {
                    player.speed += 30;
                    m_update2.visible = false;
                }
                if(update.name === 'damage')
                {
                    player.damage += 5;
                    m_update3.visible = false;
                }

                collect_music.play();
                update.kill();
                updates.remove(update);
                update = 0;
            }   
        },

        attackEnemies(bullet,enemy)
        {
            bullet.kill();
            bullets.remove(bullet);
            enemy.health -= player.damage;
            if(enemy.health <= 0)
            {
            	money += enemy.money;
            	m_money.text = "Money: " + money;
                enemy.kill();
                enemies.remove(enemy);
            }
        },

        collideWithEnemies(player,enemy)
        {
        	if(damagecooldown < game.time.now)
        	{
        		player.health -= enemy.damage;
        		m_health.text = "Health: " + player.health,msg_style2;
        		damagecooldown = game.time.now  + 300;
        	}

            if(player.health <= 0)
            {
                player.kill();
                shotgun.kill();
                background_music.stop();
                game_over.play();
                final_message = game.add.text(game.camera.x + 400,game.camera.y + 300,"You lose! \n Press F5 to restart",msg_style);
                final_message.anchor.setTo(0.5,0.5);
            }
        },

        wincheck()
        {
            if(enemies.length === 0 && stage === 8)
            {
                player.kill();
                shotgun.kill();
                background_music.stop();
                final_message = game.add.text(game.camera.x + 400,game.camera.y + 300,"You win!",msg_style);
                final_message.anchor.setTo(0.5,0.5);
            }
        },

        message_update()
        {
            m_health.reset(game.camera.x + 5,game.camera.y + 5);
            m_money.reset(game.camera.x + 5,game.camera.y + 35);
            m_stage.reset(game.camera.x + 5,game.camera.y + 65);
            sys_message.reset(game.camera.x + 400, game.camera.y + 80);
             if(msg_stay)
                 sys_message.visible = true;
             else
                 sys_message.visible = false;
        },

        stageupdate()
        {
        	if(enemies.length === 0 && stage === 1)
        	{
        		sys_message.text = "Stage " + stage + " Complete! \n Get some updates in the center of the map! \n Press SPACE to enter next stage!";
        		msg_stay = true;
        		this.shop()
        		if(syskey.isDown)
        		{
        			msg_stay = false;
        			this.closeshop();
        			this.createstage2();
        			stage++;
        			m_stage.text = "Stage: " + stage ;       			
        		}
        	}
        	if(enemies.length === 0 && stage === 2)
        	{
        		sys_message.text = "Stage " + stage + " Complete! \n Get some updates in the center of the map! \n Press SPACE to enter next stage!";
        		msg_stay = true;
        		this.shop()
        		if(syskey.isDown)
        		{
        			msg_stay = false;
        			this.closeshop();
        			this.createstage3();
        			stage++;
        			m_stage.text = "Stage: " + stage ;       			
        		}
        	}
            if(enemies.length === 0 && stage === 3)
            {
                sys_message.text = "Stage " + stage + " Complete! \n Get some updates in the center of the map! \n Press SPACE to enter next stage!";
                msg_stay = true;
                this.shop()
                if(syskey.isDown)
                {
                    msg_stay = false;
                    this.closeshop();
                    this.createstage4();
                    stage++;
                    m_stage.text = "Stage: " + stage ;                  
                }
            }
            if(enemies.length === 0 && stage === 4)
            {
                sys_message.text = "Stage " + stage + " Complete! \n Get some updates in the center of the map! \n Press SPACE to enter next stage!";
                msg_stay = true;
                this.shop()
                if(syskey.isDown)
                {
                    msg_stay = false;
                    this.closeshop();
                    this.createstage5();
                    stage++;
                    m_stage.text = "Stage: " + stage ;                  
                }
            }
            if(enemies.length === 0 && stage === 5)
            {
                sys_message.text = "Stage " + stage + " Complete! \n Get some updates in the center of the map! \n Press SPACE to enter next stage!";
                msg_stay = true;
                this.shop()
                if(syskey.isDown)
                {
                    msg_stay = false;
                    this.closeshop();
                    this.createstage6();
                    stage++;
                    m_stage.text = "Stage: " + stage ;                  
                }
            }
            if(enemies.length === 0 && stage === 6)
            {
                sys_message.text = "Stage " + stage + " Complete! \n Get some updates in the center of the map! \n Press SPACE to enter next stage!";
                msg_stay = true;
                this.shop()
                if(syskey.isDown)
                {
                    msg_stay = false;
                    this.closeshop();
                    this.createstage7();
                    stage++;
                    m_stage.text = "Stage: " + stage ;                  
                }
            }
            if(enemies.length === 0 && stage === 7)
            {
                sys_message.text = "Stage " + stage + " Complete! \n Get some updates in the center of the map! \n Press SPACE to enter next stage!";
                msg_stay = true;
                this.shop()
                if(syskey.isDown)
                {
                    msg_stay = false;
                    this.closeshop();
                    this.createstage8();
                    stage++;
                    m_stage.text = "Stage: " + stage ;                  
                }
            }
        },

        shop()
        {
            shop.reset(800,600);
        	shop.enableBody =true;
        	shop.visible = true;

        	if(update1 === null)
            {
        		update1 = updates.create(600,760,'health_up');
                update1.name = 'health';
                update1.cost = 200 + (stage-1) * 50;
                m_update1.text = "Bandage\n(health up)\n$" + update1.cost ;
                m_update1.reset(630,840);
                m_update1.visible = true;
            }
            if(update2 === null)
            {
                update2 = updates.create(780,760,'speed_up');
                update2.name = 'speed';
                update2.cost = 200 + (stage-1) * 50;
                m_update2.text = "Boots\n(speed up)\n$" + update2.cost;
                m_update2.reset(810,840);
                m_update2.visible = true;
            }
            if(update3 === null)
            {
                update3 = updates.create(960,760,'damage_up');
                update3.name = 'damage';
                update3.cost = 200 + (stage-1) * 50;
                m_update3.text = "Accessories\n(damage up)\n$" + update3.cost;
                m_update3.reset(990,840);
                m_update3.visible = true;
            }
        },

        closeshop()
        {
            shop.reset(-300.-300);
        	shop.visible = false;
            // updates.forEach(function(update)
            // {
            //     update.kill();
            //     updates.remove(update);
            // }),

            update1.kill();
            updates.remove(update1);
            update2.kill();
            updates.remove(update2);
            update3.kill();
            updates.remove(update3);

            update1 = null;
            update2 = null;
            update3 = null;
            m_update1.visible = false;
            m_update2.visible = false;
            m_update3.visible = false;
        },

        createstage2()
        {
            for(var i = 0; i < 20; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var zombie = enemies.create(randomX, randomY, 'zombie');
                zombie.body.collideWorldBounds = true;
                zombie.body.setSize(25,40,5,6);
                zombie.scale.setTo(1.2,1.2);
                zombie.animations.add('e_down', [0,1,2,3],5,true);
                zombie.animations.add('e_left', [4,5,6,7],5,true);
                zombie.animations.add('e_up', [8,9,10,11],5,true);
                zombie.animations.add('e_right', [12,13,14,15],5,true);
                zombie.locked = true;
                zombie.health = 50;
                zombie.speed = 75;
                zombie.damage = 10;
                zombie.money = 10;
            }

            for(var i = 0; i < 10; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var skull = enemies.create(randomX, randomY, 'skull');
                skull.body.collideWorldBounds = true;
                skull.body.setSize(25,40,5,6);
                skull.scale.setTo(1.2,1.2);
                skull.animations.add('e_down', [0,1,2,3],8,true);
                skull.animations.add('e_left', [4,5,6,7],8,true);
                skull.animations.add('e_up', [8,9,10,11],8,true);
                skull.animations.add('e_right', [12,13,14,15],8,true);
                skull.locked = true;
                skull.health = 75;
                skull.speed = 110;
                skull.damage = 15;
                skull.money = 20;
            }
        },

        createstage3()
        {
            for(var i = 0; i < 20; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var zombie = enemies.create(randomX, randomY, 'zombie');
                zombie.body.collideWorldBounds = true;
                zombie.body.setSize(25,40,5,6);
                zombie.scale.setTo(1.2,1.2);
                zombie.animations.add('e_down', [0,1,2,3],5,true);
                zombie.animations.add('e_left', [4,5,6,7],5,true);
                zombie.animations.add('e_up', [8,9,10,11],5,true);
                zombie.animations.add('e_right', [12,13,14,15],5,true);
                zombie.locked = true;
                zombie.health = 50;
                zombie.speed = 75;
                zombie.damage = 10;
                zombie.money = 10;
            }

            for(var i = 0; i < 20; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var skull = enemies.create(randomX, randomY, 'skull');
                skull.body.collideWorldBounds = true;
                skull.body.setSize(25,40,5,6);
                skull.scale.setTo(1.2,1.2);
                skull.animations.add('e_down', [0,1,2,3],8,true);
                skull.animations.add('e_left', [4,5,6,7],8,true);
                skull.animations.add('e_up', [8,9,10,11],8,true);
                skull.animations.add('e_right', [12,13,14,15],8,true);
                skull.locked = true;
                skull.health = 75;
                skull.speed = 110;
                skull.damage = 15;
                skull.money = 20;
            }

        },

        createstage4()
        {
            for(var i = 0; i < 15; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var zombie = enemies.create(randomX, randomY, 'zombie');
                zombie.body.collideWorldBounds = true;
                zombie.body.setSize(25,40,5,6);
                zombie.scale.setTo(1.2,1.2);
                zombie.animations.add('e_down', [0,1,2,3],5,true);
                zombie.animations.add('e_left', [4,5,6,7],5,true);
                zombie.animations.add('e_up', [8,9,10,11],5,true);
                zombie.animations.add('e_right', [12,13,14,15],5,true);
                zombie.locked = true;
                zombie.health = 50;
                zombie.speed = 75;
                zombie.damage = 10;
                zombie.money = 10;
            }

            for(var i = 0; i < 15; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var skull = enemies.create(randomX, randomY, 'skull');
                skull.body.collideWorldBounds = true;
                skull.body.setSize(25,40,5,6);
                skull.scale.setTo(1.2,1.2);
                skull.animations.add('e_down', [0,1,2,3],8,true);
                skull.animations.add('e_left', [4,5,6,7],8,true);
                skull.animations.add('e_up', [8,9,10,11],8,true);
                skull.animations.add('e_right', [12,13,14,15],8,true);
                skull.locked = true;
                skull.health = 75;
                skull.speed = 110;
                skull.damage = 15;
                skull.money = 20;
            }

            for(var i = 0; i < 5; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var monster = enemies.create(randomX, randomY, 'monster');
                monster.body.collideWorldBounds = true;
                monster.body.setSize(25,40,5,6);
                monster.scale.setTo(1.2,1.2);
                monster.animations.add('e_down', [0,1,2,3],7,true);
                monster.animations.add('e_left', [4,5,6,7],7,true);
                monster.animations.add('e_up', [8,9,10,11],7,true);
                monster.animations.add('e_right', [12,13,14,15],7,true);
                monster.locked = true;
                monster.health = 400;
                monster.speed = 40;
                monster.damage = 20;
                monster.money = 40;
            }
        },

        createstage5()
        {
            for(var i = 0; i < 15; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var zombie = enemies.create(randomX, randomY, 'zombie');
                zombie.body.collideWorldBounds = true;
                zombie.body.setSize(25,40,5,6);
                zombie.scale.setTo(1.2,1.2);
                zombie.animations.add('e_down', [0,1,2,3],5,true);
                zombie.animations.add('e_left', [4,5,6,7],5,true);
                zombie.animations.add('e_up', [8,9,10,11],5,true);
                zombie.animations.add('e_right', [12,13,14,15],5,true);
                zombie.locked = true;
                zombie.health = 50;
                zombie.speed = 75;
                zombie.damage = 10;
                zombie.money = 10;
            }

            for(var i = 0; i < 15; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var skull = enemies.create(randomX, randomY, 'skull');
                skull.body.collideWorldBounds = true;
                skull.body.setSize(25,40,5,6);
                skull.scale.setTo(1.2,1.2);
                skull.animations.add('e_down', [0,1,2,3],8,true);
                skull.animations.add('e_left', [4,5,6,7],8,true);
                skull.animations.add('e_up', [8,9,10,11],8,true);
                skull.animations.add('e_right', [12,13,14,15],8,true);
                skull.locked = true;
                skull.health = 75;
                skull.speed = 110;
                skull.damage = 15;
                skull.money = 20;
            }

            for(var i = 0; i < 15; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var monster = enemies.create(randomX, randomY, 'monster');
                monster.body.collideWorldBounds = true;
                monster.body.setSize(25,40,5,6);
                monster.scale.setTo(1.2,1.2);
                monster.animations.add('e_down', [0,1,2,3],7,true);
                monster.animations.add('e_left', [4,5,6,7],7,true);
                monster.animations.add('e_up', [8,9,10,11],7,true);
                monster.animations.add('e_right', [12,13,14,15],7,true);
                monster.locked = true;
                monster.health = 400;
                monster.speed = 40;
                monster.damage = 20;
                monster.money = 40;
            }
        },

        createstage6()
        {
            for(var i = 0; i < 20; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var skull = enemies.create(randomX, randomY, 'skull');
                skull.body.collideWorldBounds = true;
                skull.body.setSize(25,40,5,6);
                skull.scale.setTo(1.2,1.2);
                skull.animations.add('e_down', [0,1,2,3],8,true);
                skull.animations.add('e_left', [4,5,6,7],8,true);
                skull.animations.add('e_up', [8,9,10,11],8,true);
                skull.animations.add('e_right', [12,13,14,15],8,true);
                skull.locked = true;
                skull.health = 75;
                skull.speed = 110;
                skull.damage = 15;
                skull.money = 20;
            }

            for(var i = 0; i < 10; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var monster = enemies.create(randomX, randomY, 'monster');
                monster.body.collideWorldBounds = true;
                monster.body.setSize(25,40,5,6);
                monster.scale.setTo(1.2,1.2);
                monster.animations.add('e_down', [0,1,2,3],7,true);
                monster.animations.add('e_left', [4,5,6,7],7,true);
                monster.animations.add('e_up', [8,9,10,11],7,true);
                monster.animations.add('e_right', [12,13,14,15],7,true);
                monster.locked = true;
                monster.health = 400;
                monster.speed = 40;
                monster.damage = 20;
                monster.money = 40;
            }

            for(var i = 0; i < 10; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var demon = enemies.create(randomX, randomY, 'demon');
                demon.body.collideWorldBounds = true;
                demon.body.setSize(25,40,5,6);
                demon.scale.setTo(1.2,1.2);
                demon.animations.add('e_down', [0,1,2,3],10,true);
                demon.animations.add('e_left', [4,5,6,7],10,true);
                demon.animations.add('e_up', [8,9,10,11],10,true);
                demon.animations.add('e_right', [12,13,14,15],10,true);
                demon.locked = true;
                demon.health = 100;
                demon.speed = 250;
                demon.damage = 10;
                demon.money = 50;
            }
        },

        createstage7()
        {   
            for(var i = 0; i < 20; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var zombie = enemies.create(randomX, randomY, 'zombie');
                zombie.body.collideWorldBounds = true;
                zombie.body.setSize(25,40,5,6);
                zombie.scale.setTo(1.2,1.2);
                zombie.animations.add('e_down', [0,1,2,3],5,true);
                zombie.animations.add('e_left', [4,5,6,7],5,true);
                zombie.animations.add('e_up', [8,9,10,11],5,true);
                zombie.animations.add('e_right', [12,13,14,15],5,true);
                zombie.locked = true;
                zombie.health = 50;
                zombie.speed = 75;
                zombie.damage = 10;
                zombie.money = 10;
            }

            for(var i = 0; i < 20; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var skull = enemies.create(randomX, randomY, 'skull');
                skull.body.collideWorldBounds = true;
                skull.body.setSize(25,40,5,6);
                skull.scale.setTo(1.2,1.2);
                skull.animations.add('e_down', [0,1,2,3],8,true);
                skull.animations.add('e_left', [4,5,6,7],8,true);
                skull.animations.add('e_up', [8,9,10,11],8,true);
                skull.animations.add('e_right', [12,13,14,15],8,true);
                skull.locked = true;
                skull.health = 75;
                skull.speed = 110;
                skull.damage = 15;
                skull.money = 20;
            }

            for(var i = 0; i < 10; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var monster = enemies.create(randomX, randomY, 'monster');
                monster.body.collideWorldBounds = true;
                monster.body.setSize(25,40,5,6);
                monster.scale.setTo(1.2,1.2);
                monster.animations.add('e_down', [0,1,2,3],7,true);
                monster.animations.add('e_left', [4,5,6,7],7,true);
                monster.animations.add('e_up', [8,9,10,11],7,true);
                monster.animations.add('e_right', [12,13,14,15],7,true);
                monster.locked = true;
                monster.health = 400;
                monster.speed = 40;
                monster.damage = 20;
                monster.money = 40;
            }

            for(var i = 0; i < 15; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var demon = enemies.create(randomX, randomY, 'demon');
                demon.body.collideWorldBounds = true;
                demon.body.setSize(25,40,5,6);
                demon.scale.setTo(1.2,1.2);
                demon.animations.add('e_down', [0,1,2,3],10,true);
                demon.animations.add('e_left', [4,5,6,7],10,true);
                demon.animations.add('e_up', [8,9,10,11],10,true);
                demon.animations.add('e_right', [12,13,14,15],10,true);
                demon.locked = true;
                demon.health = 100;
                demon.speed = 250;
                demon.damage = 10;
                demon.money = 50;
            }
        },

        createstage8()
        {
            for(var i = 0; i < 5; i++)
            {
                var randomX = Math.random()*1600;
                var randomY = Math.random()*1200;
                while((randomX < player.x + 100 && randomX > player.x - 100) || (randomY < player.y + 100 && randomY > player.y - 100))
                {
                    randomX = Math.random()*1600;
                    randomY = Math.random()*1200;
                }
                var knight = enemies.create(randomX, randomY, 'knight');
                knight.body.collideWorldBounds = true;
                knight.body.setSize(25,40,5,6);
                knight.scale.setTo(1.2,1.2);
                knight.animations.add('e_down', [0,1,2,3],10,true);
                knight.animations.add('e_left', [4,5,6,7],10,true);
                knight.animations.add('e_up', [8,9,10,11],10,true);
                knight.animations.add('e_right', [12,13,14,15],10,true);
                knight.locked = true;
                knight.health = 500;
                knight.speed = 280;
                knight.damage = 30;
                knight.money = 100;
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
            this.message_update();
            this.stageupdate();
            this.wincheck();

        }

    };
};
