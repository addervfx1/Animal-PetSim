import Phaser from 'phaser';
import { animalService } from '../services/animal.service';

class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
        this.currentAnimalId = null;
        this.currentAnimalType = null;
        this.selectedBreed = null;

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
            const animal = this.loadAnimals(); 
            this.scene.start('GameScene', animal);
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
            const result = await animalService.getAnimalsByUser(localStorage.getItem('userId')); 

            if (result === null) {
                this.startButton.setVisible(false);
                this.buttonText.setVisible(false);

                const squareSize = 100;
                const spacing = 20;
                const totalColumns = 3;
                const totalRows = Math.ceil(2 / totalColumns);
                const totalWidth = (squareSize * totalColumns) + (spacing * (totalColumns - 1));
                const totalHeight = (squareSize * totalRows) + (spacing * (totalRows - 1));
                const startX = this.cameras.main.centerX - totalWidth / 3;
                const startY = this.cameras.main.centerY - totalHeight / 2;

                const animalTypes = ['dog', 'cat'];

                for (let i = 0; i < animalTypes.length; i++) {
                    const x = startX + (i % totalColumns) * (squareSize + spacing);
                    const y = startY + Math.floor(i / totalColumns) * (squareSize + spacing);
                
                    const backgroundKey = animalTypes[i] === 'dog' ? 'dogBackground' : 'catBackground';
                    const backgroundSprite = this.add.image(x + squareSize / 2, y + squareSize / 2, backgroundKey).setOrigin(0.5);
                    backgroundSprite.setDisplaySize(squareSize, squareSize);
                
                    const border = this.add.graphics();
                    border.lineStyle(4, 0x000000, 1);
                    border.strokeRect(x, y, squareSize, squareSize);
                
                    const animalSprite = this.add.image(x + squareSize / 2, y + squareSize / 2, animalTypes[i] === 'dog' ? 'dog' : 'cat').setOrigin(0.5);
                    animalSprite.setDisplaySize(squareSize * 0.8, squareSize * 0.8);
                
                    animalSprite.setInteractive();
                    animalSprite.on('pointerdown', () => {
                        this.currentAnimalType = animalTypes[i];
                        this.showBreedSelection(this.currentAnimalType); 
                    });
                }
            }
            
            else{
                return result;
            }
        }
        catch (error) {
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
        
        
        document.getElementById('closeDialog').onclick = () => {
            overlay.remove(); 
            customPrompt.remove(); 
        };

        document.getElementById('submitName').onclick = async () => {
            const name = document.getElementById('animalName').value;
            if (name) {
                    this.startLoading();
                    const success = await animalService.insertAnimal(this.currentAnimalType, name, this.selectedBreed, localStorage.getItem('userId'));
                    if (success) {
                        this.showConfirmationMessage(this.currentAnimalType, name);
                        overlay.remove(); 
                        customPrompt.remove(); 
                    }
                    customPrompt.style.display = 'none'; 
                    this.stopLoading();
            
            } else {
                alert("Por favor, insira um nome!");
                this.stopLoading();

            }
        };
    
        
    
        overlay.style.display = 'block';
        customPrompt.style.display = 'block';
    }
    
    showConfirmationMessage(animalType, animalName) {
        const confirmationMessage = this.add.container(400, 300); 
    
        
        const background = this.add.graphics();
        background.fillStyle(0xffffff, 0.8); 
        background.fillRect(-150, -50, 300, 100); 

        const messageText = this.add.text(0, 0, `O ${animalType} ${animalName} foi criado.`, {
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
    }

    showBreedSelection(animalType) {
        this.currentAnimalType = animalType;
    
        // Verifica se já existe a janela, evitando múltiplas janelas abertas
        if (document.getElementById('overlay')) {
            return;
        }
    
        // Criar o overlay (fundo transparente)
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '1000';
    
        // Criar a janela de seleção de raças
        const breedSelectionPrompt = document.createElement('div');
        breedSelectionPrompt.id = 'breedSelectionPrompt';
        breedSelectionPrompt.innerHTML = `
            <h2 style="color: #007bff; text-align: center;">Escolha a raça do seu ${animalType === 'dog' ? 'cachorro' : 'gato'}!</h2>
            <div id="breedList" style="display: flex; flex-wrap: wrap; justify-content: space-around; padding: 10px;"></div>
            <button id="closeDialog" style="margin-top: 20px; padding: 10px 20px; background-color: #ff4d4d; color: white; border: none; border-radius: 5px; cursor: pointer;">Cancelar</button>
        `;
    
        breedSelectionPrompt.style.position = 'absolute';
        breedSelectionPrompt.style.top = '50%';
        breedSelectionPrompt.style.left = '50%';
        breedSelectionPrompt.style.transform = 'translate(-50%, -50%)';
        breedSelectionPrompt.style.padding = '30px';
        breedSelectionPrompt.style.backgroundColor = 'white';
        breedSelectionPrompt.style.borderRadius = '10px';
        breedSelectionPrompt.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
        breedSelectionPrompt.style.zIndex = '1001';
        breedSelectionPrompt.style.maxWidth = '80%';
        breedSelectionPrompt.style.width = '500px'; // Ajuste a largura
        breedSelectionPrompt.style.textAlign = 'center';
    
        // Lista de raças para cães e gatos
        const dogBreeds = ['Labrador', 'Bulldog', 'Beagle', 'Poodle', 'Pitbull'];
        const catBreeds = ['Siamês', 'Persa', 'Maine Coon', 'Bengal', 'Ragdoll'];
    
        const breeds = animalType === 'dog' ? dogBreeds : catBreeds;
        const breedList = breedSelectionPrompt.querySelector('#breedList'); // Usando querySelector em vez de getElementById
    
        if (!breedList) {
            console.error('Elemento #breedList não encontrado!');
            return;
        }
    
        // Criar botões de seleção para cada raça
        breeds.forEach(breed => {
            const breedButton = document.createElement('button');
            breedButton.textContent = breed;
            breedButton.style.margin = '10px';
            breedButton.style.padding = '10px 20px';
            breedButton.style.backgroundColor = '#007bff';
            breedButton.style.color = 'white';
            breedButton.style.border = 'none';
            breedButton.style.borderRadius = '5px';
            breedButton.style.cursor = 'pointer';
            breedButton.style.transition = 'background-color 0.3s';
    
            breedButton.onmouseover = () => breedButton.style.backgroundColor = '#0056b3';
            breedButton.onmouseout = () => breedButton.style.backgroundColor = '#007bff';
    
            breedButton.onclick = () => {
                this.selectedBreed = breed;
                this.showCustomPrompt(animalType);
                overlay.remove();
                breedSelectionPrompt.remove();
            };
    
            breedList.appendChild(breedButton);
        });
    
        // Adiciona o overlay e a janela ao corpo do documento
        document.body.appendChild(overlay);
        document.body.appendChild(breedSelectionPrompt);
    
        // Botão de fechar o dialog
        document.getElementById('closeDialog').onclick = () => {
            overlay.remove();
            breedSelectionPrompt.remove();
        };
    
        // Exibe o overlay e a janela
        overlay.style.display = 'block';
        breedSelectionPrompt.style.display = 'block';
    }
}    


class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
  
    preload() {
      // Carrega as imagens do animal e dos ícones
      this.load.image('animal', 'caminho/para/imagem_do_animal.png'); // Substitua pelo caminho da imagem do animal
      this.load.image('foodIcon', 'caminho/para/icone_comida.png');    // Substitua pelo caminho do ícone de comida
      this.load.image('bathIcon', 'caminho/para/icone_banho.png');     // Substitua pelo caminho do ícone de banho
      this.load.image('toyIcon', 'caminho/para/icone_brinquedo.png');   // Substitua pelo caminho do ícone de brinquedo
    }
  
    create() {
      const { width, height } = this.sys.game.config;
      this.animal = this.add.image(width / 2, height / 2 - 50, 'animal').setScale(0.5); // Ajuste o tamanho com setScale
  
      const iconSpacing = 100;
  
      // Ícone de comida
      this.foodButton = this.add.image(width / 2 - iconSpacing, height - 50, 'foodIcon').setInteractive();
      this.foodButton.on('pointerdown', () => this.feedAnimal());
  
      this.bathButton = this.add.image(width / 2, height - 50, 'bathIcon').setInteractive();
      this.bathButton.on('pointerdown', () => this.batheAnimal());
  
      // Ícone de brinquedo
      this.toyButton = this.add.image(width / 2 + iconSpacing, height - 50, 'toyIcon').setInteractive();
      this.toyButton.on('pointerdown', () => this.playWithAnimal());
    }
  
    feedAnimal() {
      console.log("Alimentando o animal");
    }
  
    batheAnimal() {
      console.log("Dando banho no animal");
    }
  
    // Função para brincar com o animal
    playWithAnimal() {
      console.log("Brincando com o animal");
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
    scene: [MainMenu, GameScene],
    resolution: window.devicePixelRatio
};

const game = new Phaser.Game(config);
