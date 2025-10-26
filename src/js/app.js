import goblinImagePath from '../assets/goblin.png';

const board = document.getElementById('gameBoard');

// Создаем клетки
const cells = [];
for (let i = 0; i < 16; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.dataset.index = i;
  board.appendChild(cell);
  cells.push(cell);
}

// Переменная для хранения текущего гоблина
let goblinImg = null;

// Функция для перемещения гоблина
function moveGoblin() {
  // Находим текущую клетку гоблина
  const currentCell = goblinImg ? goblinImg.parentElement : null;

  // Получаем список доступных клеток, исключая текущую
  const availableCells = cells.filter(c => c !== currentCell && c.children.length === 0);

  // Выбираем случайную новую клетку
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const newCell = availableCells[randomIndex];

  // Перемещаем гоблина
  if (goblinImg) {
    newCell.appendChild(goblinImg);
  } else {
    // Создаем гоблина впервые
    goblinImg = document.createElement('img');
    goblinImg.src = goblinImagePath;
    goblinImg.alt = 'Гоблин';
    newCell.appendChild(goblinImg);
  }
}

// Изначально размещаем гоблина
moveGoblin();

// Каждые 2 секунды перемещаем его в другую клетку
setInterval(moveGoblin, 1000);