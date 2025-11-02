import GameView from '../GameView.js';

describe('GameView', () => {
  let view;
  let mockElements;

  beforeEach(() => {
    // Создаем мок-элементы DOM
    mockElements = {
      score: { textContent: '' },
      record: { textContent: '' },
      timer: { textContent: '' },
      board: {
        innerHTML: '',
        classList: {
          add: jest.fn(),
          remove: jest.fn()
        },
        append: jest.fn()
      }
    };

    // Мокаем document.getElementById
    document.getElementById = jest.fn((id) => {
      const elements = {
        'score': mockElements.score,
        'record': mockElements.record,
        'timer': mockElements.timer,
        'board': mockElements.board
      };
      return elements[id];
    });

    view = new GameView({
      scoreId: 'score',
      recordId: 'record',
      timerId: 'timer',
      boardId: 'board'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Конструктор', () => {
    it('должен корректно инициализировать элементы DOM', () => {
      expect(view.scoreElem).toBe(mockElements.score);
      expect(view.recordElem).toBe(mockElements.record);
      expect(view.timerElem).toBe(mockElements.timer);
      expect(view.board).toBe(mockElements.board);
    });
  });

  describe('renderScore', () => {
    it('должен корректно отображать счет', () => {
      view.renderScore(150);
      expect(mockElements.score.textContent).toBe('Очки: 150');
    });

    it('должен корректно отображать нулевой счет', () => {
      view.renderScore(0);
      expect(mockElements.score.textContent).toBe('Очки: 0');
    });
  });

  describe('renderRecord', () => {
    it('должен корректно отображать рекорд', () => {
      view.renderRecord(300);
      expect(mockElements.record.textContent).toBe('Рекорд: 300');
    });

    it('должен корректно отображать нулевой рекорд', () => {
      view.renderRecord(0);
      expect(mockElements.record.textContent).toBe('Рекорд: 0');
    });
  });

  describe('renderTimer', () => {
    it('должен корректно отображать время', () => {
      view.renderTimer(45);
      expect(mockElements.timer.textContent).toBe('Время: 45');
    });

    it('должен корректно отображать нулевое время', () => {
      view.renderTimer(0);
      expect(mockElements.timer.textContent).toBe('Время: 0');
    });
  });

  describe('createBoard', () => {
    it('должен создавать правильное количество ячеек', () => {
      const cellsCount = 9;

      view.createBoard(cellsCount);

      expect(mockElements.board.innerHTML).toBe('');
      expect(view.cells).toHaveLength(cellsCount);
      expect(mockElements.board.append).toHaveBeenCalledTimes(cellsCount);
    });

    it('должен создавать ячейки с правильным классом', () => {
      view.createBoard(1);

      const createdCell = view.cells[0];
      expect(createdCell.className).toBe('cell');
    });

    it('должен очищать доску перед созданием новых ячеек', () => {
      mockElements.board.innerHTML = 'existing content';

      view.createBoard(3);

      expect(mockElements.board.innerHTML).toBe('');
    });
  });

  describe('lockField', () => {
    it('должен блокировать поле при lock = true', () => {
      view.lockField(true);
      expect(mockElements.board.classList.add).toHaveBeenCalledWith('blocked');
      expect(mockElements.board.classList.remove).not.toHaveBeenCalled();
    });

    it('должен разблокировать поле при lock = false', () => {
      view.lockField(false);
      expect(mockElements.board.classList.remove).toHaveBeenCalledWith('blocked');
      expect(mockElements.board.classList.add).not.toHaveBeenCalled();
    });
  });

  describe('getCell', () => {
    it('должен возвращать правильную ячейку по индексу', () => {
      view.createBoard(5);
      const cell = view.getCell(2);
      expect(cell).toBe(view.cells[2]);
    });

    it('должен возвращать undefined для несуществующего индекса', () => {
      view.createBoard(3);
      const cell = view.getCell(5);
      expect(cell).toBeUndefined();
    });

    it('должен корректно работать с первым элементом', () => {
      view.createBoard(3);
      const cell = view.getCell(0);
      expect(cell).toBe(view.cells[0]);
    });

    it('должен корректно работать с последним элементом', () => {
      view.createBoard(3);
      const cell = view.getCell(2);
      expect(cell).toBe(view.cells[2]);
    });
  });

  describe('Краевые случаи', () => {
    it('должен корректно обрабатывать большие числа', () => {
      view.renderScore(999999);
      expect(mockElements.score.textContent).toBe('Очки: 999999');

      view.renderRecord(1000000);
      expect(mockElements.record.textContent).toBe('Рекорд: 1000000');
    });

    it('должен корректно создавать пустую доску', () => {
      view.createBoard(0);
      expect(view.cells).toHaveLength(0);
    });
  });
});