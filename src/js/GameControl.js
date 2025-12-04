export default class GameControl {
    constructor() {
        this.startButton = document.getElementById('start-game');
        this.restartButton = document.getElementById('restart-game');
        this.gameOverScreen = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
    }

    init(startCallback, restartCallback) {
        if (this.startButton) {
        this.startButton.addEventListener('click', startCallback);
        }
        
        if (this.restartButton) {
        this.restartButton.addEventListener('click', restartCallback);
        }
    }

    showGameOver(finalScore) {
        if (this.gameOverScreen) {
        this.gameOverScreen.classList.remove('hidden');
        }
        
        if (this.finalScoreElement) {
        this.finalScoreElement.textContent = finalScore;
        }
    }

    hideGameOver() {
        if (this.gameOverScreen) {
        this.gameOverScreen.classList.add('hidden');
        }
    }

    disableStartButton() {
        if (this.startButton) {
        this.startButton.disabled = true;
        }
    }

    enableStartButton() {
        if (this.startButton) {
        this.startButton.disabled = false;
        }
    }
}