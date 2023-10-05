import Shape from "./shape.js";
import Vector from "../vector.js";

class Sphere extends Shape {
  constructor(center, radius, appearance) {
    super(appearance);
    this.center = center;
    this.radius = radius;
  }

  findIntersections = (ray) => {
    const os = Vector.from(this.center).to(ray.start);
    const a = ray.direction.squid();
    const b = 2 * os.dot(ray.direction);
    const c = os.squid() - this.radius * this.radius;

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return [];
    if (discriminant === 0) return [-b / (2 * a)];
    return [
      (-b - Math.sqrt(discriminant)) / (2 * a),
      (-b + Math.sqrt(discriminant)) / (2 * a)
    ];
  };
  getNormalAt = (point) => point.add(this.center.invert()).normalize();
}

export default Sphere;
