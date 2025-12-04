export default class Board {
    constructor(size) {
        this.size = size;
        this.cells = [];
        this.currentGoblinIndex = -1;
        this.createBoard();
    }

    createBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        this.cells = [];

        for (let i = 0; i < this.size * this.size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        gameBoard.appendChild(cell);
        this.cells.push(cell);
        }
    }

    showGoblin() {
        this.hideGoblin(); // Сначала скрываем предыдущего
        
        let newIndex;
        do {
        newIndex = Math.floor(Math.random() * this.cells.length);
        } while (newIndex === this.currentGoblinIndex && this.cells.length > 1);
        
        this.currentGoblinIndex = newIndex;
        this.cells[newIndex].classList.add('has-goblin');
    }

    hideGoblin() {
        if (this.currentGoblinIndex !== -1) {
        this.cells[this.currentGoblinIndex].classList.remove('has-goblin');
        this.currentGoblinIndex = -1;
        }
    }

    hasGoblin() {
        return this.currentGoblinIndex !== -1;
    }

    isGoblinInCell(cellIndex) {
        return this.currentGoblinIndex === cellIndex;
    }

    clear() {
        this.hideGoblin();
        this.currentGoblinIndex = -1;
    }
}