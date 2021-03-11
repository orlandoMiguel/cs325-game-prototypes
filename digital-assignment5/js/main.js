    // this is the main hub and allows for transitioning of all the scenes
    import "./phaser.js";
    import Scene1 from './mainmenu.js';
    import Scene2 from './game.js';
    import Scene3 from './gameover.js';
    
    var config = {
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        width: 800,
        height: 600,
        backgroundColor: '#FFFFFF',
        parent: 'phaser-example',
        scene: [Scene1,Scene2,Scene3]
    }
    
    var game = new Phaser.Game(config);
    window.game = game;