import { THRESHOLD } from "../settings.js";
import Vector from "../vector.js";
import Shape from "./shape.js";

const axes = ['x', 'y', 'z'];

class Box extends Shape {
  constructor(corner1, corner2, appearance) {
    super(appearance);
    this.lowerCorner = new Vector(Math.min(corner1.x, corner2.x), Math.min(corner1.y, corner2.y), Math.min(corner1.z, corner2.z));
    this.upperCorner = new Vector(Math.max(corner1.x, corner2.x), Math.max(corner1.y, corner2.y), Math.max(corner1.z, corner2.z));
    this.vertices = [this.lowerCorner, this.upperCorner];
  }

  contains = (point, axis) => this.lowerCorner[axis] < point[axis] && point[axis] < this.upperCorner[axis];

  intersectOnAxis = (axis, ray) => {
    const [o1, o2] = axes.filter((a) => a != axis);
    const intersections = new Array();
    if (ray.direction[axis] === 0) return [];
    this.vertices.forEach((vertex) => {
      const intersect = (vertex[axis] - ray.start[axis]) / ray.direction[axis];
      const point = ray.start.add(ray.direction.scale(intersect));
      if (this.contains(point, o1) && this.contains(point, o2)) intersections.push(intersect);
    });
    return intersections;
  }
  findIntersections = (ray) => {
    return this.intersectOnAxis('x', ray)
        .concat(this.intersectOnAxis('y', ray))
        .concat(this.intersectOnAxis('z', ray));
  }
  getNormalAt = (pos) => {
    if (Math.abs(this.lowerCorner.x - pos.x) < THRESHOLD) return Vector.X.invert();
    if (Math.abs(this.upperCorner.x - pos.x) < THRESHOLD) return Vector.X;
    if (Math.abs(this.lowerCorner.y - pos.y) < THRESHOLD) return Vector.Y.invert();
    if (Math.abs(this.upperCorner.y - pos.y) < THRESHOLD) return Vector.Y;
    if (Math.abs(this.lowerCorner.z - pos.z) < THRESHOLD) return Vector.Z.invert();
    if (Math.abs(this.upperCorner.z - pos.z) < THRESHOLD) return Vector.Z;
  }
}

export default Box;
