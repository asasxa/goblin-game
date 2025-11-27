export class Score {
  constructor() {
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.scoreEl = document.createElement('div');
    this.missesEl = document.createElement('div');
    this.initUI();
  }

  initUI() {
    this.scoreEl.id = 'score';
    this.missesEl.id = 'misses';
    document.body.prepend(this.missesEl, this.scoreEl);
    this.update();
  }

  addPoint() {
    this.score++;
    this.update();
  }

  addMiss() {
    this.misses++;
    this.update();
    return this.misses >= this.maxMisses;
  }

  update() {
    this.scoreEl.textContent = `Score: ${this.score}`;
    this.missesEl.textContent = `Misses: ${this.misses} / ${this.maxMisses}`;
  }

  isGameOver() {
    return this.misses >= this.maxMisses;
  }
}