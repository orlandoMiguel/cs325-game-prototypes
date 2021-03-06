import "./phaser.js";

// Two scenes were created to display if the player chooses the wrong or the right wire
// The Phaser example that I used was called Change Scene https://phaser.io/examples/v3/view/game-objects/lights/change-scene
class gameOver extends Phaser.Scene{
    constructor ()
    {
        super('gameOver');
    }

    preload ()
    {
    }

    create ()
    {
        let game_over = this.add.text(160, 210, 'Y O U  L O S E \n\nG A M E  O V E R', {fontSize:'50px', fill:'#ffffff', stroke: "black", strokeThickness: 3});
    }

}

class winner extends Phaser.Scene{
    constructor ()
    {
        super('winner');
    }

    preload ()
    {
    }

    create ()
    {
        let game_over = this.add.text(160, 250, 'Y O U  W I N !!', {fontSize:'50px', fill:'#ffffff', stroke: "black", strokeThickness: 3});
    }

}

// Game making config
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#808080',
    parent: 'phaser-example',
    scene: [{
        preload: preload,
        create: create,
        update: update
    },gameOver,winner]
};

// All the global varibales
let image;
let bomb;
var text;
let timedEvent;
let seconds = 20;
let cursor;
let screenCenterX;
let screenCenterY;
let graphics;
let g1;
let power;
let correct_wire = parseInt(Math.random() * (9-1)+1);
let wire1;
let wire2;
let wire3;
let wire4;
let wire5;
let wire6;
let wire7;
let wire8;
let wire9;
let decide = 0;


var game = new Phaser.Game(config);

// Loads all my images as well as creates a center for the screen
function preload ()
{
    this.load.image('nugget', 'assets/nugget.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('power', 'assets/power1.png');


    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
}

// creates the images and places them in the game
function create ()
{
    bomb = this.add.image(680, 300, 'bomb');
    power = this.add.image(100, 300, 'power');
    power.setScale(0.15);
    bomb.setScale(0.15);


    // creates all the wire and starting with the pathing
    // They each call the function I created and distinguished them
    // uses the random expression
    graphics = this.add.graphics();
    wire1 = wiresMade(Math.random(),0x00FF00,1,210);
    wire2 =wiresMade(Math.random(),0x0000FF,4,225);
    wire3 =wiresMade(Math.random(),0xFF0000,7,240);
    wire4 =wiresMade(Math.random(),0x00FF00,2,255);
    wire5 =wiresMade(Math.random(),0x0000FF,5,270);
    wire6 =wiresMade(Math.random(),0xFF0000,8,285);
    wire7 =wiresMade(Math.random(),0x00FF00,3,300);
    wire8 =wiresMade(Math.random(),0x0000FF,6,315);
    wire9 =wiresMade(Math.random(),0xFF0000,9,330);


    // Displays the Rules
    let style = { font: "20px Comic Sans MS", fill: "white", align: "center" };
    let rules = this.add.text( this.cameras.main.centerX, 100, "To defuse the bomb and win the game \n click the wire number (top to bottom) that is attached to the clock!", style );
    rules.setOrigin( 0.5, 0.0 );
    
    // Makes all the numbers on the bottom of the screen interactive
    // Found website with Phaser that helped me undersand clickable objects
    // https://phasergames.com/phaser-3-basics-images-text-and-click/
    let style2 = { font: "30px Comic Sans MS", fill: "white", align: "center", backgroundColor: '#808080' };
    let num1 = this.add.text( 200, 450, " 1 ", style2 );
    num1.setInteractive();
    this.input.on('gameobjectdown',onObjectClicked,6);

    let num2 = this.add.text( 250, 450, " 2 ", style2 );
    num2.setInteractive();

    let num3 = this.add.text( 300, 450, " 3 ", style2 );
    num3.setInteractive();

    let num4 = this.add.text( 350, 450, " 4 ", style2 );
    num4.setInteractive();

    let num5 = this.add.text( 400, 450, " 5 ", style2 );
    num5.setInteractive();

    let num6 = this.add.text( 450, 450, " 6 ", style2 );
    num6.setInteractive();

    let num7 = this.add.text( 500, 450, " 7 ", style2 );
    num7.setInteractive();

    let num8 = this.add.text( 550, 450, " 8 ", style2 );
    num8.setInteractive();

    let num9 = this.add.text( 600, 450, " 9 ", style2 );
    num9.setInteractive();

    text = this.add.text(32, 32);

    // Timed Event taken from a phaser example https://phaser.io/examples/v2/time/custom-timer
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, repeat:19 });

}

// Displays the time remaining and once a number is picked
// it will display either win or lose screen
function update ()
{
    
    text.setText('Time Remaining: ' + seconds + '.' + timedEvent.getProgress().toString().substr(2, 2) + ' sec');
    console.log(decide);
    if(decide === 1)
        this.scene.start('winner');
    else if (decide === 2)
      this.scene.start('gameOver');
    else
        null;
}

// Once the timer reaches 0 end the game
function onEvent ()
{
    seconds--;
    if (seconds === 0){
        this.scene.start('gameOver')
    }

}

// wire for functions made
// I used a phaser example for making paths and used that as my wire
// phaser example https://phaser.io/examples/v3/view/paths/complex-path-bounds
function wiresMade(randomNum, color, num, order){
    let path = new Phaser.Curves.Path(135, order);
    graphics.lineStyle(2, color, 0.5);
    path.splineTo([ Math.random() * (620-180)+180, Math.random() * (350-210)+210, Math.random() * (620-180)+180, Math.random() * (350-210)+210, Math.random() * (620-180)+180, Math.random() * (350-210)+210, Math.random() * (620-180)+180, Math.random() * (350-210)+210, Math.random() * (620-180)+180, Math.random() * (350-210)+210]);
    
    console.log(num);
    console.log(correct_wire);

    if (num === correct_wire)
    path.lineTo(700 , 250);
    else if ([1,4,7].includes(num))
    path.lineTo(632 , 280);
    else if ([2,5,8].includes(num))
    path.lineTo(620 , 315);
    else
    path.lineTo(643 , 322);



    path.draw(graphics);
    return path;

}

// Function that gets called when the numbers are clicked
function onObjectClicked(pointer,gameObject,num)
    {
        let wire_array = [wire1,wire2,wire3,wire4,wire5,wire6,wire7,wire8,wire9];
        let int_array = [1,2,3,4,5,6,7,8,9];
        let pickedwire = int_array.indexOf(parseInt(gameObject._text))
        
        if(wire_array[pickedwire].getEndPoint().x === 700)
            decide =  1;
        else
            decide =  2;
    }


