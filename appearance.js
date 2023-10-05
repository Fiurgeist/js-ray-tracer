import Color from "./color.js";
import Finish from "./finish.js";

class Appearance {
  constructor(material, finish) {
    this.material = material ?? Color.Grey;
    this.finish = finish ?? Finish.Default;
  }
  #getColorAt = point => this.material.getColorAt(point);
  getAmbientColorAt = point => this.#getColorAt(point).scale(this.finish.ambient);
  getDiffuseColorAt = point => this.#getColorAt(point).scale(this.finish.diffuse);

  reflect = (point, reflex, scene, depth) => {
      if (!this.finish.reflection) return Color.Black;
      let reflectedRay = new Ray(point, reflex);
      let reflectedColor = reflectedRay.trace(scene, depth);
      return reflectedColor.scale(this.finish.reflection);
  }
}

export default Appearance;
