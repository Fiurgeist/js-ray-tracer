import Color from "./color.js";

class Appearance {
  constructor(material) {
    this.material = material ?? Color.Grey;
  }
  getColorAt = (point) => this.material.getColorAt(point);
}

export default Appearance;
