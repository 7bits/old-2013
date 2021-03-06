
/* Game namespace */
var game = {
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 1280, 720, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
     
        // Load the resources.
        me.loader.preload(game.resources);

        // me.debug.renderHitBox = true;

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    "loaded" : function () {
       me.state.set(me.state.NEW_GAME, new game.NewGameScreen());
       me.state.set(me.state.MENU, new game.TitleScreen());
        
       // set the "Play/Ingame" Screen Object
       me.state.set(me.state.PLAY, new game.PlayScreen());

       // add our player entity in the entity pool
       me.entityPool.add("mainPlayer", game.PlayerEntity);
       me.entityPool.add("PooEntity", game.PooEntity);
       me.entityPool.add("FlowerEntity1", game.FlowerEntity1);
       me.entityPool.add("FlowerEntity2", game.FlowerEntity2);
       me.entityPool.add("ButterflyEntity1", game.ButterflyEntity1);
       me.entityPool.add("ButterflyEntity2", game.ButterflyEntity2);
       me.entityPool.add("ButterflyEntity3", game.ButterflyEntity3);
       me.entityPool.add("LadderEntity", game.LadderEntity);
       me.entityPool.add("me.LevelEntity", game.LevelChangeEntity);
                 
       // enable the keyboard
       me.input.bindKey(me.input.KEY.LEFT,  "left");
       me.input.bindKey(me.input.KEY.RIGHT, "right");
       me.input.bindKey(me.input.KEY.UP,    "jump", true);
       me.input.bindKey(me.input.KEY.X,     "jump", true);
       me.input.bindKey(me.input.KEY.DOWN,  "down");
       me.input.bindKey(me.input.KEY.C,     "down");
       me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
          
       // start the game 
       me.state.change(me.state.NEW_GAME);
    }
};
