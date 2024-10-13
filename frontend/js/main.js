import Phaser from 'phaser';

// Configuração básica do jogo
const config = {
    type: Phaser.AUTO,  // Tenta usar WebGL, mas cai para Canvas se necessário
    width: 800,         // Largura da tela do jogo
    height: 600,        // Altura da tela do jogo
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },  // Gravidade no eixo Y
            debug: false
        }
    },
    scene: {
        preload: preload,  // Carregar os assets do jogo
        create: create,    // Inicializar os objetos no jogo
        update: update     // Atualizar o estado do jogo
    }
};

// Função de pré-carregamento de assets (imagens, sprites, etc.)
function preload() {
    this.load.image('home', 'assets/home.png'); // Carrega uma imagem de fundo
}

// Função que cria o conteúdo do jogo (sprites, gráficos, etc.)
function create() {
    this.add.image(400, 300, 'home');  // Adiciona a imagem de fundo
}

// Função de atualização contínua, chamada a cada frame
function update() {}

// Inicializa o jogo com a configuração definida
const game = new Phaser.Game(config);
