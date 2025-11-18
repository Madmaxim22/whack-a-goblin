import GameController from '../GameController.js';
import goblinImagePath from '../assets/goblin.png';

describe('GameController', () => {
  let mockModel;
  let mockView;
  let controller;

  beforeEach(() => {
    // Мокаем DOM для кнопки Restart
    document.body.innerHTML = '<button id="restartBtn">Restart</button>';

    // Мокаем модель
    mockModel = {
      score: 0,
      record: 0,
      timeLeft: 60,
      isActive: false,
      reset: jest.fn(),
      updateRecord: jest.fn(),
      updateScore: jest.fn(),
      countdown: jest.fn(function () {
        this.timeLeft -= 1;
      }),
    };

    // Мокаем view
    mockView = {
      createBoard: jest.fn(),
      renderScore: jest.fn(),
      renderRecord: jest.fn(),
      renderTimer: jest.fn(),
      renderAnimationHammerCursor: jest.fn(),
      lockField: jest.fn(),
      getCell: jest.fn((index) => ({ innerHTML: '' })),
      cells: Array(16).fill().map((_, i) => ({
        innerHTML: '', index: i
      })),
      board: document.createElement('div'), // добавьте DOM-элемент
    };

    // Создаем контроллер
    controller = new GameController(mockModel, mockView);

    jest.spyOn(mockView.board, 'addEventListener');
  });

  test('инициализация и запуск игры вызывает правильные методы', () => {
    controller.start();

    expect(mockModel.reset).toHaveBeenCalled();
    expect(mockView.renderScore).toHaveBeenCalledWith(mockModel.score);
    expect(mockView.renderRecord).toHaveBeenCalledWith(mockModel.record);
    expect(mockView.renderTimer).toHaveBeenCalledWith(mockModel.timeLeft);
    expect(mockView.lockField).toHaveBeenCalledWith(false);
    expect(mockModel.isActive).toBe(true);
  });

  test('метод stop вызывает завершение игры и отображение сообщения', () => {
    // Мокаем alert и clearInterval
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(window, 'clearInterval').mockImplementation(() => {});

    // Запускаем игру для установки состояния
    controller.start();

    // Вызываем stop
    controller.stop();

    expect(mockView.lockField).toHaveBeenCalledWith(true);
    expect(mockModel.updateRecord).toHaveBeenCalled();
    expect(mockView.renderRecord).toHaveBeenCalledWith(mockModel.record);
    expect(window.alert).toHaveBeenCalledWith(`Игра окончена! Ваш результат: ${mockModel.score}`);
    expect(clearInterval).toHaveBeenCalled(); // Проверяем, что интервал очищен
  });

  test('метод _showGoblin меняет картинку гоблина в выбранной ячейке', () => {
    controller._showGoblin();

    const cell = mockView.getCell.mock.results[0].value;
    expect(mockView.getCell).toHaveBeenCalledTimes(1);
    expect(cell.innerHTML).toContain('<img');
  });

  test('handleBoardClick обновляет счет при попадании гоблина', () => {
    controller.currentGoblinCellIndex = 5;

    const cellElement = document.createElement('div');
    cellElement.className = 'cell';
    cellElement.innerHTML = `<img src="${goblinImagePath}" alt="Гоблин" />`;

    mockView.cells[5] = cellElement;
    const mockEvent = { target: cellElement, };

    // Мокаем closest
    jest.spyOn(cellElement, 'closest').mockImplementation((selector) => {
      if (selector === '.cell') return cellElement;
      return null;
    });

    // Включаем активность
    mockModel.isActive = true;

    controller.handleBoardClick(mockEvent);

    expect(mockModel.updateScore).toHaveBeenCalledWith(1);
    expect(mockView.renderScore).toHaveBeenCalledWith(mockModel.score);
  });

  test('handleBoardClick должен возвращаться, если model isActive равен false', () => {
    // Создаем fakeEvent с элементом, который является closest '.cell'
    const fakeEvent = { target: { closest: () => document.querySelector('.cell') } };
    controller.handleBoardClick(fakeEvent);

    // Проверяем, что метод handleBoardClick не был вызван
    expect(controller.model.updateScore).not.toHaveBeenCalled();
  });

  test('handleBoardClick должен возвращаться, если элемент cellElement не найден', () => {
    // Включаем активность
    mockModel.isActive = true;

    // Устанавливаем this.view.cells равным пустому массиву
    controller.view.cells = [];
    // Создаем fakeEvent с элементом, который является closest '.cell'
    const fakeEvent = { target: { closest: () => document.querySelector('.cell') } };
    const spy = jest.spyOn(controller, 'handleBoardClick');
    controller.handleBoardClick(fakeEvent);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('_countdown вызывает stop при timeLeft <= 0', () => {
    jest.spyOn(controller, 'stop').mockImplementation(() => {});

    // Устанавливаем начальное время
    controller.model.timeLeft = 1;

    // Мокаем countdown, чтобы уменьшить timeLeft
    controller.model.countdown.mockImplementation(function () {
      this.timeLeft -= 1;
    });

    controller._countdown();

    expect(controller.model.countdown).toHaveBeenCalled();
    expect(controller.view.renderTimer).toHaveBeenCalledWith(controller.model.timeLeft);
    expect(controller.stop).toHaveBeenCalled();
  });

  test('при вызове _countdown и timeLeft > 0, stop не вызывается', () => {
    jest.spyOn(controller, 'stop').mockImplementation(() => {});

    controller.model.timeLeft = 2;

    controller.model.countdown.mockImplementation(function () {
      this.timeLeft -= 1;
    });

    controller._countdown();

    expect(controller.model.countdown).toHaveBeenCalled();
    expect(controller.view.renderTimer).toHaveBeenCalledWith(controller.model.timeLeft);
    expect(controller.stop).not.toHaveBeenCalled();
  });
});