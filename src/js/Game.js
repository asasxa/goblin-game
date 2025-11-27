import goblinImg from '../img/goblin.png';
import hammerImg from '../img/hammer.png';

export class Game {
  constructor() {
    this.score = new Score();
    this.board = new Board(4);
    this.cursor = new Cursor(hammerImg);
    this.goblinElement = this.createGoblinElement();
    this.gameActive = true;
    this.setupEventListeners();
    this.start();
  }

  createGoblinElement() {
    const img = document.createElement('img');
    img.src = goblinImg;
    img.alt = 'Goblin';
    img.style.width = '100%';
    return img;
  }

  setupEventListeners() {
    this.board.container.addEventListener('click', (e) => {
      if (!this.gameActive) return;
      const cell = e.target.closest('.cell');
      if (!cell) return;
      const index = this.board.getCellIndex(cell);
      if (index === this.currentGoblinIndex) {
        this.onHit();
      }
    });
  }

  onHit() {
    this.score.addPoint();
    this.board.hideGoblin();
    clearTimeout(this.timeoutId);
    this.scheduleNext();
  }

  onMiss() {
    if (!this.gameActive) return;
    const isGameOver = this.score.addMiss();
    this.board.hideGoblin();
    if (isGameOver) {
      this.endGame();
    } else {
      this.scheduleNext();
    }
  }

  scheduleNext() {
    if (!this.gameActive) return;
    setTimeout(() => {
      this.showGoblin();
      this.timeoutId = setTimeout(() => this.onMiss(), 1000);
    }, 500 + Math.random() * 1000);
  }

  showGoblin() {
    const index = Math.floor(Math.random() * 16);
    this.currentGoblinIndex = index;
    this.board.showGoblin(this.goblinElement.cloneNode(true), index);
  }

  start() {
    this.scheduleNext();
  }

  endGame() {
    this.gameActive = false;
    const final = document.createElement('div');
    final.innerHTML = `<h2>Game Over!</h2><p>Final Score: ${this.score.score}</p>`;
    final.style.position = 'fixed';
    final.style.top = '50%';
    final.style.left = '50%';
    final.style.transform = 'translate(-50%, -50%)';
    final.style.background = 'white';
    final.style.padding = '20px';
    final.style.border = '2px solid red';
    final.style.zIndex = '1000';
    document.body.appendChild(final);
  }
}