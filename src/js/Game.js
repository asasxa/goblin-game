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
    this.lastGoblinIndex = null;
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
      if (index === this.lastGoblinIndex) {
        this.onHit();
      }
    });
  }

  onHit() {
    this.score.addPoint();
    this.clearGoblin();
    this.scheduleNext();
  }

  onMiss() {
    if (!this.gameActive) return;
    const isGameOver = this.score.addMiss();
    this.clearGoblin();
    if (isGameOver) {
      this.endGame();
    } else {
      this.scheduleNext();
    }
  }

  clearGoblin() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.board.hideGoblin();
  }

  scheduleNext() {
    if (!this.gameActive) return;
    setTimeout(() => {
      this.showGoblin();
      this.timeoutId = setTimeout(() => this.onMiss(), GAMETIME_MS);
    }, 300 + Math.random() * 500);
  }

  showGoblin() {
    if (TOTAL_CELLS <= 0) return;

    let newIndex;
    if (TOTAL_CELLS === 1) {
      newIndex = 0;
    } else {
      do {
        newIndex = Math.floor(Math.random() * TOTAL_CELLS);
      } while (newIndex === this.lastGoblinIndex);
    }

    this.lastGoblinIndex = newIndex;
    this.board.hideGoblin();
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