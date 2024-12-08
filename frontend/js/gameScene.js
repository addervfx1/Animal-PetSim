import { userService } from './../services/user.service';
import { aiService } from './../services/ai.service';
import { animalService } from '../services/animal.service';

export default class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
''
    init(data) {
        this.background = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x87CEFA).setOrigin(0, 0);
        this.animalData = data;
      }
  
    preload() {
        switch(this.animalData.breed){
            case 'Labrador':
            this.load.image('animal', 'assets/labrador.png');

        }
      this.load.image('foodIcon', 'assets/prato.png');    
      this.load.image('bathIcon', 'assets/banho.png');     
      this.load.image('toyIcon', 'caminho/para/icone_brinquedo.png');   
      this.load.image('checkIcon', 'caminho/para/icone_check.png');   
    }
  
    create() {
        this.createElements();
        
        this.scale.on('resize', this.resizeElements, this);

        this.updateInterval = setInterval(() => {
            this.updateAnimalStatus();
        }, 60000);
    }

    createElements() {
        const { width, height } = this.sys.game.config;  
        const borderSize = 160;

        
        this.animal = this.add.image(width / 2, height / 2, 'animal').setScale(0.5);
        this.createBorder(width / 2, height / 2, borderSize, 0xffffff);
        
        
        const scaleFactor = (borderSize - 20) / Math.max(this.animal.width, this.animal.height);
        this.animal.setScale(scaleFactor);

        
        const iconSpacing = 100;

        
        let foodButtonCooldown = false;
        let bathButtonCooldown = false;
        let toyButtonCooldown = false;
        
        this.foodButton = this.add.image(width / 2 - iconSpacing, height - 50, 'foodIcon').setInteractive().setScale(0.2);
        this.foodButton.on('pointerdown', async () => {
            if (foodButtonCooldown) return; // Se o cooldown estiver ativo, ignore o clique
            foodButtonCooldown = true; // Ativa o cooldown
            this.openTab('Alimentação', 'O animal está sendo alimentado. Certifique-se de manter a dieta equilibrada.');
            await animalService.updateHunger(20, this.animalData.id);
            await this.updateAnimalStatus();
        
            setTimeout(() => {
                foodButtonCooldown = false;
            }, 180000);
        });
        
        this.bathButton = this.add.image(width / 2, height - 50, 'bathIcon').setInteractive().setScale(0.2);
        this.bathButton.on('pointerdown', async () => {
            if (bathButtonCooldown) return; // Se o cooldown estiver ativo, ignore o clique
            bathButtonCooldown = true; // Ativa o cooldown
            this.openTab('Higiene', 'O banho do animal está sendo preparado. Lembre-se de usar produtos adequados.');
            await animalService.updateHygiene(20, this.animalData.id);
            await this.updateAnimalStatus();
        
            setTimeout(() => {
                bathButtonCooldown = false;
            }, 180000); 
        });
        
        this.toyButton = this.add.image(width / 2 + iconSpacing, height - 50, 'toyIcon').setInteractive();
        this.toyButton.on('pointerdown', async () => {
            if (toyButtonCooldown) return;
            toyButtonCooldown = true; 
            this.openTab('Brincadeiras', 'O animal começou a brincar! Assim ele poderá ficar feliz.');
            await animalService.updateHappiness(20, this.animalData.id);
            await this.updateAnimalStatus();

        
            setTimeout(() => {
                toyButtonCooldown = false;
            }, 180000);
        });

        this.checkButton = this.add.image(width / 2 + iconSpacing, height - 50, 'checkIcon').setInteractive();
        this.checkButton.on('pointerdown', async () => {
            const result = await this.checkScoreThroughIa();
            this.openTab('Status', result);

        
            setTimeout(() => {
                toyButtonCooldown = false;
            }, 180000);
        });    
        this.hungerText = this.add.text(10, 10, '', { 
            font: '16px Arial', 
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2  
        });

        this.hygieneText = this.add.text(10, 25, '', { 
            font: '16px Arial', 
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2  
        });

        this.happinessText = this.add.text(10, 40, '', { 
            font: '16px Arial', 
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2  
        });
        
        this.updateHungerStatus();
        this.updateHygieneStatus();
        this.updateHapinessStatus();
    }

    openTab(title, content) {
        document.getElementById('tabTitle').innerText = title;
        document.getElementById('tabContent').innerText = content;
        document.getElementById('infoTab').style.display = 'block';
    }

    resizeElements() {
        
        const width = window.innerWidth;
        const height = window.innerHeight;

        console.log("Resize triggered!", width, height);  

        const borderSize = 160;

        
        this.background.setSize(width, height);

        
        this.animal.setPosition(width / 2, height / 2);

        
        if (this.border) {
            this.border.destroy();  
        }
        this.createBorder(width / 2, height / 2, borderSize, 0xffffff);        

        
        const scaleFactor = (borderSize - 20) / Math.max(this.animal.width, this.animal.height);
        this.animal.setScale(scaleFactor);

        
        const iconSpacing = 100;
        this.checkButton.setPosition(width / 2 - 2 * iconSpacing, height - 50);
        this.foodButton.setPosition(width / 2 - iconSpacing, height - 50);
        this.bathButton.setPosition(width / 2, height - 50);
        this.toyButton.setPosition(width / 2 + iconSpacing, height - 50);
        
    }

    updateHungerStatus() {
        const hunger = this.animalData.hungerScore; 
        let hungerMessage = '';
        let color = '#ffffff';
    
        switch (true) {
            case (hunger >= 75):
                hungerMessage = 'O animal está sem fome!';
                color = '#00ff00';
                break;
            case (hunger >= 50):
                hungerMessage = 'O animal está um pouco faminto.';
                color = '#ffff00';
                break;
            case (hunger >= 25):
                hungerMessage = 'O animal está faminto!';
                color = '#ff6600';
                break;
            default:
                hungerMessage = 'O animal está cheio de fome!';
                color = '#ff0000';
                break;
        }

        this.hungerText.setText(hungerMessage);
        this.hungerText.setStyle({ fill: color });
    }
      updateHygieneStatus(){
        const hygiene = this.animalData.hygieneScore; 
        let hygieneMessage = '';
        let color = '#ffffff';
    
        switch (true) {
            case (hygiene >= 75):
                hygieneMessage = 'O animal está limpo!';
                color = '#00ff00';
                break;
            case (hygiene >= 50):
                hygieneMessage = 'O animal está um pouco sujo.';
                color = '#ffff00';
                break;
            case (hygiene >= 25):
                hygieneMessage = 'O animal está sujo!';
                color = '#ff6600';
                break;
            default:
                hygieneMessage = 'O animal está muito sujo!';
                color = '#ff0000';
                break;
        }

    
        this.hygieneText.setText(hygieneMessage);
        this.hygieneText.setStyle({ fill: color });
    }

    updateHapinessStatus(){
        const happiness = this.animalData.happinessScore; 
        let happinessScoreMessage = '';
        let color = '#ffffff';
    
        switch (true) {
            case (happiness >= 75):
                happinessScoreMessage = 'O animal está feliz!';
                color = '#00ff00';
                break;
            case (happiness >= 50):
                happinessScoreMessage = 'O animal está um pouco entediado!';
                color = '#ffff00';
                break;
            case (happiness >= 25):
                happinessScoreMessage = 'O animal está entediado!';
                color = '#ff6600';
                break;
            default:
                happinessScoreMessage = 'O animal está muito entediado!';
                color = '#ff0000';
                break;
        }

    
        this.happinessText.setText(happinessScoreMessage);
        this.happinessText.setStyle({ fill: color });
    }

    async updateAnimalStatus() {
        this.startLoading();
        const result = await animalService.getAnimalsByUser(); 
        this.animalData = result;
    
        this.updateHungerStatus();
        this.updateHygieneStatus();
        this.updateHapinessStatus();
        this.stopLoading();
    }

    async checkScoreThroughIa(){
        this.startLoading();
        const user = await this.userService.getUserById();
        const scoreToPost = [user.score];
        const result = await this.aiService.predict(scoreToPost);
        this.stopLoading();
        return result;
    }

    startLoading() {
        const loadingScreen = document.getElementById('loading');
        loadingScreen.style.display = 'flex'; 
    }

    stopLoading() {
        const loadingScreen = document.getElementById('loading');
        loadingScreen.style.display = 'none'; 
    }


    createBorder(x, y, size, color) {
        this.border = this.add.graphics();
        this.border.lineStyle(5, color, 1);
        this.border.strokeRect(x - size / 2, y - size / 2, size, size);  
    }
}
