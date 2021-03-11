let decider;

export default class gameover extends Phaser.Scene 
{
    constructor()
    {
        super('gameover');
        this.backgroundColor = '#0';
    }

    // gets win or loss from game scene and adjusts game over scene accordingly
    init(w_or_l)
    {
        decider = w_or_l.id
    }

    preload(){
        this.load.image('win',['assets/win.png']);
        this.load.image('lose',['assets/fail.png'])
    }


    create(){
        game.backgroundColor = "#0";

        // if game is a win, then smiley face, else sad face
        if (decider === 1)
        {
            let map = this.add.image(400,300,'win');
            map.scale = .5;
            map.setOrigin(0.5,0.5);
        }

        else
        {
            let map = this.add.image(400,300,'lose');
            map.scale = .5;
            map.setOrigin(0.5,0.5);
        }



    }
}



// function actionOnClick() {
//     this.scene.start("playgame");
// }

