import Color from "./color.js";
import { MAX_DEPTH } from "./settings.js";

class Ray {
  constructor(start, direction) {
    this.start = start;
    this.direction = direction.normalize();
  }

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

  reflect = (normal) => {
    const normalDot = normal.dot(normal);
    if (normalDot === 0) {
      return this.direction;
    }

    return this.direction.subtract(normal.scale(2 * this.direction.dot(normal) / normalDot));
  };
}

export default Ray;
