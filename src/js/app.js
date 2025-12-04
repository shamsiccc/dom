import '../css/style.css';
import hammerCursor from '../css/hammer_straight.jpeg';
import hammerActive from '../css/hammer_down.jpeg';
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
        // Устанавливаем кастомный курсор
        document.body.style.cursor = `url(${hammerCursor}), auto`;
        
        // Инициализируем контролы
        this.gameControl.init(
        () => this.startGame(),
        () => this.restartGame()
        );
        
        // Добавляем обработчики кликов по ячейкам
        this.setupCellClickHandlers();
    }

    setupCellClickHandlers() {
    const gameBoard = document.getElementById('game-board');
    
    // При наведении на ячейку - активный молоток
    gameBoard.addEventListener('mouseover', (event) => {
        const cell = event.target.closest('.cell');
        if (cell) {
            cell.style.cursor = `url(${hammerActive}), pointer`;
        }
    });
    
    // При уходе - обычный молоток
    gameBoard.addEventListener('mouseout', (event) => {
        const cell = event.target.closest('.cell');
        if (cell) {
            cell.style.cursor = `url(${hammerCursor}), auto`;
        }
    });
    
    // Обработчик клика
    gameBoard.addEventListener('click', (event) => {
        const cell = event.target.closest('.cell');
        if (cell && this.game) {
            const cellIndex = parseInt(cell.dataset.index);
            this.game.handleCellClick(cellIndex);
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


    // Запускаем приложение
    document.addEventListener('DOMContentLoaded', () => {
    new App();
});
