export class Cursor {
  constructor(imgPath) {
    this.el = new Image();
    this.el.src = imgPath;
    this.el.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 40px;
      pointer-events: none;
      z-index: 10000;
      display: none;
    `;
    document.body.append(this.el);

    this.el.onload = () => {
      this.loaded = true;
      this.el.style.display = 'block';
    };

    document.addEventListener('mousemove', (e) => {
      if (this.loaded) {
        this.el.style.left = (e.clientX - 20) + 'px';
        this.el.style.top = (e.clientY - 20) + 'px';
        this.el.style.display = 'block';
      }
    });
  }
}