import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

let cursors;
let element;

class MyScene extends Phaser.Scene {
    
    constructor() {
        super();
        
        this.bouncy = null;
    }
    
    preload() {
        // Load an image and call it 'logo'.
        this.load.image( 'logo', 'assets/phaser.png' );
        
        // Load a tilemap and call it 'map'.
        // You can load from Tiled's JSON format:
        this.load.tilemapTiledJSON( 'map', 'assets/rougelike.json' );
        // Or from a .csv file:
        // this.load.tilemapCSV( 'map', 'assets/tilemap_example.csv' );
        
        // Load the tiles (images) for the map.
        this.load.image( 'tiles', 'assets/roguelikeSheet_transparent.png' );
    }
    
    create() {
        // Create the map.
        let map = this.make.tilemap({ key: 'map' });
        // For CSV files, also specify the tile size:
        // let map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        
        // Add the tiles (images) to the map.
        let tileset = map.addTilesetImage('roguelikeSheet_transparent','tiles' );
        
        // Create a layer from the map using the name given in the JSON file:
        let ground = map.createLayer( 'Ground', tileset );
        let water = map.createLayer( 'Water', tileset );
        let colliders = map.createLayer( 'Colliders', tileset );


        ground.setCollisionByProperty({collide : true})
        water.setCollisionByProperty({collide : true})
        colliders.setCollisionByProperty({collide : true})

        

        // For CSV files, the ground is a number:
        // let ground = map.createground( 0, tileset );
        
        // Set the camera and world bounds to the tilemap's bounds.
        // Make the ground's origin the top-left corner.
        // ground.setOrigin(0,0);
        this.physics.world.setBounds( ground.x, ground.y, ground.width, ground.height );
        this.cameras.main.setBounds( ground.x, ground.y, ground.width, ground.height );
        
        // Create a sprite at the center of the screen using the 'logo' image.
        element = this.physics.add.sprite( this.cameras.main.centerX, this.cameras.main.centerX, 'logo' );
        element.setScale(0.05)
        
        // Tell the camera to follow the sprite.
        this.cameras.main.startFollow( element, true, 0.08, 0.08 );
        this.cameras.main.setZoom(3)
        
        // Make it bounce off of the world bounds.
        element.body.collideWorldBounds = true;
        
        // Make the camera shake when clicking/tapping on it.
        // this.bouncy.setInteractive();
        // this.bouncy.on( 'pointerdown', function( pointer ) {
        //     this.scene.cameras.main.shake(500);
        //     });
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        let style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        let text = this.add.text( this.cameras.main.centerX, 15, "Build something amazing.", style );
        text.setOrigin( 0.5, 0.0 );
        // The text shouldn't scroll with the camera.
        text.setScrollFactor(0);
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(element,water)
        this.physics.add.collider(element,colliders)


    }
    
    update() {

        element.body.setVelocity(0);

        if (cursors.left.isDown)
        {
            element.body.setVelocityX(-100);
        }
        else if (cursors.right.isDown)
        {
            element.body.setVelocityX(100);
        }

        if (cursors.up.isDown)
        {
            element.body.setVelocityY(-100);
        }
        else if (cursors.down.isDown)
        {
            element.body.setVelocityY(100);
        }
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        // this.bouncy.rotation = this.physics.accelerateToObject(
        //     this.bouncy,
        //     this.input.activePointer.positionToCamera(this.cameras.main),
        //     500, 500, 500
        //     );
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
