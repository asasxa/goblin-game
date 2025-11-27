export class Board {
  constructor(size = 4) {
    this.size = size;
    this.cells = [];
    this.container = document.createElement('div');
    this.container.id = 'game-board';
    document.body.appendChild(this.container);
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  showGoblin(goblinImg, index) {
    if (this.currentGoblin) this.cells[this.currentGoblin].innerHTML = '';
    this.cells[index].innerHTML = '';
    this.cells[index].appendChild(goblinImg);
    this.currentGoblin = index;
  }

  hideGoblin() {
    if (this.currentGoblin !== undefined) {
      this.cells[this.currentGoblin].innerHTML = '';
      this.currentGoblin = undefined;
    }
  }

  getCellIndex(cell) {
    return parseInt(cell.dataset.index, 10);
  }
}