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
    this.load.image('greenhealth','assets/green.png');
    this.load.image('redhealth','assets/red.png');
    this.load.audio('fight_music',['assets/mk.mp3'])


}

let player1
let player2
let cursors
let platforms
let floor
let keyA
let keyW
let keyD
let healthBar
let healthBar1
let speed1
let speed2
let gameover


function create() {

    speed1 = 0;
    speed2 = 0;
    // creates the background of the game
    const back = this.add.image(400,300,'background');
    back.scale = 0.555;

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 640, 'ground').setScale(2).refreshBody();
    platforms.tint = 'black';

    const ding = this.sound.add("fight_music", {loop: false});
    ding.play();



    // Create a sprite at the center of the screen using the 'logo' image.
    player1 = this.physics.add.sprite( 0,0, 'char1' );
    player1.health = 100;
    player1.maxHealth = 100;

    player2 = this.physics.add.sprite( 750,0, 'char2' );
    player2.scale = 0.15;
    player2.health = 100;
    player2.maxHealth = 100;

    // healthbar = this.physics.add.sprite(0,0,'healthbar');
    // healthbar.width = player1.width;

    // Nugget Health Bar
    var backgroundBar = this.add.image(4, 200, 'redhealth');
    backgroundBar.setOrigin(0,0);
    backgroundBar.fixedToCamera = true;

    healthBar = this.add.image(4, 200, 'greenhealth');
    healthBar.setOrigin(0,0);
    healthBar.fixedToCamera = true;
    

    var healthLabel = this.add.text(4, 180, 'Nugget', {fontSize:'20px', fill:'#ffffff', stroke: "black", strokeThickness: 3});
    healthLabel.fixedToCamera = true;

    // French Fry Health Bar
    var backgroundBar1 = this.add.image(596, backgroundBar.y, 'redhealth');
    backgroundBar1.setOrigin(0,0);
    backgroundBar1.fixedToCamera = true;

    healthBar1 = this.add.image(596,backgroundBar.y, 'greenhealth');
    healthBar1.setOrigin(0,0);
    healthBar1.fixedToCamera = true;


    var healthLabel1 = this.add.text(675, 180, 'French Fry', {fontSize:'20px', fill:'#ffffff', stroke: "black", strokeThickness: 3});
    healthLabel1.fixedToCamera = true;

    // used to decrease sprite health and scale health bar
    // player.damage(10);
    // healthBar.scale.setTo(player.health / player.maxHealth, 1);

    
    // Make it bounce off of the world bounds.
    player1.body.collideWorldBounds = true;
    player2.body.collideWorldBounds = true;

    
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    let style = { font: "40px Comic Sans MS", fill: "black", align: "center" , backgroundColor: "white"};
    let text = this.add.text( this.cameras.main.centerX, 15, "~Super McDonalds Smash~", style );
    text.setOrigin( 0.5, 0.0 );
    let style2 = { font: "30px Comic Sans MS", fill: "black", align: "center", stroke: "white", strokeThickness: 4};
    let controls = this.add.text( this.cameras.main.centerX, 250, "Nugget Movement -  left: ←  jump: ↑  right: →\n\n \
    French Fry Movement -  left: 'a'  jump: 'w'  right: 'd'", style2).setInteractive();
    controls.setOrigin(0.5,0.0);
    let style3 = { font: "30px Comic Sans MS", fill: "black", align: "center", stroke: "white", strokeThickness: 4};
    let rules = this.add.text( this.cameras.main.centerX, 100, "Be quick and stomp the player to attack!\n But be careful, the floor is slippery!", style2).setInteractive();
    rules.setOrigin(0.5,0.0);

    this.tweens.add({
        targets: controls,
        alpha: 0,
        duration: 9000,
    }, this);

    this.tweens.add({
        targets: rules,
        alpha: 0,
        duration: 10000,
    }, this);
    
    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey('A');
    keyW = this.input.keyboard.addKey('W');
    keyD = this.input.keyboard.addKey('D');

    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player1, player2, contact, null, this);   
}

function update() {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    // This function returns the rotation angle that makes it visually match its
    // new trajectory.
    // player1.rotation = this.physics.accelerateToObject( player1, this.input.activePointer, 500, 500, 500 );

    console.log(gameover)

    if (gameover == 1)
    {
        player1.setVelocityX(0);
        player2.setVelocityX(0);
        return;
    }

    // Player 1 Movement
    if (cursors.left.isDown && cursors.right.isDown)
        player1.setVelocityX(0);

    if (cursors.left.isDown)
    {
        speed1 += -2;
        player1.setVelocityX(speed1);
    }

    else if (cursors.right.isDown)
    {
        speed1 += 2;
        player1.setVelocityX(speed1);
    }

    else
    {
        speed1 = 0;
        player1.setVelocityX(0);
    }

    if (cursors.up.isDown && player1.body.touching.down)
    {
        player1.setVelocityY(-410);
    }

    // Player 2 Movement
    if (keyA.isDown && keyD.isDown)
        player2.setVelocityX(0);

    else if (keyA.isDown)
    {
        if (speed2 >= 0)
            speed2 = -speed2;
        speed2 += -2;
        player2.setVelocityX(speed2);
    }

    else if (keyD.isDown)
    {
        speed2 += 2;
        player2.setVelocityX(speed2);
    }

    else
    {
        speed2 = 30;
        player2.setVelocityX(0);
    }

    if (keyW.isDown && player2.body.touching.down)
    {
        player2.setVelocityY(-365);
    }    
}

function contact (player1, player2)
{
    if (healthBar1.scaleX <= 0.0 || healthBar.scaleX <= 0.0)
    {
        console.log('player died'); 

        gameover = 1;

        if (healthBar1.scaleX <= 0.0)
        {
            
            let style3 = { font: "30px Comic Sans MS", fill: "black", stroke: "white", strokeThickness: 4,boundsAlignH: "center", boundsAlignV: "middle"};
            let end = this.add.text(this.cameras.main.centerX,250, "Nugget WON!", style3);
            end.setOrigin( 0.5, 0.0 );

        }
        else
        {
            let style3 = { font: "30px Comic Sans MS", fill: "black", stroke: "white", strokeThickness: 4,boundsAlignH: "center", boundsAlignV: "middle"};
            let end = this.add.text(this.cameras.main.centerX,250, "French Fry WON!", style3);
            end.setOrigin( 0.5, 0.0 );
        }
    }

    else
    {
        if (Math.abs(player1.body.velocity.x) > Math.abs(player2.body.velocity.x))
        {
            console.log(healthBar1.scaleX)
            if (healthBar1.scaleX > 0.0)
                healthBar1.scaleX = healthBar1.scaleX - .01;
        }
        else if (Math.abs(player1.body.velocity.x) < Math.abs(player2.body.velocity.x))
        {
            if (healthBar.scaleX > 0.0)
                healthBar.scaleX = healthBar.scaleX - .01;
        }
    }

}


