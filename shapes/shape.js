import Ray from "../ray.js";
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
  getColorAt = (point, ray, scene, depth) => {
    const normal = this.getNormalAt(point);
    let color = this.appearance.getAmbientColorAt(point);
    const reflex = ray.reflect(normal);
    const reflection = this.appearance.reflect(point, reflex, scene, depth);
    color = color.add(reflection);
    scene.lights.forEach((light) => {
      const v = Vector.from(point).to(light.position);
      if (scene.shapes.some((shape) => shape.castsShadowFor(point, v))) return;
      const brightness = normal.dot(v.normalize());
      if (brightness <= 0) return;
      const illumination = light.illuminate(this.appearance, point, brightness);
      color = color.add(illumination);
      const highlight = this.appearance.finish.addHighlight(reflex, light, v);
      color = color.add(highlight);
    })
    return color;
  }
  castsShadowFor = (point, lightVector) =>
    this.closestDistanceAlongRay(new Ray(point, lightVector)) <= lightVector.length();
}

export default Shape;
