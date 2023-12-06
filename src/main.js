import 'phaser';
import Phaser from 'phaser';
import GameScene from './Scene/GameScene';
import GameScene2 from './Scene/GameScene2';

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    width: 1280,
    height: 720,
    parent: 'content',
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {},
            debug: true
        }
    },
    scene: [
        GameScene, 
        
    ]
}
let game = new Phaser.Game(config);