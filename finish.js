import Color from "./color.js";

class Finish {
  constructor(options = {}) {
    this.ambient = options.ambient ?? 0.1;
    this.diffuse = options.diffuse ?? 0.7;
    this.shiny = options.shiny ?? 0;
    this.reflection = options.reflection ?? 0;
  }

  addHighlight = (reflex, light, lightVector) => {
    if (!this.shiny) return Color.Black;
    let intensity = reflex.dot(lightVector.normalize());
    if (intensity <= 0) return Color.Black;
    const exp = 32 * this.shiny * this.shiny;
    intensity = Math.pow(intensity, exp);
    return light.color.scale(this.shiny * intensity);
  }

  static Default = new Finish();
}

export default Finish;
