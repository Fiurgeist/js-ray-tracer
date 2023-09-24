import Color from './color.js';

class Scene {
  constructor(camera, background) {
    this.camera = camera;
    this.background = background ?? Color.Black;
  }

  trace = (x, y) => this.camera.trace(this, x, y);
}

export default Scene;
