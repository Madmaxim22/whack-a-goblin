import GameModel from '../GameModel.js';

describe('GameModel', () => {
  let model;

  beforeEach(() => {
    model = new GameModel();
  });

  test('Удачная инициализация модели с дефолтными значениями', () => {
    expect(model.score).toBe(0);
    expect(model.record).toBe(0);
    expect(model.timeLeft).toBe(60);
    expect(model.isActive).toBe(false);
  });

  test('Сброс модели с дефолтными значениями', () => {
    model.score = 10;
    model.timeLeft = 30;
    model.reset();
    expect(model.score).toBe(0);
    expect(model.timeLeft).toBe(60);
  });

  test('Обновление счета корректно', () => {
    model.updateScore(10);
    expect(model.score).toBe(10);
  });

  test('Обновление рекорда корректно', () => {
    model.score = 20;
    model.record = 10;
    model.updateRecord();
    expect(model.record).toBe(20);
  });

  test('Рекорд не обновляется если текущий счет меньше', () => {
    model.score = 10;
    model.record = 20;
    model.updateRecord();
    expect(model.record).toBe(20);
  });

  test('Перезапуск модели не изменяет активность', () => {
    model.isActive = true;
    model.reset();
    expect(model.isActive).toBe(true);
  });

  test('Перезапуск модели не изменяет рекорд', () => {
    model.record = 10;
    model.reset();
    expect(model.record).toBe(10);
  });

  test('Перезапуск модели изменяет время', () => {
    model.timeLeft = 30;
    model.reset();
    expect(model.timeLeft).toBe(60);
  });

  test('Перезапуск модели не изменяет активность при false', () => {
    model.isActive = false;
    model.reset();
    expect(model.isActive).toBe(false);
  });

  test('Время уменьшается на единицу', () => {
    model.timeLeft = 60;
    model.countdown();
    expect(model.timeLeft).toBe(59);
  });
});