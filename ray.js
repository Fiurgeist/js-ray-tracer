import Color from "./color.js";
import Scene from "./scene.js";
import { MAX_DEPTH } from "./settings.js";
import Vector from "./vector.js";

class Ray {
  /**
   * @param {Vector} start
   * @param {Vector} direction
   */
  constructor(start, direction) {
    this.start = start;
    this.direction = direction.normalize();
  }

  /**
   * @param {Scene} scene
   * @param {number=} depth - recursion depth
   * @returns {Color} traced color
   */
  trace = (scene, depth = 0) => {
    if (depth > MAX_DEPTH) {
      return Color.Black;
    }

    const distances = scene.shapes.map((s) => s.closestDistanceAlongRay(this));
    const shortestDistance = Math.min.apply(Math, distances);
    if (shortestDistance === Infinity) {
      return scene.background;
    }

    const nearestShape = scene.shapes[distances.indexOf(shortestDistance)];
    const point = this.start.add(this.direction.scale(shortestDistance));

    return nearestShape.getColorAt(point, this, scene, depth + 1);
  };

  /**
   * @param {Vector} normal - point hit
   * @returns {Vector} reflected vector
   */
  reflect = (normal) => {
    const normalDot = normal.dot(normal);
    if (normalDot === 0) {
      return this.direction;
    }

    return this.direction.subtract(normal.scale(2 * this.direction.dot(normal) / normalDot));
  };
}

export default Ray;
