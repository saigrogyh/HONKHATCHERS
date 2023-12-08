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
    this.boarder;
    this.button;
  }

  preload() {
    // this.load.image("boarder","/assets/image/game-scene/components/jumppad2.png")
    this.load.image(
      "backgound",
      "assets/image/game-scene/background/backgound_game.png"
    );
    this.load.image("bullet", "assets/image/game-scene/components/bulletshot.png");

    this.load.spritesheet(
      "player",
      "assets/image/game-scene/spritesheets/player_sheet.png",
      {
        frameWidth: 161, // * width of each frame devided by 7
        frameHeight: 161,
      }
    );

   
    this.load.image("enemy1", "assets/image/game-scene/components/enemy1.png");
    this.load.image("enemy2", "assets/image/game-scene/components/enemy2.png");
    this.load.image("enemy3", "assets/image/game-scene/components/enemy3.png");
    this.load.image("platform", "assets/image/game-scene/platforms/ground.png");
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.move = this.add.keyboard;
    this.shoot = this.input.keyboard.addKey("z");
    this.addAnimations();
    this.boarder = this.physics.add.image(300,300,"boarder")
    this.bg = this.add
      .tileSprite(0, 0, 1280, 720, "backgound") // x, y, width, height, key
      .setOrigin(0, 0); // set origin to // ! top left
      this.boarder = this.physics.add.image(250,300,).setOffset(-10,-20).setSize(15, 720).setScale(2);
      this.boarder.rotation = 4.72;
    this.player = this.physics.add.sprite(200, 350, "player");
   this.initUI() 
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
    // this.platform = this.add
    //   .tileSprite(0, 650, 1280, 100, "platform")
    //   .setOrigin(0, 0);


    enemies = this.physics.add.group();
    this.physics.add.collider(
      enemies,
      this.boarder,() =>{
        this.score = 0;
        this.scene.start("Start");
    },
      null,
      this
    );

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
    

    this.player.anims.play("player-walk", true);
    this.respawn();
    enemies.setVelocityX(-150);
    if (this.shoot.isDown) {
      if (this.time.now > shortime) {
        this.bullet.create(this.player.x, this.player.y, "bullet").setScale(.2);
        this.bullet.setVelocityX(500);
        shortime = this.time.now + 400;
      }
    }
    this.info.setText(`Score : ${this.score}`);
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
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
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
      this.score += 10;
    } else if (this.getHitsNeeded(enemy) === 3) {
      this.score += 5;
    } else if (this.getHitsNeeded(enemy) === 2) {
      this.score += 3;
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
  initUI() {
    //  Display the game stats
    this.info = this.add
      .text(10, 10, "", { font: "52px Arial", fill: "#ffffff" })
      .setDepth(10);
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
