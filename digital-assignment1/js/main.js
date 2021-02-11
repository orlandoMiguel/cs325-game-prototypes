"use strict";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.'


const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    // Phaser converts a dictionary of methods into a Scene subclass.
    scene: { preload: preload, create: create, update: update },
    physics: { default: 'arcade',
                arcade: {
                    gravity: {y:500},
                    debug: false
        }}
    });

function preload() {
    // Load an image and call it 'logo'.
    this.load.image( 'char1', 'assets/nugget.png' );
    this.load.image( 'char2', 'assets/fry.png' );
    this.load.image('background','assets/mcdonalds.jpg');
    this.load.image('ground','assets/platform.png');

}

let player1
let player2
let cursors
let platforms
let floor
let keyA
let keyW
let keyD


function create() {
    // creates the background of the game
    const back = this.add.image(400,300,'background');
    back.scale = 0.555;

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 640, 'ground').setScale(2).refreshBody();
    platforms.tint = 'black';



    // Create a sprite at the center of the screen using the 'logo' image.
    player1 = this.physics.add.sprite( 0,0, 'char1' );
    player2 = this.physics.add.sprite( 750,0, 'char2' );
    player2.scale = 0.3

    // used to change the sprites color
    // player1.tint = 
    
    // Make it bounce off of the world bounds.
    player1.body.collideWorldBounds = true;
    player2.body.collideWorldBounds = true;

    
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    let style = { font: "40px Comic Sans MS", fill: "black", align: "center" , backgroundColor: "white"};
    let text = this.add.text( this.cameras.main.centerX, 15, "~Super McDonalds Smash~", style );
    text.setOrigin( 0.5, 0.0 );

    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey('A');
    keyW = this.input.keyboard.addKey('W');
    keyD = this.input.keyboard.addKey('D');

    

    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);


}

function update() {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    // This function returns the rotation angle that makes it visually match its
    // new trajectory.
    // player1.rotation = this.physics.accelerateToObject( player1, this.input.activePointer, 500, 500, 500 );

    // Player 1 Movement
    if (cursors.left.isDown)
    {
        player1.setVelocityX(-160);
    }

    else if (cursors.right.isDown)
    {
        player1.setVelocityX(160);
    }

    else
    {
        player1.setVelocityX(0);
    }

    if (cursors.up.isDown && player1.body.touching.down)
    {
        player1.setVelocityY(-330);
    }

    // Player 2 Movement
    if (keyA.isDown)
    {
        player2.setVelocityX(-160);
    }

    else if (keyD.isDown)
    {
        player2.setVelocityX(160);
    }

    else
    {
        player2.setVelocityX(0);
    }

    if (keyW.isDown && player2.body.touching.down)
    {
        player2.setVelocityY(-330);
    }    
}


