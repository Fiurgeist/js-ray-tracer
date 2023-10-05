import { THRESHOLD } from "../settings.js";
import Vector from "../vector.js";
import Shape from "./shape.js";

const otherAxes = {
  x: ['y', 'z'],
  y: ['x', 'z'],
  z: ['x', 'y'],
}

class Box extends Shape {
  constructor(corner1, corner2, appearance) {
    super(appearance);
    this.lowerCorner = new Vector(Math.min(corner1.x, corner2.x), Math.min(corner1.y, corner2.y), Math.min(corner1.z, corner2.z));
    this.upperCorner = new Vector(Math.max(corner1.x, corner2.x), Math.max(corner1.y, corner2.y), Math.max(corner1.z, corner2.z));
  }

  contains = (point, axis) => this.lowerCorner[axis] < point[axis] && point[axis] < this.upperCorner[axis];

  intersectionForVertex = (vertex, ray, axis, [otherAxis1, otherAxis2], intersections) => {
    const intersect = (vertex[axis] - ray.start[axis]) / ray.direction[axis];
    const point = ray.start.add(ray.direction.scale(intersect));
    if (this.contains(point, otherAxis1) && this.contains(point, otherAxis2)) intersections.push(intersect);
    return intersections
  };
  intersectOnAxis = (axis, ray) => {
    if (ray.direction[axis] === 0) return [];
    const other = otherAxes[axis];
    const intersections = this.intersectionForVertex(this.lowerCorner, ray, axis, other, [])
    return this.intersectionForVertex(this.upperCorner, ray, axis, other, intersections);
  }
  findIntersections = (ray) => {
    return this.intersectOnAxis('x', ray)
        .concat(this.intersectOnAxis('y', ray))
        .concat(this.intersectOnAxis('z', ray));
  }
  getNormalAt = (pos) => {
    if (Math.abs(this.lowerCorner.x - pos.x) < THRESHOLD) return Vector.XI;
    if (Math.abs(this.upperCorner.x - pos.x) < THRESHOLD) return Vector.X;
    if (Math.abs(this.lowerCorner.y - pos.y) < THRESHOLD) return Vector.YI;
    if (Math.abs(this.upperCorner.y - pos.y) < THRESHOLD) return Vector.Y;
    if (Math.abs(this.lowerCorner.z - pos.z) < THRESHOLD) return Vector.ZI;
    if (Math.abs(this.upperCorner.z - pos.z) < THRESHOLD) return Vector.Z;
  }
}

export default Box;
