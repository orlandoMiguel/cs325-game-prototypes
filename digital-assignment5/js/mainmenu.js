export default class mainmenu extends Phaser.Scene 
{
    constructor()
    {
        super('mainmenu');
        this.backgroundColor = '#0';
    }

    preload(){
        this.load.image('human',['assets/human.png']);
        this.load.image('splime',['assets/meep.png']);
        this.load.image('start',['assets/start.png'])
    }


    create(){
        game.backgroundColor = "#0";


        // All these blocks just put image or text on the screen 
        let human = this.add.image(600,400,'human');
        human.scale = 1.5;
        human.setOrigin(0.5,0.5);

        let splime = this.add.image(430,500,'splime');
        splime.scale = .07;
        splime.setOrigin(0.5,0.5);

        let style = { font: "50px Comic Sans", fill: "black", align: "center" };
        let title = this.add.text(human.width + 100,human.height/2+30,'Splime Cleanup!',style);
        title.setOrigin(0.5,0.5);

        let styl = { font: "30px Comic Sans", fill: "black", align: "center" ,wordWrap: { width: 450}};
        let instruct = this.add.text(human.width + 100,human.height/2+170,'Using the arrow keys move around Camp Latiki cleaning up the splimes with your magical rake! QUICKLY!!',styl);
        instruct.setOrigin(0.5,0.5);
            

        let start = this.add.sprite(250,450,'start').setInteractive();
        start.scale = 0.5;
        start.on('pointerdown', () => this.clickButton());

    }

    clickButton(){
        console.log("dat boi clicked");
        this.scene.start("playgame");
    }
}


