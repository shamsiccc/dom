export default class ScoreService {
    constructor() {
        this.score = 0;
        this.scoreElement = document.getElementById('score');
        this.missesElement = document.getElementById('misses');
    }

    increase() {
        this.score++;
        this.updateDisplay();
    }

    reset() {
        this.score = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.scoreElement) {
            this.scoreElement.textContent = this.score;
        }
    }

    updateMisses(misses) {
        if (this.missesElement) {
            this.missesElement.textContent = misses;
        }
    }
}