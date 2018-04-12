"use strict";

GameStates.makeGame = function( game, shared ) {

    var background_music;
    var player;
    var facing;

    var enemies;
    var soilders;
    var buildings;
    var soilder_spwn;
    var player_health = 100;
    var num_tent = 0;
    var num_factory = 0;
    var woods;
    var gears;
    var current_task = 1;
    var m_task;
    var m_health;
    var m_wood;
    var m_gear;
    var m_current_building;
    var current_building = 'tent';
    var current_require_w = 5;
    var current_require_g = 0;
    var s_wood = 0;
    var s_gear = 0;

    var producewait = 0;
    var soliderwait = 0;
    var enemywait = 0;
    var buildwait = 0;

    var sys_message;
    var msg_stay = 0;

    var upkey;
    var downkey;
    var leftkey;
    var rightkey;
    var functionKey;

    var msg_style = { font: "20px Verdana", fill: "#ffffff", align: "center" }; 

    function quitGame() {

        game.state.start('MainMenu');

    }
    
    return {
    
        create: function () 
        {
        	game.physics.startSystem(Phaser.Physics.ARCADE);
            background_music = game.add.audio('background_music');

        	this.createbackground();

            woods = game.add.group();
            woods.enableBody = true;
            game.physics.enable( woods, Phaser.Physics.ARCADE );

            gears = game.add.group();
            gears.enableBody = true;
            game.physics.enable( gears, Phaser.Physics.ARCADE );

            enemies = game.add.group();
            game.physics.enable( enemies, Phaser.Physics.ARCADE );
            enemies.enableBody = true;

            this.createscene1();

            soilders = game.add.group();
            game.physics.enable( soilders, Phaser.Physics.ARCADE );
            soilders.enableBody = true;
            
    		player = game.add.sprite(200, 200, 'player');
    		game.physics.enable(player, Phaser.Physics.ARCADE);
    		player.body.collideWorldBounds = true;
    		player.body.setSize(25,32,3,0);
    		player.scale.setTo(1.2,1.2);
            player.immovable = true;
    		player.animations.add('p_down', [0,1,2,3],15,true);
    		player.animations.add('p_up', [4,5,6,7],15,true);
    		player.animations.add('p_right', [8,9,10,11],15,true);
    		player.animations.add('p_left', [12,13,14,15],15,true);

            buildings = game.add.group();
            game.physics.enable( buildings, Phaser.Physics.ARCADE );
            buildings.enableBody = true;

            soilder_spwn = game.add.group();
  		
    		upkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    		leftkey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    		downkey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    		rightkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    		functionKey = game.input.keyboard.addKey(Phaser.Keyboard.J);

            this.createUI();

    		game.camera.follow(player);
            background_music.play();
        },

        createUI()
        {
            m_health = game.add.text(game.camera.x + 5,game.camera.y + 5, "Health: " + player_health,msg_style);
            m_wood = game.add.text(game.camera.x + 5,game.camera.y + 35, "Woods: " + s_wood + " +" + 2*num_tent,msg_style);
            m_gear = game.add.text(game.camera.x + 5,game.camera.y + 65, "Gears: " + s_wood + " +" + num_factory,msg_style); 
            m_task = game.add.text(game.camera.x + 5,game.camera.y + 550,"Task 1: Collect 5 woods in the map.",msg_style);           
            m_current_building = game.add.text(game.camera.x + 5,game.camera.y + 95, "Building: " + current_building + " " + current_require_w + "w," + current_require_g + "g",msg_style);
            sys_message = game.add.text(game.camera.x + 400,game.camera.y + 35,"nothing",msg_style);
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

        createscene1()
        {

            for(var i = 0; i < 100; i++)
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
            }

            for(var i = 0; i < 5; i++)
            {
                var randomX = Math.random()*1500 + 50;
                var randomY = Math.random()*1100 + 50;
                var wood = woods.create(randomX,randomY,'wood');
            }

        },

        collidecheck()
        {
            game.physics.arcade.collide(player, woods,this.collectwood);
            game.physics.arcade.collide(player, gears,this.collectgear);
            game.physics.arcade.collide(player, buildings);
            game.physics.arcade.overlap(buildings, buildings,this.builderror);

            game.physics.arcade.collide(enemies, buildings);
            game.physics.arcade.collide(soilders, buildings);

            game.physics.arcade.collide(player, enemies,this.collideWithEnemies);
            game.physics.arcade.collide(soilders, enemies,this.attackenemy);
        },

        attackenemy(soilder,enemy)
        {
            soilder.kill();
            soilders.remove(soilder);
            enemy.kill();
            enemies.remove(enemy);

            sys_message.text = enemies.length;
            msg_stay = game.time.now + 3000;
        },

        builderror(build1,build2)
        {
            build2.kill();
            s_wood += current_require_w;
            s_wood += current_require_g;
            if(current_building ==='tent')
                num_tent--;
            if(current_building ==='factory')
                num_factory--;
            buildings.remove(build2);
            m_wood.text = "Woods: " + s_wood + " +" + 2*num_tent;
            m_gear.text = "Gears: " + s_gear + " +" + num_factory;
            sys_message.text = "Can't overlap with other buildings!";
            msg_stay = game.time.now + 3000;
        },

        collectgear(player,gear)
        {
            s_gear++;
            gear.kill();
            m_gear.text = "Gears: " + s_gear + " +" + num_factory;
        },

        collectwood(player,wood)
        {
            s_wood++;
            wood.kill();
            m_wood.text = "Woods: " + s_wood + " +" + 2*num_tent;
        },

        collideWithEnemies(player,enemy)
        {
            if( player.body.velocity.x > 0)
            {
                player.reset(player.x - 40,player.y);
            }
            else if(player.body.velocity.x < 0)
            {
                player.reset(player.x + 40,player.y);
            }
            else if(player.body.velocity.y < 0)
            {
                player.reset(player.x,player.y + 40);
            }
            else if(player.body.velocity.y > 0)
            {
                player.reset(player.x,player.y - 40);
            }

            player_health -= 10;
            m_health.text = "Health: " + player_health,msg_style;

            enemy.reset(enemy.x,enemy.y);
        },

        build()
        {
            if(s_wood >= current_require_w && s_gear >= current_require_g)
            {
                var building = buildings.create(player.x, player.y, current_building);
                building.body.immovable = true;
                s_wood -= current_require_w;
                s_gear -= current_require_g;
                if(current_building === 'tent')
                {
                    building.scale.setTo(0.4,0.4);
                    num_tent++;
                }
                else if(current_building === 'factory')
                {
                    building.scale.setTo(1.2,1.2);
                    num_factory++;
                }
                else if(current_building === 'barrack')
                {
                    building.scale.setTo(1.5,1.5);
                    if(!game.physics.arcade.overlap(building, buildings))
                        var new_point = soilder_spwn.create(building.x + 30,building.y + 100, null);
                }
                m_wood.text = "Woods: " + s_wood + " +" + 2*num_tent;
                m_gear.text = "Gears: " + s_gear + " +" + num_factory;
            }
            else
            {
                sys_message.text = "Not enough source!";
                msg_stay = game.time.now + 2000;
            }
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
            if(game.input.keyboard.isDown(Phaser.Keyboard.ONE))
            {
                current_building = 'tent';
                current_require_w = 5;
                current_require_g = 0;
                m_current_building.text = "Building: " + current_building + " " + current_require_w + "w," + current_require_g + "g";
            }
            if(game.input.keyboard.isDown(Phaser.Keyboard.TWO))
            {
                current_building = 'factory';
                current_require_w = 20;
                current_require_g = 0;
                m_current_building.text = "Building: " + current_building + " " + current_require_w + "w," + current_require_g + "g";
            }
            if(game.input.keyboard.isDown(Phaser.Keyboard.THREE))
            {
                current_building = 'barrack';
                current_require_w = 50;
                current_require_g = 30;
                m_current_building.text = "Building: " + current_building + " " + current_require_w + "w," + current_require_g + "g";
            }

            if(functionKey.isDown && buildwait < game.time.now)
            {
                this.build();
                buildwait = game.time.now + 2000;
            }
        },

        enemymove()
        {
            if(game.time.now > enemywait)
            {
                enemies.forEach(function(enemy)
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
                    enemywait = game.time.now + 1500;
                });
            }
        },

        soildermove()
        {
            if(game.time.now > soliderwait)
            {
                soilders.forEach(function(soilder)
                {
                    var target = enemies.getRandom();
                    if(target != null)
                    {
                        game.physics.arcade.moveToObject(soilder, target, 100);
                        if ( soilder.body.velocity.x > 0)
                        {
                            soilder.animations.play('s_right');
                        }
                        else if ( soilder.body.velocity.y < 0)
                        {
                            soilder.animations.play('s_up');
                        }
                        else if ( soilder.body.velocity.x < 0)
                        {
                            soilder.animations.play('s_left');
                        }
                        else if(  soilder.body.velocity.y > 0)
                        {
                            soilder.animations.play('s_down');
                        }
                    }
                });
                soliderwait = game.time.now + 3000;
            }
        },

        message_update()
        {
            m_health.reset(game.camera.x + 5,game.camera.y + 5);
            m_wood.reset(game.camera.x + 5, game.camera.y + 35);
            m_gear.reset(game.camera.x + 5, game.camera.y + 65);
            m_task.reset(game.camera.x + 5,game.camera.y + 550);
            m_current_building.reset(game.camera.x + 5, game.camera.y + 95);
            sys_message.reset(game.camera.x + 400, game.camera.y + 35);
            if(msg_stay > game.time.now)
                sys_message.visible = true;
            else
                sys_message.visible = false;
        },

        produce()
        {
            if(producewait < game.time.now)
            {
                var increase_w = num_tent * 2;
                s_wood += increase_w;
                m_wood.text = "Woods: " + s_wood + " +" + 2*num_tent;
            
                var increase_g = num_factory * 1;
                s_gear += increase_g;
                m_gear.text = "Gears: " + s_gear + " +" + num_factory;

                soilder_spwn.forEach(function(sp)
                {
                    var soilder = soilders.create(sp.x, sp.y, 'soilder');
                    soilder.body.collideWorldBounds = true;
                    soilder.body.setSize(25,32,3,0);
                    soilder.scale.setTo(1.2,1.2);
                    soilder.animations.add('s_down', [0,1,2,3],5,true);
                    soilder.animations.add('s_up', [4,5,6,7],5,true);
                    soilder.animations.add('s_right', [8,9,10,11],5,true);
                    soilder.animations.add('s_left', [12,13,14,15],5,true);
                });

                producewait = game.time.now + 5000;
            }
        },
        checktasks()
        {
            if(s_wood >= 5 && current_task === 1)
            {
                current_task = 2;
                m_task.text = "Task 2: build 3 tents to collect more woods (Press 1, then press J)";
            }
            if(buildings.length === 3 && current_task === 2)
            {
                current_task = 3;
                m_task.text = "Task 3: build 2 factories(press 2) and collect 5 gears";
            }
            if(s_gear === 5 && current_task === 3)
            {
                current_task = 4;
                m_task.text = "Task 4: build you first barrack (press 3)";
            }
            if(soilders.length >= 1 && current_task === 4)
            {
                current_task = 5;
                m_task.text = "Task 5: build more buildings to kill all zombies in the area";
            }
        },
    
        update: function () 
        {
            if(!background_music.isPlaying && player.alive)
               background_music.play(); 
                
    		this.collidecheck();
    		this.controllistener();          
            this.enemymove();
            this.soildermove();
            this.message_update();
            this.produce();
            this.checktasks();

            this.checkstate();
            
            //game.debug.body(player);
    		//game.debug.physicsGroup(buildings);
            //game.debug.physicsGroup(grass);
        },
        checkstate()
        {
            if(player_health <= 0)
            {
                player.kill();
                background_music.stop();
                sys_message.text = "YOU LOSE!";
                msg_stay = game.time.now  + 50000;
            }

            if(enemies.length === 0)
            {
                player.kill();
                background_music.stop();
                sys_message.text = "YOU WIN!";
                msg_stay = game.time.now  + 50000;
            }
        }
    };
};
