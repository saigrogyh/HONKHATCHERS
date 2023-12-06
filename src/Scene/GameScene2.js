import Phaser from "phaser";

let bg;
let bgLayer1;
let bgLayer2;
let cloudGroup;
let cloud1;
let cloud2;
let cloud3;
let sakura;
let platformBase;
let player;

class GameScene2 extends Phaser.Scene {
  constructor() {
    super("GameScene2");
  }

  preload() {
    //background
    this.load.image(
      "background",
      "assets/image/game-scene/background/background-dark.png"
    );
    this.load.image(
      "background_Layer2",
      "assets/image/game-scene/background/bg-dark-layer2.png"
    );
    this.load.image(
      "background_Layer1",
      "assets/image/game-scene/background/bg-dark-layer1.png"
    );

    //clouds
    this.load.image("cloud1", "assets/image/game-scene/platforms/cl-long.png");
    this.load.image("cloud2", "assets/image/game-scene/platforms/cl.png");
    this.load.image("cloud3", "assets/image/game-scene/platforms/cl-long2.png");

    //sakura animation
    this.load.spritesheet(
      "sakuraAnim",
      "assets/image/game-scene/spritesheets/sakuraAnim.png",
      {
        frameWidth: 888,
        frameHeight: 627,
      }
    );

    //platforms
    this.load.image(
      "platform-base",
      "assets/image/game-scene/platforms/platform-long4.png"
    );

    //player
    this.load.image("player", "assets/image/_dev/ufo.png");
  }

  create() {
    //background
    bg = this.add.tileSprite(0, 0, 1280, 720, "background").setOrigin(0, 0);

    bgLayer1 = this.add
      .tileSprite(0, 0, 1280, 720, "background_Layer1")
      .setOrigin(0, 0);

    bgLayer2 = this.add
      .tileSprite(0, 0, 1280, 720, "background_Layer2")
      .setOrigin(0, 0);

    //cloudGroup with clouds
    cloudGroup = this.physics.add.staticGroup();

    cloud1 = cloudGroup
      .create(100, 500, "cloud1")
      .setOrigin(0, 1)
      .setScale(0.6);

    cloud2 = cloudGroup
      .create(1240, 330, "cloud2")
      .setOrigin(1, 1)
      .setScale(0.6);

    cloud3 = cloudGroup
      .create(200, 200, "cloud3")
      .setOrigin(0, 1)
      .setScale(0.6);

    //sakura with animation
    sakura = this.add
      .sprite(890, 660, "sakuraAnim")
      .setOrigin(0.5, 1)
      .setScale(0.6);

    this.anims.create({
      key: "sakuraAnim",
      frames: this.anims.generateFrameNumbers("sakuraAnim", {
        start: 0,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });

    sakura.anims.play("sakuraAnim");

    //platforms
    platformBase = this.physics.add
      .sprite(640, 730, "platform-base")
      .setOrigin(0.5, 1);

    //player
    player = this.physics.add
      .sprite(460, 360, "player")
      .setOrigin(0.5, 0.5)
      .setCollideWorldBounds(true)
      .setScale(0.05)
      .setSize(2000, 1000);
  }

  update() {
    //background movement
    bg.tilePositionX += 0.03;
    bgLayer1.tilePositionX += 0.07;
    bgLayer2.tilePositionX += 0.1;
  }
}

export default GameScene2;
