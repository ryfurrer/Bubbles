var bootState = {
    
    preload: function () {
        game.load.image('redL', 'assets/redLarge.png');
        game.load.image('redXL', 'assets/redXL.png');
        game.load.image('purple', 'assets/purple.png');
        game.load.image('yellowL', 'assets/yellowL.png');
        game.load.image('greenL', 'assets/greenLarge.png');
        game.load.image('blueL', 'assets/blueLarge.png');
        game.load.image('sign', 'assets/sign.png');
        game.load.image('square', 'assets/square.png');
        game.load.image('playButton', 'assets/button.png');
        game.load.image('orangePlay', 'assets/clickMe.png');
    },
    
    create: function () {
        "use strict";
        this.game.stage.backgroundColor = '#fff';
        
        this.input.maxPointers = 1;
        
        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1920, 1080);
            this.scale.pageAlignHorizontally = false;
            this.scale.pageAlignVertically = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1920, 1080);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
        
        game.state.start('main');
    }
};

var game = new Phaser.Game(1920, 1080);


game.state.add('boot', bootState);
game.state.add('main', mainState);
game.state.add('end', endState);
//	Now start the Boot state.
game.state.start('boot');