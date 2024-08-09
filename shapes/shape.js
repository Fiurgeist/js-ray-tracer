import Ray from "../ray.js";
import { THRESHOLD } from "../settings.js";

class Shape {
  constructor(material) {
    this.material = material;
  }

  findIntersections = (_ray) => { throw("Classes which extend Shape must implement intersect") }

  closestDistanceAlongRay = (ray) => {
    const intersections = this.findIntersections(ray).filter((distance) => distance > THRESHOLD);

    return Math.min.apply(Math, intersections);
  }

  getNormalAt = (_point) => { throw("Classes which extend Shape must implement getNormalAt") }

  getColorAt = (point, ray, scene, depth) => {
    const normal = this.getNormalAt(point);
    let color = this.material.getAmbientColorAt(point);

    const reflex = ray.reflect(normal);
    const reflection = this.material.reflect(point, reflex, scene, depth);
    color = color.add(reflection);

    scene.lights.forEach((light) => {
      const lightVector = light.position.subtract(point);
      if (scene.shapes.some((shape) => shape.castsShadowFor(point, lightVector))) {
        return;
      }

      const brightness = normal.dot(lightVector.normalize());
      if (brightness <= 0) {
        return;
      }

      const illumination = light.illuminate(this.material, point, brightness);
      color = color.add(illumination);

      const highlight = this.material.finish.addHighlight(reflex, light, lightVector);
      color = color.add(highlight);
    })

    return color;
  }

  castsShadowFor = (point, lightVector) =>
    this.closestDistanceAlongRay(new Ray(point, lightVector)) <= lightVector.length();
}

export default Shape;
