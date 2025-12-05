import '../css/style.css';
import Board from './Board.js';
import ScoreService from './ScoreService.js';
import GameControl from './GameControl.js';
import Game from './Game.js';

class App {
    constructor() {
        this.board = new Board(4);
        this.scoreService = new ScoreService();
        this.gameControl = new GameControl();
        this.game = null;
        
        this.init();
    }

    init() {
        this.gameControl.init(
            () => this.startGame(),
            () => this.restartGame()
        );
        
        this.setupClickHandler();
    }

    setupClickHandler() {
        const gameBoard = document.getElementById('game-board');
        
        gameBoard.addEventListener('click', (event) => {
            const cell = event.target.closest('.cell');
            if (cell && this.game && this.game.isRunning) {
                const cellIndex = parseInt(cell.dataset.index);
                this.game.handleCellClick(cellIndex);
                
                cell.classList.add('clicked');
                setTimeout(() => cell.classList.remove('clicked'), 200);
            }
        });
    }

    startGame() {
        this.gameControl.hideGameOver();
        this.gameControl.disableStartButton();
        
        this.game = new Game(this.board, this.scoreService, this.gameControl);
        this.game.start();
    }

    restartGame() {
        if (this.game) {
            this.game.stop();
        }
        this.startGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});