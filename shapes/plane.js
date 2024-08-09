import Shape from "./shape.js";

class Plane extends Shape {
  constructor(normal, distance, material) {
    super(material);

    this.normal = normal;
    this.distance = distance;
  }

  findIntersections = (ray) => {
    const a = ray.direction.dot(this.normal);
    if (a == 0) {
      return [];
    }

    const b = this.normal.dot(ray.start.subtract(this.normal.scale(this.distance)));
    return [-b / a];
  }

  getNormalAt = (_point) => this.normal;
}

export default Plane;
