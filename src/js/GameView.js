export default class GameView {
  constructor({ scoreId, recordId, timerId, boardId, cursorId }) {
    this.scoreElem = document.getElementById(scoreId);
    this.recordElem = document.getElementById(recordId);
    this.timerElem = document.getElementById(timerId);
    this.board = document.getElementById(boardId);
    this.cursor = document.getElementById(cursorId);
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
      this.board.append(cellElem);
      this.cells.push(cellElem);
    }
  }

  renderAnimationHammerCursor(hit) {
    if(hit) {
      this.cursor.classList.add('hit');
    } else {
      this.cursor.classList.remove('hit');
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