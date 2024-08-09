import Camera from './camera.js';
import Color from './color.js';
import Light from './light.js';
import Shape from './shapes/shape.js';

class Scene {
  /**
   *
   * @param {Camera} camera
   * @param {Color} background
   * @param {Shape[]} shapes
   * @param {Light[]} lights
   */
  constructor(camera, background, shapes, lights) {
    this.camera = camera;
    this.background = background ?? Color.Black;
    this.shapes = shapes;
    this.lights = lights;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Color} color for the given pixel
   */
  trace = (x, y) => this.camera.trace(this, x, y);
}

export default Scene;
