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
    this.view.renderMissed(this.model.missed);
    this.view.renderRecord(this.model.record);
    this.view.renderTimer(this.model.timeLeft);
    this.view.lockField(false);

    this.model.isActive = true;
    this._showGoblin();

    this.gameInterval = setInterval(() => {
      this._showGoblin();
      this.model.updateMissed(1);
      this.view.renderMissed(this.model.missed);
    }
    , 1000);
    this.timerInterval = setInterval(() => this._countdown(), 1000);
  }

  stop() {
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
    this.view.lockField(true);
    this.model.updateRecord();

    this.view.renderRecord(this.model.record);
    this.model.isActive = false;
    this.view.showModalMessage(`Игра окончена! Ваш результат: ${this.model.score}`);
  }

  _showGoblin() {
    this._removeGoblin();
    // Создаем массив возможных индексов
    const possibleIndices = this.view.cells.map((_, i) => i);

    // Удаляем текущий индекс гоблина, чтобы избежать повторного появления
    if (this.currentGoblinCellIndex !== null) {
      const currentIdx = this.currentGoblinCellIndex;
      const indexToRemove = possibleIndices.indexOf(currentIdx);
      if (indexToRemove !== -1) {
        possibleIndices.splice(indexToRemove, 1);
      }
    }

    // Выбираем случайный индекс из оставшихся
    const randomIndex = possibleIndices[Math.floor(Math.random() * possibleIndices.length)];

    this.currentGoblinCellIndex = randomIndex;
    this.view.getCell(randomIndex).innerHTML = `<img src="${goblinImagePath}" alt="Гоблин" />`;
  }

  _removeGoblin() {
    if (this.currentGoblinCellIndex !== null) {
      this.view.getCell(this.currentGoblinCellIndex).innerHTML = '';
    }
  }

  _countdown() {
    this.model.countdown();
    this.view.renderTimer(this.model.timeLeft);
    if (this.model.timeLeft <= 0 || this.model.missed === 5) {
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
      this.view.renderAnimationHammerCursor(true);
      this.view.renderScore(this.model.score);
      this._removeGoblin();
      this.model.updateMissed(-1);
    } else {
      this.model.updateMissed(1);
      this.view.renderMissed(this.model.missed);
    }
  }

  _addEventListeners() {
    document.querySelector('#restartBtn').addEventListener('click', () => this.start());

    const cursor = document.getElementById('hammerCursor');
    this.view.board.addEventListener('mousedown', (event) => this.handleBoardClick(event));
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    this.view.board.addEventListener('mouseup', () => this.view.renderAnimationHammerCursor(false));

    const closeBtn = document.getElementById('closeModal');
    closeBtn.addEventListener('click', () => this.view.closeModalMessage());
  }
}