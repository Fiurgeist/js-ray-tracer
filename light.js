import Color from "./color.js";
import Material from "./material.js";
import Vector from "./vector.js";

class Light {
  /**
   * @param {Vector} position
   * @param {Color} color
   */
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  /**
   * @param {Material} material
   * @param {number} brightness - must be between 0 and 1
   * @returns {Color} illuminated material color
   */
  illuminate = (material, brightness) =>
    material.getDiffuseColor().multiply(this.color).scale(brightness);
}

export default Light;
