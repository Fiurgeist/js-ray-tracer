import { THRESHOLD } from "./settings.js";

class Shape {
  constructor(color) {
    this.color = color;
  }
  findIntersections = (_ray) => { throw ("Classes which extend Shape must implement intersect") }
  closestDistanceAlongRay = (ray) => {
    const intersections = this.findIntersections(ray).filter((distance) => distance > THRESHOLD);
    return Math.min.apply(Math, intersections);
  }
}

export default Shape;
