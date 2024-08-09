import Material from "../material.js";
import Ray from "../ray.js";
import Vector from "../vector.js";
import Shape from "./shape.js";

class Plane extends Shape {
  /**
   * @param {Vector} normal
   * @param {number} distance
   * @param {Material} material
   */
  constructor(normal, distance, material) {
    super(material);

    this.normal = normal;
    this.distance = distance;
  }

  /**
   * @param {Ray} ray
   * @returns {number[]} distances to all intersections
   */
  findIntersections = (ray) => {
    const a = ray.direction.dot(this.normal);
    if (a == 0) {
      return [];
    }

    const b = this.normal.dot(ray.start.subtract(this.normal.scale(this.distance)));
    return [-b / a];
  }

  /**
   * @param {Vector} _point
   * @returns {Vector} normal vector
   */
  getNormalAt = (_point) => this.normal;
}

export default Plane;
