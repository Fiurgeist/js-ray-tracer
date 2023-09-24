class Renderer {
  #canvasWidth;
  #canvasHeight;

  constructor(canvasWidth, canvasHeight) {
    this.#canvasWidth = canvasWidth;
    this.#canvasHeight = canvasHeight;
  }

  render = (scene, cb) => {
    for (let py = 0; py < this.#canvasHeight; ++py) {
      for (let px = 0; px < this.#canvasWidth; ++px) {
        const x = (px / this.#canvasWidth) - 0.5;
        const y = (py / this.#canvasHeight) - 0.5;
        const color = scene.trace(x, y);
        cb(px, py, color);
      }
    }
  };
}

export default Renderer;
