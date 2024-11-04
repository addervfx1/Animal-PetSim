import Phaser from 'phaser';
import { animalService } from '../services/animal.service';

class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
        this.currentAnimalId = null;
        this.currentAnimalType = null;
    }

    preload() {
        this.load.image('dogBackground', 'assets/port_background.png');
        this.load.image('catBackground', 'assets/port_background.png');
        this.load.image('dog', 'assets/dog_1.png');
        this.load.image('cat', 'assets/cat_1.png');
    }

    create() {
        this.background = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x87CEFA).setOrigin(0, 0);
        this.titleText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'Animal PetSim', {
            font: '48px Comic Sans MS',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: this.scale.width - 40, useAdvancedWrap: true }
        }).setOrigin(0.5);

        this.startButton = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY + 50, 200, 50, 0xffffff).setInteractive();
        this.startButton.setStrokeStyle(2, 0x000000);

        this.buttonText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Iniciar Jogo', {
            font: '24px Comic Sans MS',
            fill: '#000000'
        }).setOrigin(0.5);

        this.startButton.on('pointerdown', () => {
            this.startLoading(); 
            this.loadAnimals(); 
        });

        this.startButton.on('pointerover', () => {
            this.startButton.setFillStyle(0xe0e0e0);
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setFillStyle(0xffffff);
        });

        this.scale.on('resize', this.resize, this);
        
        
        this.createCustomPrompt();
    }

    startLoading() {
        const loadingScreen = document.getElementById('loading');
        loadingScreen.style.display = 'flex'; 
    }
    
    async loadAnimals() {
        try {
            const result = await animalService.getAllAnimals(); 

            if (result && result.length > 0) {
                this.startButton.setVisible(false);
                this.buttonText.setVisible(false);

                const squareSize = 100;
                const spacing = 20;
                const totalColumns = 3;
                const totalRows = Math.ceil(result.length / totalColumns);
                const totalWidth = (squareSize * totalColumns) + (spacing * (totalColumns - 1));
                const totalHeight = (squareSize * totalRows) + (spacing * (totalRows - 1));
                const startX = this.cameras.main.centerX - totalWidth / 3;
                const startY = this.cameras.main.centerY - totalHeight / 2;

                for (let i = 0; i < result.length; i++) {
                    const x = startX + (i % totalColumns) * (squareSize + spacing);
                    const y = startY + Math.floor(i / totalColumns) * (squareSize + spacing);
    
                    const backgroundKey = result[i].type === 'dog' ? 'dogBackground' : 'catBackground';
                    const backgroundSprite = this.add.image(x + squareSize / 2, y + squareSize / 2, backgroundKey).setOrigin(0.5);
                    backgroundSprite.setDisplaySize(squareSize, squareSize);
    
                    const border = this.add.graphics();
                    border.lineStyle(4, 0x000000, 1);
                    border.strokeRect(x, y, squareSize, squareSize);
    
                    const animalSprite = this.add.image(x + squareSize / 2, y + squareSize / 2, result[i].type === 'dog' ? 'dog' : 'cat').setOrigin(0.5);
                    animalSprite.setDisplaySize(squareSize * 0.8, squareSize * 0.8);
    
                    animalSprite.setInteractive();
                    animalSprite.on('pointerdown', () => {
                        this.currentAnimalId = result[i].id; 
                        this.currentAnimalType = result[i].type; 
                        this.showCustomPrompt(result[i].type); 
                    });
                }
            }
        } catch (error) {
            console.error("Erro ao carregar os animais:", error);
        } finally {
            this.stopLoading(); 
        }
    }

    stopLoading() {
        const loadingScreen = document.getElementById('loading');
        loadingScreen.style.display = 'none'; 
    }

    resize() {
        this.background.setSize(this.scale.width, this.scale.height);
        this.titleText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - 100);
        this.startButton.setPosition(this.cameras.main.centerX, this.cameras.main.centerY + 50);
        this.buttonText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY + 50);
        this.titleText.setWordWrapWidth(this.scale.width - 40);
    }

    
    createCustomPrompt() {
        const customPrompt = document.createElement('div');
        customPrompt.id = 'customPrompt';
        customPrompt.style.display = 'none';
        customPrompt.style.position = 'fixed';
        customPrompt.style.top = '50%';
        customPrompt.style.left = '50%';
        customPrompt.style.transform = 'translate(-50%, -50%)';
        customPrompt.style.backgroundColor = 'white';
        customPrompt.style.border = '1px solid black';
        customPrompt.style.padding = '20px';
        customPrompt.style.zIndex = '1000';
        
        const promptMessage = document.createElement('p');
        promptMessage.id = 'promptMessage';
        promptMessage.textContent = 'Qual nome você gostaria de dar para seu animal?';
        
        const userInput = document.createElement('input');
        userInput.type = 'text';
        userInput.id = 'userInput';
        
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Enviar';
        submitButton.id = 'submitButton';
        
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        cancelButton.id = 'cancelButton';

        
        submitButton.onclick = () => {
            const name = userInput.value;
            if (name) {
                console.log(`Você deu o nome "${name}" para seu ${this.currentAnimalType}.`);
                customPrompt.style.display = 'none'; 
            }
        };

        cancelButton.onclick = () => {
            customPrompt.style.display = 'none'; 
        };

        
        customPrompt.appendChild(promptMessage);
        customPrompt.appendChild(userInput);
        customPrompt.appendChild(submitButton);
        customPrompt.appendChild(cancelButton);
        document.body.appendChild(customPrompt);
    }

    
    showCustomPrompt(animalType) {
        this.currentAnimalType = animalType; 
    
        
        if (document.getElementById('overlay')) {
            return; 
        }
    
        
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
        overlay.style.zIndex = '1000'; 
    
    
        
        const customPrompt = document.createElement('div');
        customPrompt.id = 'customPrompt'; 
        customPrompt.innerHTML = `
            <h2 style="color: #007bff;">Dê um nome ao seu ${animalType === 'dog' ? 'cachorro' : 'gato'}!</h2>
            <input type="text" id="animalName" placeholder="Nome do animal" style="padding: 10px; width: 80%;"/>
            <button id="submitName">Confirmar</button>
            <button id="closeDialog">Cancelar</button>
        `;
        
        
        customPrompt.style.position = 'absolute';
        customPrompt.style.top = '50%';
        customPrompt.style.left = '50%';
        customPrompt.style.transform = 'translate(-50%, -50%)';
        customPrompt.style.padding = '20px';
        customPrompt.style.backgroundColor = 'white';
        customPrompt.style.borderRadius = '10px';
        customPrompt.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        customPrompt.style.zIndex = '1001'; 
    
        
        document.body.appendChild(overlay);
        document.body.appendChild(customPrompt);
    
        
        document.getElementById('submitName').onclick = async () => {
            const name = document.getElementById('animalName').value;
            if (name) {
                    this.startLoading();
                    const success = await animalService.updateAnimal(this.currentAnimalId, name);
                    if (success) {
                        this.showConfirmationMessage(this.currentAnimalType, name);
                    }
                    customPrompt.style.display = 'none'; 
                    this.stopLoading();
            
            } else {
                alert("Por favor, insira um nome!");
                this.stopLoading();

            }
        };
    
        
        document.getElementById('closeDialog').onclick = () => {
            overlay.remove(); 
            customPrompt.remove(); 
        };
    
        
        overlay.style.display = 'block';
        customPrompt.style.display = 'block';
    }
    
    showConfirmationMessage(animalType, animalName) {
        const confirmationMessage = this.add.container(400, 300); 
    
        
        const background = this.add.graphics();
        background.fillStyle(0xffffff, 0.8); 
        background.fillRect(-150, -50, 300, 100); 
    
        
        const messageText = this.add.text(0, 0, `O ${animalType} ${animalName} foi selecionado.`, {
            fontSize: '20px',
            color: '#000',
            align: 'center'
        }).setOrigin(0.5);
    
        
        const okButton = this.add.text(0, 30, 'OK', {
            fontSize: '16px',
            color: '#000',
            backgroundColor: '#c0c0c0', 
            padding: { x: 10, y: 5 },
            borderRadius: 5,
        }).setOrigin(0.5).setInteractive();
    
        
        okButton.on('pointerdown', () => {
            confirmationMessage.destroy(); 
        });
    
        
        confirmationMessage.add([background, messageText, okButton]);
    
        
        const shadow = this.add.graphics();
        shadow.fillStyle(0x000000, 0.2); 
        shadow.fillRect(-152, -52, 304, 104); 
        confirmationMessage.add(shadow);
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
