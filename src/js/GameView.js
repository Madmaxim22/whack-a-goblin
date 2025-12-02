export default class GameView {
  constructor({ scoreId, missedId, recordId, timerId, boardId, cursorId }) {
    this.scoreElem = document.getElementById(scoreId);
    this.missedElem = document.getElementById(missedId);
    this.recordElem = document.getElementById(recordId);
    this.timerElem = document.getElementById(timerId);
    this.board = document.getElementById(boardId);
    this.cursor = document.getElementById(cursorId);
    this.modalMessage = document.getElementById('modalMessage');
    this.modalText = document.getElementById('modalText');
  }

  renderScore(score) {
    this.scoreElem.textContent = `Очки: ${score}`;
  }

  renderMissed(missed) {
    this.missedElem.textContent = `Пропуски: ${missed}`;
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

  showModalMessage(message) {
    this.modalText.textContent = message;
    this.modalMessage.classList.remove('modal-hidden');

  }

  closeModalMessage() {
    this.modalMessage.classList.add('modal-hidden');
  }

  getCell(index) {
    return this.cells[index];
  }
}