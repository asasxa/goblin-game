import { Score } from './Score.js';
import { Board } from './Board.js';
import { Cursor } from './Cursor.js';
import { BOARD_SIZE, TOTAL_CELLS, GAMETIME_MS } from './constants.js';
import goblinImg from '../img/goblin.png';
import hammerImg from '../img/hammer.png';

export class Game {
  constructor() {
    this.score = new Score();
    this.board = new Board(BOARD_SIZE);
    this.cursor = new Cursor(hammerImg);
    this.goblinElement = this.createGoblinElement();
    this.gameActive = true;
    this.currentGoblinIndex = null;
    this.timeoutId = null;
    this.setupEventListeners();
    this.scheduleNext();
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
    this.hideGoblin();
    this.scheduleNext();
  }

  onMiss() {
    if (!this.gameActive) return;
    const isGameOver = this.score.addMiss();
    this.hideGoblin();
    if (isGameOver) {
      this.endGame();
    } else {
      this.scheduleNext();
    }
  }

  hideGoblin() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.board.hideGoblin();
    this.currentGoblinIndex = null;
  }

  scheduleNext() {
    if (!this.gameActive) return;
    const delay = 300 + Math.random() * 500;
    setTimeout(() => {
      this.showGoblin();
      this.timeoutId = setTimeout(() => this.onMiss(), GAMETIME_MS);
    }, delay);
  }

  showGoblin() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * TOTAL_CELLS);
    } while (newIndex === this.currentGoblinIndex && TOTAL_CELLS > 1);

    this.currentGoblinIndex = newIndex;
    this.board.showGoblin(this.goblinElement.cloneNode(true), newIndex);
  }

  endGame() {
    this.gameActive = false;
    const final = document.createElement('div');
    final.innerHTML = `
      <h2>Game Over!</h2>
      <p>Final Score: ${this.score.score}</p>
    `;
    final.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border: 2px solid red;
      border-radius: 8px;
      z-index: 1000;
      font-family: sans-serif;
      text-align: center;
    `;
    document.body.append(final);
  }
}