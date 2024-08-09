import Color from "./color.js";
import Finish from "./finish.js";
import Ray from "./ray.js";

class Material {
  constructor(color, finish) {
    this.color = color ?? Color.Grey;
    this.finish = finish ?? Finish.Default;
  }

  getAmbientColorAt = () => this.color.scale(this.finish.ambient);
  getDiffuseColorAt = () => this.color.scale(this.finish.diffuse);

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
