import goblinImagePath from '../assets/goblin.png';

export default class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentGoblinCellIndex = null;
    this.gameInterval = null;
    this.timerInterval = null;

    this.view.createBoard(16);
    this._addEventListeners();
  }

  start() {
    this.model.reset();
    this.view.renderScore(this.model.score);
    this.view.renderRecord(this.model.record);
    this.view.renderTimer(this.model.timeLeft);
    this.view.lockField(false);

    this.model.isActive = true;
    this._showGoblin();

    this.gameInterval = setInterval(() => this._showGoblin(), 1500);
    this.timerInterval = setInterval(() => this._countdown(), 1000);
  }

  stop() {
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
    this.view.lockField(true);
    this.model.updateRecord();
    this.view.renderRecord(this.model.record);
    this.model.isActive = false;
    alert(`Игра окончена! Ваш результат: ${this.model.score}`);
  }

  _showGoblin() {
    this._removeGoblin();
    const emptyCells = this.view.cells.filter((_, i) => i !== this.currentGoblinCellIndex);
    const index = Math.floor(Math.random() * emptyCells.length);
    this.currentGoblinCellIndex = index;
    this.view.getCell(index).innerHTML = `<img src="${goblinImagePath}" alt="Гоблин" />`;
  }

  _removeGoblin() {
    if (this.currentGoblinCellIndex !== null) {
      this.view.getCell(this.currentGoblinCellIndex).innerHTML = '';
    }
  }

  _countdown() {
    this.model.countdown();
    this.view.renderTimer(this.model.timeLeft);
    if (this.model.timeLeft <= 0) {
      this.stop();
    }
  }

  handleBoardClick(event) {
    if (!this.model.isActive) return;

    const cellElement = event.target.closest('.cell');
    if (!cellElement) return;

    const index = this.view.cells.indexOf(cellElement);
    if (index === -1) return;

    if (index === this.currentGoblinCellIndex) {
      this.model.updateScore(1);
      this.view.renderScore(this.model.score);
      this._removeGoblin();
    }
  }

  _addEventListeners() {
    this.view.board.addEventListener('click', (event) => this.handleBoardClick(event));
    document.querySelector('#restartBtn').addEventListener('click', () => this.start());
  }
}