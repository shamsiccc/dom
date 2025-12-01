// Импортируем стили
import '../css/style.css';
import goblinImage from '../css/goblin.png';

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
            gameBoard.append(cell);
        }
        console.log('Game board created');
    }

    createGoblin() {
        if (this.goblinElement) {
            this.removeGoblinClickListener();
            this.goblinElement.remove();
        }

        this.goblinElement = document.createElement('div');
        this.goblinElement.className = 'goblin';
        
        const img = document.createElement('img');
        img.src = goblinImage;
        img.alt = 'Гоблин';
        img.className = 'goblin-img';
        
        this.goblinElement.append(img);
        this.goblinElement.addEventListener('click', this.handleGoblinClick.bind(this));

        return this.goblinElement;
    }

    removeGoblinClickListener() {
        if (this.goblinElement) {
            this.goblinElement.removeEventListener('click', this.handleGoblinClick.bind(this));
        }
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

        cells[newPosition].append(goblin);
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

    stopGame () {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.intervalId = null;
        }
    }
}

// Запускаем игру когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new GoblinGame();
});