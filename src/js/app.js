// Импортируем стили
import '../css/style.css';

// Основной класс игры
class GoblinGame {
    constructor() {
        this.boardSize = 4;
        this.score = 0;
        this.timer = 0;
        this.currentPosition = null;
        this.intervalId = null;
        this.timerInterval = null;
        
        this.init();
    }

    init() {
        console.log('Game initializing...');
        this.createGameBoard();
        this.startGame();
        this.startTimer();
    }

    createGameBoard() {
        const gameBoard = document.getElementById('game-board');
        
        // Создаем игровое поле 4x4
        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            gameBoard.appendChild(cell);
        }
        console.log('Game board created');
    }

    createGoblin() {
        // Удаляем существующего гоблина
        const existingGoblin = document.querySelector('.goblin');
        if (existingGoblin) {
            existingGoblin.remove();
        }

        // Создаем нового гоблина
        const goblin = document.createElement('div');
        goblin.className = 'goblin';
        goblin.textContent = '👺';
        
        // Обработчик клика
        goblin.addEventListener('click', () => {
            this.handleGoblinClick();
        });

        return goblin;
    }

    getRandomPosition() {
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
        } while (newPosition === this.currentPosition);
        
        return newPosition;
    }

    placeGoblin() {
        const newPosition = this.getRandomPosition();
        const cells = document.querySelectorAll('.cell');
        const goblin = this.createGoblin();

        cells[newPosition].appendChild(goblin);
        this.currentPosition = newPosition;
    }

    handleGoblinClick() {
        this.score++;
        document.getElementById('score').textContent = this.score;
        this.placeGoblin(); // Перемещаем сразу после клика
    }

    startGame() {
        this.placeGoblin();
        
        // Перемещаем гоблина каждые 2 секунды
        this.intervalId = setInterval(() => {
            this.placeGoblin();
        }, 2000);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            document.getElementById('timer').textContent = this.timer;
        }, 1000);
    }
}

// Запускаем игру когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new GoblinGame();
});