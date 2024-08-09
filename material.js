import Color from "./color.js";
import Finish from "./finish.js";
import Ray from "./ray.js";
import Scene from "./scene.js";
import Vector from "./vector.js";

class Material {
  /**
   * @param {Color=} color
   * @param {Finish=} finish
   */
  constructor(color, finish) {
    this.color = color ?? Color.Grey;
    this.finish = finish ?? Finish.Default;
  }

  getAmbientColor = () => this.color.scale(this.finish.ambient);
  getDiffuseColor = () => this.color.scale(this.finish.diffuse);

  /**
   * @param {Vector} point
   * @param {Vector} reflex
   * @param {Scene} scene
   * @param {number} depth - recursive depth
   * @returns {Color} reflected color
   */
  reflect = (point, reflex, scene, depth) => {
    if (!this.finish.reflection) {
      return Color.Black;
    }

    let reflectedRay = new Ray(point, reflex);
    let reflectedColor = reflectedRay.trace(scene, depth);

    return reflectedColor.scale(this.finish.reflection);
  }
}

export default Material;
