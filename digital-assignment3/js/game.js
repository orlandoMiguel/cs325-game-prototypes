let ship;
let cursors;
let bullets;
let spacebar;

export default class game extends Phaser.Scene{
    constructor(){
        super("gamescene");
    }


    preload(){
        this.load.image('ship',['assets/ship.png']);
        this.load.image('bullet',['assets/ball.png']);

    }

    create(){
        var Bullet = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize:
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
                this.speed = Phaser.Math.GetSpeed(400, 1);

            },
    
            fire: function (x, y,pship)
            {
                this.setPosition(x, y);
                this.setActive(true);
                this.setVisible(true);

                this.setAngle(pship.body.rotation);

                let angle = Phaser.Math.DegToRad(pship.body.rotation);

                this.scene.physics.velocityFromRotation(angle, this.speed, pship.body.acceleration);

                this.velocityx *= 2;
                this.velocityy *= 2;
            },
    
            update: function (time, delta)
            {
                this.y -= this.speed * delta * ship.rotation;
                // if (this.y < -50)
                // {
                //     this.setActive(false);
                //     this.setVisible(false);
                // }
            }
    
        });

        bullets = this.add.group({
            classType: Bullet,
            maxSize: 1,
            runChildUpdate: true,
            scaleXY: [0.5,0.5]
        });

        ship = this.physics.add.sprite(350,400,'ship');
        ship.setScale(.2);
        ship.setDamping(true);
        ship.setDrag(.5);
        ship.setMaxVelocity(200);
        ship.angle = 180;
        // ship.body.setAllowGravity(false)

        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey('SPACE');

        this.add.text(20,20,"Loading game...");
    }

    update ()
    {
    if (cursors.up.isDown)
    {
        console.log(ship.rotation);
        this.physics.velocityFromRotation(ship.rotation, 100, ship.body.acceleration);
    }
    else
    {
        ship.setAcceleration(0);
    }

    if (cursors.left.isDown)
    {
        ship.setAngularVelocity(-50);
    }
    else if (cursors.right.isDown)
    {
        ship.setAngularVelocity(50);
    }
    else
    {
        ship.setAngularVelocity(0);
    }

    if (spacebar.isDown)
    {
        var bullet = bullets.get();
        if (bullet)
        {
            bullet.fire(ship.x, ship.y,ship);
        }
        console.log('fired!');

    }


    // if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    // {
    //     fireBullet();
    // }

    this.physics.world.wrap(ship, 32);

    // bullets.forEachExists(screenWrap, this);
    }
}