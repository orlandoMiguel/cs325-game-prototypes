import "./phaser.js";
import Scene1 from './mainmenu.js';
import Scene2 from './game.js';

// Game making config
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
    scene: [Scene2]
}

var game = new Phaser.Game(config);
window.game = game;