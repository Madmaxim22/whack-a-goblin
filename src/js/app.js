import GameView from './GameView.js';
import GameModel from './GameModel.js';
import GameController from './GameController.js';

const model = new GameModel();
const view = new GameView({
  scoreId: 'score', recordId: 'record', timerId: 'timer', boardId: 'gameBoard', cursorId: 'hammerCursor'
});
const controller = new GameController(model, view);

// Запуск игры
controller.start();
