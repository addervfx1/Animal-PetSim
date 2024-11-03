import Phaser from 'phaser';

class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
    }

    create() {
        this.background = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x87CEFA).setOrigin(0, 0); // Azul céu

        this.titleText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'Animal PetSim', {
            font: '48px Comic Sans MS',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: this.scale.width - 40, useAdvancedWrap: true }
        }).setOrigin(0.5);

        this.startButton = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY + 50, 200, 50, 0xffffff).setInteractive(); // Botão branco
        this.startButton.setStrokeStyle(2, 0x000000); 

        this.buttonText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Iniciar Jogo', {
            font: '24px Comic Sans MS',
            fill: '#000000' 
        }).setOrigin(0.5);

        this.startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        this.startButton.on('pointerover', () => {
            this.startButton.setFillStyle(0xe0e0e0);
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setFillStyle(0xffffff);
        });

        this.scale.on('resize', this.resize, this);
    }

    resize() {
        this.background.setSize(this.scale.width, this.scale.height);
        this.titleText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - 100);
        this.startButton.setPosition(this.cameras.main.centerX, this.cameras.main.centerY + 50);
        this.buttonText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY + 50);
        this.titleText.setWordWrapWidth(this.scale.width - 40);
    }
}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenu],
    resolution: window.devicePixelRatio
};

const game = new Phaser.Game(config);
