import "./phaser.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let image;
var text;
let timedEvent;
let seconds = 20;
let screenCenterX;
let screenCenterY;


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('nugget', 'assets/nugget.png');
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
}

function create ()
{
    image = this.add.image(400, 300, 'nugget');

    text = this.add.text(32, 32);
 
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, repeat:19 });

    //  The same as above, but uses a method signature to declare it (shorter, and compatible with GSAP syntax)
}

function update ()
{
    text.setText('Time Remaining: ' + seconds + '.' + timedEvent.getProgress().toString().substr(2, 2) + ' sec');
    
}

function onEvent ()
{
    seconds--;
    if (seconds === 5){
        console.log('game done!')
        
        let game_over = this.add.text(screenCenterX, screenCenterY, 'G A M E  O V E R', {fontSize:'50px', fill:'#ffffff', stroke: "black", strokeThickness: 3});
        game_over.setOrigin(0.5)
        text.visible = false;
        image.visible = false;
        return;
    }

    image.setScale(0.5);
}
