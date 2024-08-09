import Vector from './vector.js';
import Ray from './ray.js';

class Camera {
  constructor(location, lookAt, width = 4, height = 9 / 4) {
    this.location = location;
    this.lookAt = lookAt;

    this.direction = this.lookAt.subtract(this.location).normalize();
    this.right = Vector.Y.cross(this.direction).normalize().scale(width / 2);
    this.up = this.right.cross(this.direction).normalize().scale(-height / 2);
  }

  trace = (scene, x, y) => {
    const xRay = this.right.scale(x);
    const yRay = this.up.scale(y).invert();
    const rayDirection = this.direction.add(xRay).add(yRay);
    const ray = new Ray(this.location, rayDirection);

    return ray.trace(scene);
  };
}

export default Camera;
