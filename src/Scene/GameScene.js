// ! import Phaser
import Phaser from "phaser";
var bullet;

// declare a variable // ! to hold the background
var shortime = 0;
var enemie1;
var enemie2;
var enemie3;

var enemies;
// ! create a class extending Phaser.Scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
    this.score = 0;
    this.bg;
    this.value = 5;
    this.player;
    this.bullet;
    this.shoot;
    this.spawntime = 0;
    this.breaktime = 0;
  }

  preload() {
    this.load.image(
      "bg-pink",
      "assets/image/game-scene/background/background-pink.png"
    );
    this.load.image("bullet", "assets/image/game-scene/components/box.png");

    this.load.spritesheet(
      "goose",
      "assets/image/game-scene/spritesheets/goose.png",
      {
        frameWidth: 251, // * width of each frame devided by 7
        frameHeight: 250,
      }
    );

    this.load.image("logs", "assets/image/game-scene/components/logs.png");
    this.load.image("enemy1", "assets/image/game-scene/components/logs.png");
    this.load.image("enemy2", "assets/image/game-scene/components/logs.png");
    this.load.image("enemy3", "assets/image/game-scene/components/logs.png");
    this.load.image("platform", "assets/image/game-scene/platforms/ground.png");
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.move = this.add.keyboard;
    this.shoot = this.input.keyboard.addKey("z");
    this.addAnimations();
    this.bg = this.add
      .tileSprite(0, 0, 1280, 720, "bg-pink") // x, y, width, height, key
      .setOrigin(0, 0); // set origin to // ! top left
    this.player = this.physics.add.sprite(200, 350, "goose");
    this.player.setCollideWorldBounds(true);
    this.bullet = this.physics.add.group();
    this.bullet.enableBody = true;
    this.bullet.physicsBodyType = Phaser.Physics.Arcade;

    // * this.myCam = this.cameras.main
    // * this.myCam.setBounds(0,0, 1280, 720)
    // * this.myCam.setZoom(2)

    this.physics.world.setBounds(0, 0, 1500, 750);
    this.physics.world.setBoundsCollision(true, true, true);
    // ? adding new platform by using tileSprite
    this.platform = this.add
      .tileSprite(0, 600, 1280, 100, "platform")
      .setOrigin(0, 0);
    this.groupObject = this.add.group();

    enemies = this.physics.add.group();

    this.physics.add.collider(
      this.bullet,
      enemies,
      this.bulletHitEnemy,
      null,
      this
    );
    this.player.setSize(200, 200).setOffset(0, 0.4);
  }

  update(time) {
    this.playermovement();
    this.bg.tilePositionX += 1;

    this.player.anims.play("player-walk", true);
    this.respawn();
    enemies.setVelocityX(-200);
    if (this.shoot.isDown) {
      if (this.time.now > shortime) {
        this.bullet.create(this.player.x, this.player.y, "bullet");
        this.bullet.setVelocityX(500);
        shortime = this.time.now + 400;
      }
    }
  }
  // ! move
  playermovement() {
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-500);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(500);
    } else {
      this.player.setVelocityY(0);
    }
  }
  addAnimations() {
    this.anims.create({
      key: "player-walk",
      frames: this.anims.generateFrameNumbers("goose", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
  //! shootingsystem
  bulletHitEnemy(bullet, enemy) {
    if (!enemy.hitCount) {
      enemy.hitCount = 0;
    }
    bullet.destroy();
    // Increment the hit count
    enemy.hitCount++;
    const hitsNeeded = this.getHitsNeeded(enemy);
    // Check if the enemy has been hit twice
    if (enemy.hitCount >= hitsNeeded) {
      this.scoreSystem(enemy);
      console.log(this.score);
      enemy.destroy();
    }
  }
  // * enemyType
  getHitsNeeded(enemy) {
    // Define the number of hits needed for each enemy type
    const hitsByType = {
      enemy1: 2,
      enemy2: 3,
      enemy3: 5,
    };

    // Return the hits needed for the specific enemy type
    return hitsByType[enemy.texture.key] || 1;
  }

  // score

  scoreSystem(enemy) {
    if (this.getHitsNeeded(enemy) === 5) {
      this.score += 5;
    } else if (this.getHitsNeeded(enemy) === 3) {
      this.score += 3;
    } else if (this.getHitsNeeded(enemy) === 2) {
      this.score += 5;
    }
  }

  //!respawn
  randomY() {
    const fence = 100;
    return Phaser.Math.Between(fence, 720 - fence);
  }

  respawn() {
    if (this.score >= 200) {
      this.time.delayedCall(
        10000,
        () => {
          if (this.time.now > this.spawntime) {
          createEnemy(1280, this.randomY(), "enemy3");
          createEnemy(1280, this.randomY(), "enemy3");
          this.spawntime = this.time.now + 2500;
        }
        },
        [],
        this
      );
    } else if (this.score >= 150) {
      this.time.delayedCall(
        8000,
        () => {
          var time = 3500;
          if (this.time.now > this.spawntime) {
          createEnemy(1280, this.randomY(), "enemy2");
          createEnemy(1280, this.randomY(), "enemy2");
          this.spawntime = this.time.now + time;}
            time -= 50 ;
        },
        [],
        this
      );
    } else if (this.score >= 100) {
      if (this.time.now > this.spawntime) {
        createEnemy(1280, this.randomY(), "enemy1");

        createEnemy(1280, this.randomY(), "enemy2");
        this.spawntime = this.time.now + 2500;
      }
    } else if (this.score < 100) {
      if (this.time.now > this.spawntime) {
        createEnemy(1280, this.randomY(), "enemy1");

        this.spawntime = this.time.now + 1200;
      }
    }
  }
}
export default GameScene;

function createEnemy(x, y, type) {
  const enemy = enemies.create(x, y, type);
  enemies.add(enemy);
  enemy.setOrigin(0.5, 0.5);
  switch (type) {
    case "enemy1":
      enemy.setScale(1); //5
      break;
    case "enemy2":
      enemy.setScale(1.5); //8
      break;
    case "enemy3":
      enemy.setScale(2); //15
      break;
    default:
      break;
  }
}
