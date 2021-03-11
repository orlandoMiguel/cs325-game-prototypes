// global variables
let cursors;
let element;
let enemy_counter;
let text;
let timer;
let timedEvent;
let style;
let seconds = 100;
let w_or_l = 0;

export default class game extends Phaser.Scene{
    constructor(){
        super("playgame");
    }


    // preloads all the pictures
    // human.png was created by me as well as the rougelike.json
    preload(){
        this.load.image( 'human', 'assets/human.png' );
        this.load.tilemapTiledJSON( 'map', 'assets/rougelike.json' );
        this.load.image( 'tiles', 'assets/roguelikeSheet_transparent.png' );
        this.load.image('slimeboi','assets/meep.png')

    }

    create(){

        // this block of code creates the map, alligns the tiles, and creates the layers
        let map = this.make.tilemap({ key: 'map' });
        let tileset = map.addTilesetImage('roguelikeSheet_transparent','tiles' );
        let ground = map.createLayer( 'Ground', tileset );
        let water = map.createLayer( 'Water', tileset );
        let colliders = map.createLayer( 'Colliders', tileset );

        // this block keeps track of the splimes positions using Tiled and makes sure that each splime si able to collide with not
        // only the player but also the landscape
        let enemy = this.physics.add.group({key:'slimeboi',quantity:-1,bounceX:1,bounceY:1,velocityY:17,velocityX:17});
        enemy.enableBody = true;
        let slimearray = map.createFromObjects('enemies',{name:'slimey',key:'slimeboi'});
        enemy_counter = slimearray.length;
        for (var i = 0; i < slimearray.length; i++)
        {       
            enemy.add(slimearray[i]);
            slimearray[i].body.collideWorldBounds=true;    
        }

        // this block makes sure that the collision property transfers
        ground.setCollisionByProperty({collide : true})
        water.setCollisionByProperty({collide : true})
        colliders.setCollisionByProperty({collide : true})

        // adjusts worldview of game
        this.physics.world.setBounds( ground.x, ground.y, ground.width, ground.height );
        this.cameras.main.setBounds( ground.x, ground.y, ground.width, ground.height );
        
        // adjusts character
        element = this.physics.add.sprite( 910, 690, 'human' );
        element.setScale(0.16)
        element.body.setSize(90,30)
        element.body.setOffset(element.width/2 - 20,element.height/2+55)
        
        // makes sure that the camera is focused on the characters
        this.cameras.main.zoom = 3;
        this.cameras.main.startFollow( element, true,1, 1 );
        
        element.body.collideWorldBounds = true;

        // displays how many splimes are still on the map
        style = { font: "100px Verdana", fill: "black",backgroundColor: "white"};
        text = this.add.text(0,0,"Enemies left to clean up: " + enemy_counter, style );

        // timer set to 1 min
        timer = this.add.text(0,0,'',style);
        timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, repeat:99 });
        cursors = this.input.keyboard.createCursorKeys();

        // create colliders for everything and if the splime and player collide it gets rid of the splime
        this.physics.add.collider(element,water);
        this.physics.add.collider(element,ground);
        this.physics.add.collider(enemy,ground);
        this.physics.add.collider(element,colliders);
        this.physics.add.collider(enemy,water);
        this.physics.add.collider(enemy,colliders);
        this.physics.add.collider(element,enemy,function(element,enemy){
            console.log('touch');
            enemy_counter -= 1;
            enemy.destroy();
        });
    }

    update ()
    {
        // if checks to see if all the splimes were cleaned up
        if (enemy_counter === 0)
        {
            w_or_l = 1
            this.scene.start('gameover',{id:w_or_l})

        }

        // these two blocks keep track of the current splime counter and time to make sure it updates and stays in view of the player
        text.setPosition(this.cameras.main.worldView.x,this.cameras.main.worldView.y)
        text.setText("Enemies left to clean up: " + enemy_counter)
        text.setScale(0.07);

        timer.setPosition(this.cameras.main.worldView.x+169,this.cameras.main.worldView.y)
        timer.setScale(0.07);
        timer.setText('Time Remaining: ' + seconds + '.' + timedEvent.getProgress().toString().substr(2, 2) + ' sec');

        // this if else if helps with cursor movement of the character
        element.setVelocity(0);

        if (cursors.left.isDown)
        {
            element.setVelocityX(-80);
        }
        else if (cursors.right.isDown)
        {
            element.setVelocityX(80);
        }

        if (cursors.up.isDown)
        {
            element.setVelocityY(-80);
        }
        else if (cursors.down.isDown)
        {
            element.setVelocityY(80);
        }


    }

    
}

// this function keeps track of time and if time runs out go to game over screen
function onEvent ()
{
    seconds--;
    if (seconds === 0)
    {
        w_or_l = 0
        this.scene.start('gameover',{id:w_or_l})
    }
}
