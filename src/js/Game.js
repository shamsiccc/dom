export default class Game {
    constructor(board, scoreService, gameControl) {
        this.board = board;
        this.scoreService = scoreService;
        this.gameControl = gameControl;
        this.misses = 0;
        this.maxMisses = 5;
        this.goblinInterval = null;
        this.currentTimer = null; // ← добавь
        this.wasClicked = false; // ← добавь
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        this.scoreService.reset();
        this.misses = 0;
        this.board.clear();
        this.wasClicked = false;
        
        // Гоблин появляется каждые 1.2 секунды
        this.goblinInterval = setInterval(() => {
            if (!this.isRunning) return;
  
            this.board.showGoblin();
            this.wasClicked = false; // сбрасываем перед новым гоблином

            // Очищаем предыдущий таймер
            if (this.currentTimer) {
                clearTimeout(this.currentTimer);
            }

            // Создаем таймер для этого гоблина
            this.currentTimer = setTimeout(() => {
                // Проверяем что гоблин все еще на поле
                if (this.board.hasGoblin() && !this.wasClicked) {
                    this.misses++;
                    this.scoreService.updateMisses(this.misses);
                    this.board.hideGoblin();
        
                    if (this.misses >= this.maxMisses) {
                        this.gameOver();
                    }
                }
            }, 1000); // гоблин виден 1 секунду
    
        }, 1200); // новый гоблин каждые 1.2 секунды
    } // ← ЗАКРЫВАЮЩАЯ СКОБКА была пропущена!

    handleCellClick(cellIndex) {
        if (!this.isRunning) return;
        
        if (this.board.isGoblinInCell(cellIndex)) {
            this.scoreService.increase();
            this.board.hideGoblin();
            this.wasClicked = true; // ← отмечаем что кликнули
        }
    }

    gameOver() {
        this.isRunning = false;
        clearInterval(this.goblinInterval);
        if (this.currentTimer) {
            clearTimeout(this.currentTimer);
        }
        this.gameControl.showGameOver(this.scoreService.score);
    }

    stop() {
        this.isRunning = false;
        if (this.goblinInterval) {
            clearInterval(this.goblinInterval);
        }
        if (this.currentTimer) {
            clearTimeout(this.currentTimer);
        }
    }
}