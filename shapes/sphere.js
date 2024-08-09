import Shape from "./shape.js";
import { THRESHOLD } from "../settings.js";

class Sphere extends Shape {
  constructor(center, radius, material) {
    super(material);

    this.center = center;
    this.radius = radius;
  }

  findIntersections = (ray) => {
    const os = ray.start.subtract(this.center);
    // const a = ray.direction.dot(ray.direction); ray.direction is normalized ergo a is 1
    const b = 2 * os.dot(ray.direction);
    const c = os.dot(os) - this.radius * this.radius;

    const discriminant = b * b - 4 * c;
    if (discriminant < 0) return [];
    if (discriminant < THRESHOLD) return [-b / 2];

    return [
      (-b - Math.sqrt(discriminant)) / 2,
      (-b + Math.sqrt(discriminant)) / 2
    ];
  };

  getNormalAt = (point) => point.subtract(this.center).normalize();
}

export default Sphere;
