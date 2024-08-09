import Material from "../material.js";
import Ray from "../ray.js";
import { THRESHOLD } from "../settings.js";
import Vector from "../vector.js";
import Shape from "./shape.js";

/**
 * @typedef {('x' | 'y' | 'z')} Axis
 */

/**
 * @type {{x: Axis[], y: Axis[], z: Axis[]}}}
 * @const
 */
const otherAxes = {
  x: ['y', 'z'],
  y: ['x', 'z'],
  z: ['x', 'y'],
}

class Box extends Shape {
  /**
   * @param {Vector} corner1
   * @param {Vector} corner2
   * @param {Material} material
   */
  constructor(corner1, corner2, material) {
    super(material);

    this.lowerCorner = new Vector(Math.min(corner1.x, corner2.x), Math.min(corner1.y, corner2.y), Math.min(corner1.z, corner2.z));
    this.upperCorner = new Vector(Math.max(corner1.x, corner2.x), Math.max(corner1.y, corner2.y), Math.max(corner1.z, corner2.z));
  }

  /**
   * @param {Vector} point
   * @param {Axis} axis
   * @returns {boolean} whether the given point is within the box's side of the given axis
   */
  contains = (point, axis) => this.lowerCorner[axis] < point[axis] && point[axis] < this.upperCorner[axis];

  /**
   * @param {Vector} vertex
   * @param {Ray} ray
   * @param {Axis} axis
   * @param {Axis[]} otherAxes
   * @param {number[]} intersections - distances to intersections
   * @returns {number[]} distances to all intersections
   */
  intersectionForVertex = (vertex, ray, axis, [otherAxis1, otherAxis2], intersections) => {
    const intersect = (vertex[axis] - ray.start[axis]) / ray.direction[axis];
    const point = ray.start.add(ray.direction.scale(intersect));

    if (this.contains(point, otherAxis1) && this.contains(point, otherAxis2)) {
      intersections.push(intersect);
    }

    return intersections;
  }

  /**
   * @param {Axis} axis
   * @param {Ray} ray
   * @returns {number[]} distances to all intersections
   */
  intersectOnAxis = (axis, ray) => {
    if (ray.direction[axis] === 0) {
      return [];
    }

    const other = otherAxes[axis];
    const intersections = this.intersectionForVertex(this.lowerCorner, ray, axis, other, []);

    return this.intersectionForVertex(this.upperCorner, ray, axis, other, intersections);
  }

  /**
   * @param {Ray} ray
   * @returns {number[]} distances to all intersections
   */
  findIntersections = (ray) => {
    return this.intersectOnAxis('x', ray)
      .concat(this.intersectOnAxis('y', ray))
      .concat(this.intersectOnAxis('z', ray));
  }


  /**
   * @param {Vector} point
   * @returns {Vector} normal vector at given point
   */
  getNormalAt = (point) => {
    if (Math.abs(this.lowerCorner.x - point.x) < THRESHOLD) return Vector.XI;
    if (Math.abs(this.upperCorner.x - point.x) < THRESHOLD) return Vector.X;
    if (Math.abs(this.lowerCorner.y - point.y) < THRESHOLD) return Vector.YI;
    if (Math.abs(this.upperCorner.y - point.y) < THRESHOLD) return Vector.Y;
    if (Math.abs(this.lowerCorner.z - point.z) < THRESHOLD) return Vector.ZI;
    if (Math.abs(this.upperCorner.z - point.z) < THRESHOLD) return Vector.Z;
  }
}

export default Box;
