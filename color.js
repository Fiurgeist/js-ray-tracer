class Color {
  #r = 0;
  #g = 0;
  #b = 0;

  /**
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  constructor(r, g, b) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
  }

  get r() { return this.#r; }
  get g() { return this.#g; }
  get b() { return this.#b; }

  get rgba() { return [this.r, this.g, this.b, 255]; }
  get html() { return `rgb(${this.r}, ${this.g}, ${this.b})`; }

  static White = new Color(255, 255, 255);
  static Black = new Color(0, 0, 0);
  static Grey = new Color(127, 127, 127);
  static Red = new Color(255, 0, 0);
  static Green = new Color(0, 255, 0);
  static Blue = new Color(0, 0, 255);
  static Yellow = new Color(255, 255, 0);
  static Magenta = new Color(255, 0, 255);
  static Cyan = new Color(0, 255, 255);

  /**
   * @param {Color} other
   * @returns {Color} new color
   */
  add = (other) => new Color(this.r + other.r, this.g + other.g, this.b + other.b);

  /**
   * @param {Color} other
   * @returns {Color} new color
   */
  multiply = (other) => new Color(
    Math.floor(this.r * other.r / 255),
    Math.floor(this.g * other.g / 255),
    Math.floor(this.b * other.b / 255),
  );

  /**
   * @param {number} factor
   * @returns {Color} new color scaled by factor
   */
  scale = (factor) => new Color(this.r * factor, this.g * factor, this.b * factor);
}

export default Color;
