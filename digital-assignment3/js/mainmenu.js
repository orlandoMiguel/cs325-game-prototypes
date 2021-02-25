export default class mainmenu extends Phaser.Scene 
{
    constructor()
    {
        super('mainmenu');
        this.backgroundColor = '#0';
    }

    preload(){
        this.load.audio('seashanty',['assets/seashanty.mp3']);
        this.load.image('map',['assets/map.jpg']);
        this.load.image('start',['assets/start.png'])
    }


    create(){
        game.backgroundColor = "#0";


        let map = this.add.image(400,300,'map');
        map.scale = 2;
        map.setOrigin(0.5,0.5);

        let style = { font: "50px Apple Chancery", fill: "black", align: "center" };
        let title = this.add.text(map.width + 100,map.height/2+30,'A Pirate\'s Life For Me!',style);
        title.setOrigin(0.5,0.5);
        
        const pirate_sounds = this.sound.add("seashanty", {loop: false, volume:0.03});
        // pirate_sounds.play();

        let start = this.add.sprite(400,300,'start').setInteractive();
        start.scale = 0.5;
        start.on('pointerdown', () => this.clickButton());
        // let style2 = { font: "50px Apple Chancery", fill: "white", align: "center" };
        // let button = this.add.text(300,300,"Start Game", style2);
        // button.setInteractive();
        // button.on('pointerdown', () => this.clickButton());



    }

    clickButton(){
        console.log("dat boi clicked");
        this.scene.start("playgame");
    }
}



// function actionOnClick() {
//     this.scene.start("playgame");
// }

