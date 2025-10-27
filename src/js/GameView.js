export default class GameView {
  constructor({ scoreId, recordId, timerId, boardId }) {
    this.scoreElem = document.getElementById(scoreId);
    this.recordElem = document.getElementById(recordId);
    this.timerElem = document.getElementById(timerId);
    this.board = document.getElementById(boardId);
  }

  renderScore(score) {
    this.scoreElem.textContent = `Очки: ${score}`;
  }

  renderRecord(record) {
    this.recordElem.textContent = `Рекорд: ${record}`;
  }

  renderTimer(timeLeft) {
    this.timerElem.textContent = `Время: ${timeLeft}`;
  }

  createBoard(cellsCount) {
    this.board.innerHTML = '';
    this.cells = [];
    for (let i=0; i<cellsCount; i++) {
      const cellElem = document.createElement('div');
      cellElem.className = 'cell';
      this.board.appendChild(cellElem);
      this.cells.push(cellElem);
    }
  }

  lockField(lock) {
    if (lock) {
      this.board.classList.add('blocked');
    } else {
      this.board.classList.remove('blocked');
    }
  }

  getCell(index) {
    return this.cells[index];
  }
}