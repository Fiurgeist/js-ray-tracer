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
    // const a = ray.direction.squid(); ray.direction is normalized ergo squid is 1
    const b = 2 * os.dot(ray.direction);
    const c = os.squid() - this.radius * this.radius;

    const discriminant = b * b - 4 * c;
    if (discriminant < 0) return [];
    if (discriminant === 0) return [-b / 2];
    return [
      (-b - Math.sqrt(discriminant)) / 2,
      (-b + Math.sqrt(discriminant)) / 2
    ];
  };

  getNormalAt = (point) => Vector.from(this.center).to(point).normalize();
}

export default Sphere;
