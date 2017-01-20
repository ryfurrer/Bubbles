var time, timeText, timeTxt, score, scoreText, gemsCollected, total, done = false;

// Create our 'main' state that will contain the game
var mainState = {
    
    init: function () {
        "use strict";
        game.scale.setGameSize(1920, 1080);
        score = 0;
        time = 0;
        total = 13;
        gemsCollected = 0;
    },
    
    preload: function () {
        "use strict";
        game.physics.startSystem(Phaser.Physics.P2JS);
        
        var bounds = new Phaser.Rectangle(100, 100, game.width, game.height);
        
        //  Turn on impact events for the world, without this we get no collision callbacks
        //game.physics.p2.setImpactEvents(true);
        
        var pandaCollisionGroup = game.physics.p2.createCollisionGroup();
        
        //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
        //  (which we do) - what this does is adjust the bounds to use its own collision group.
        game.physics.p2.updateBoundsCollisionGroup(true);
        
        game.time.events.loop(100, this.updateTimer, this);


        var blocks = game.add.group();
        blocks.enableBody = true;
        
        blocks.physicsBodyType = Phaser.Physics.P2JS;
        
        
        var type;
        for (var i = 0; i < 83; i++)
        {
            switch(true){
                case (i < 42):
                    var t = Math.floor(Math.random() * 50);
            
                    switch (true) {
                        case (t < 25):
                            type = 'redL';
                            break;
                        default:
                            type = 'blueL';
                            break;
                    }
                    break;
                case (i < 51):
                    type = 'yellowL';
                    break;
                case (i < 59):
                    type = 'redXL';
                    break;
                default:
                    type = 'greenL';
                    break;
                    
            }
            var panda = blocks.create(game.world.randomX, game.world.randomY, type);
            
            panda.body.setCircle(panda.width / 2);

            //  Tell the panda to use the pandaCollisionGroup 
            panda.body.setCollisionGroup(pandaCollisionGroup);

            //  Pandas will collide against themselves and the player
            //  If you don't set this they'll not collide with anything.
            //  The first parameter is either an array or a single collision group.
            panda.body.collides(pandaCollisionGroup);
        }
        
        for (var i = 0; i < 13; i++) { 
            type = 'purple';
            
            var panda = blocks.create(bounds.randomX, bounds.randomY, type);
            
            panda.body.setCircle(panda.width / 2);

            //  Tell the panda to use the pandaCollisionGroup 
            panda.body.setCollisionGroup(pandaCollisionGroup);

            //  Pandas will collide against themselves and the player
            //  If you don't set this they'll not collide with anything.
            //  The first parameter is either an array or a single collision group.
            panda.body.collides(pandaCollisionGroup);
        }
    },
    
    create: function () {
        "use strict";
        var signs = game.add.physicsGroup();
        
        signs.create(10, -20, 'sign');
        signs.create(10, -70, 'sign');
        signs.setAll('body.immovable', true);
        signs.fixedToCamera = true;
        
        timeText = game.add.text(55, 70, "Score: " + score, {font: "20px Arial", fill: "#fff", align: "left"});
        timeText.fixedToCamera = true;
        timeTxt = game.add.text(55, 20, "Time: " + time / 10, {font: "20px Arial", fill: "#fff", align: "left"});
        timeTxt.fixedToCamera = true;
        
        game.input.onDown.add(this.click, this);
        
    },
   
    click: function (pointer) {

        var bodies = game.physics.p2.hitTest(pointer.position);

        if (bodies.length === 0)
        {

        } else {
            // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
            var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];

            if (bodies.length)
            {
                var clickedBody = bodies[0].parent.sprite;
                if (('purple').localeCompare(clickedBody.key)==0) {
                    clickedBody.destroy();
                    score++;
                    timeText.text = "Score: " + score
                }
            }
        }
    },
    
    updateTimer: function () {
        "use strict";
        time += 1;
        timeTxt.text = "Time: " + time/10;
        
    },

    update: function () {
        "use strict";
        
        if (score == total) {
            // go to the next screen when all the items are clicked
            game.state.start('end');
        }
        
    }
};