import Color from "../color.js";
import { THRESHOLD } from "../settings.js";
import Vector from "../vector.js";

class Shape {
  constructor(appearance) {
    this.appearance = appearance;
  }
  findIntersections = (_ray) => { throw("Classes which extend Shape must implement intersect") }
  closestDistanceAlongRay = (ray) => {
    const intersections = this.findIntersections(ray).filter((distance) => distance > THRESHOLD);
    return Math.min.apply(Math, intersections);
  }
  getNormalAt = (_point) => { throw("Classes which extend Shape must implement getNormalAt") }
  getColorAt = (point, scene) => {
    const normal = this.getNormalAt(point);
    let color = Color.Black;
    scene.lights.forEach((light) => {
      const v = Vector.from(point).to(light.position);
      const brightness = normal.dot(v.normalize());
      if (brightness <= 0) return;
      const illumination = light.illuminate(this.appearance, point, brightness);
      color = color.add(illumination);
    })
    return color;
  }
}

export default Shape;