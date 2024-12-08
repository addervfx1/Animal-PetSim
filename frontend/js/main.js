import Phaser from 'phaser';
import MainMenu from './mainMenu'
import GameScene from './gameScene'


const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH, 
        width: window.innerWidth,
        height: window.innerHeight 
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenu, GameScene],
    resolution: window.devicePixelRatio
};

const game = new Phaser.Game(config);
