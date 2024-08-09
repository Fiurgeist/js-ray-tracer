import Color from "../color.js";
import Material from "../material.js";
import Ray from "../ray.js";
import Scene from "../scene.js";
import { THRESHOLD } from "../settings.js";
import Vector from "../vector.js";

class Shape {
  /**
   * Baseclass for all shapes.
   * @param {Material} material
   */
  constructor(material) {
    this.material = material;
  }

  /**
   * @param {Ray} _ray
   * @returns {number[]} distances to all intersections
   */
  findIntersections = (_ray) => { throw("Classes which extend Shape must implement intersect") }

  /**
   * @param {Ray} ray
   */
  closestDistanceAlongRay = (ray) => {
    const intersections = this.findIntersections(ray).filter((distance) => distance > THRESHOLD);

    return Math.min.apply(Math, intersections);
  }

  /**
   * @param {Vector} _point
   * @returns {Vector} normal vector at given point
   */
  getNormalAt = (_point) => { throw("Classes which extend Shape must implement getNormalAt") }

  /**
   * @param {Vector} point
   * @param {Ray} ray
   * @param {Scene} scene
   * @param {number} depth
   * @returns {(Color|undefined)} color at point
   */
  getColorAt = (point, ray, scene, depth) => {
    const normal = this.getNormalAt(point);
    let color = this.material.getAmbientColor();

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

      const illumination = light.illuminate(this.material, brightness);
      color = color.add(illumination);

      const highlight = this.material.finish.addHighlight(reflex, light, lightVector);
      color = color.add(highlight);
    })

    return color;
  }

  /**
   * @param {Vector} point
   * @param {Vector} lightVector
   * @returns {boolean} whether a shadow is cast
   */
  castsShadowFor = (point, lightVector) =>
    this.closestDistanceAlongRay(new Ray(point, lightVector)) <= lightVector.length();
}

export default Shape;
