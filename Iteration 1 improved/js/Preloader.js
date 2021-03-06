"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/title.jpg');
            game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
            game.load.spritesheet('player', 'assets/Game Assets/player.png', 32, 32);
            game.load.spritesheet('soilder', 'assets/Game Assets/soilder.png', 32, 32);
            game.load.spritesheet('zombie', 'assets/Game Assets/zombie.png', 32, 32);
            game.load.image('scene1', 'assets/Game Assets/scene1.png');
            game.load.image('grass', 'assets/Game Assets/grass.png');
            game.load.image('bush', 'assets/Game Assets/bush.png');
            game.load.image('tree', 'assets/Game Assets/tree.png');
            game.load.image('tent', 'assets/Game Assets/tent.png');
            game.load.image('factory', 'assets/Game Assets/factory.png');
            game.load.image('barrack', 'assets/Game Assets/barrack.png');

            game.load.image('wood', 'assets/Game Assets/wood.png');
            game.load.image('gear', 'assets/Game Assets/gear.png');

            game.load.audio('background_music', 'assets/Game Assets/background_music.mp3');


            //game.load.audio('block_open', 'assets/Game Assets/block_open.mp3');
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
