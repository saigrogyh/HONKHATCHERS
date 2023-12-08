import Phaser, { Game, Utils } from "phaser";

let bg;
let bgLayer1;
let bgLayer2;
let cloudGroup;
let cloud1;
let cloud2;
let cloud3;
let sakura;
let platformBase;
let button;

class GameScene2 extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  preload() {
   
 this.load.image("button","assets/image/game-scene/components/startbutton.png")
    

    
    
    //background
    this.load.image(
      "background",
      "assets/image/game-scene/background/backgound_game.png"
    );
    
   

  }

  create() {
    
    //background
    bg = this.add.tileSprite(0, 0, 1280, 720, "background").setOrigin(0, 0);

    
    
    this.button = this.add.image(640,350,"button");
    this.button.setInteractive();
    this.button.on('pointerdown'
    , () => {
      this.scene.start("GameScene");
    });
   
  }

  update() {
  
  }
}

export default GameScene2;