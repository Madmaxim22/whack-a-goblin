export default class GameModel {
  constructor() {
    this.score = 0;
    this.record = 0;
    this.timeLeft = 60;
    this.isActive = false;
    this.missed = 0;
  }

  reset() {
    this.score = 0;
    this.timeLeft = 60;
    this.missed = 0;
  }

  updateScore(points) {
    this.score += points;
  }

  updateRecord() {
    if (this.score > this.record) {
      this.record = this.score;
    }
  }

  updateMissed(points) {
    this.missed += points;
  }

  resetMissed() {
    this.missed = 0;
  }

  countdown() {
    this.timeLeft--;
  }
}