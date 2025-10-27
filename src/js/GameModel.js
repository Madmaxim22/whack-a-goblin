export default class GameModel {
  constructor() {
    this.score = 0;
    this.record = 0;
    this.timeLeft = 60;
    this.isActive = false;
  }

  reset() {
    this.score = 0;
    this.timeLeft = 60;
  }

  updateScore(points) {
    this.score += points;
  }

  updateRecord() {
    if (this.score > this.record) {
      this.record = this.score;
    }
  }

  countdown() {
    this.timeLeft--;
  }
}