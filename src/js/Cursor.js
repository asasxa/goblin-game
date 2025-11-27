export class Cursor {
  constructor(hammerImgPath) {
    this.hammer = new Image();
    this.hammer.src = hammerImgPath;
    this.hammer.style.position = 'absolute';
    this.hammer.style.pointerEvents = 'none';
    this.hammer.style.zIndex = '9999';
    this.hammer.style.width = '40px';
    document.body.appendChild(this.hammer);
    this.hide();

    document.addEventListener('mousemove', (e) => {
      this.hammer.style.left = e.pageX - 20 + 'px';
      this.hammer.style.top = e.pageY - 20 + 'px';
    });
  }

  show() {
    this.hammer.style.display = 'block';
  }

  hide() {
    this.hammer.style.display = 'none';
  }
}