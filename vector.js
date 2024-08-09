class Vector {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static O = new Vector(0, 0, 0);
  static U = new Vector(1, 1, 1);
  static X = new Vector(1, 0, 0);
  static Y = new Vector(0, 1, 0);
  static Z = new Vector(0, 0, 1);
  static XI = new Vector(-1, 0, 0);
  static YI = new Vector(0, -1, 0);
  static ZI = new Vector(0, 0, -1);

  length = () => Math.sqrt(this.dot(this));

  /**
   * @param {Vector} other
   * @returns {number}
   */
  dot = (other) => this.x * other.x + this.y * other.y + this.z * other.z;

  /**
   * @param {Vector} other
   * @returns {Vector} new vector
   */
  cross = (other) => new Vector(
    this.y * other.z - this.z * other.y,
    this.z * other.x - this.x * other.z,
    this.x * other.y - this.y * other.x,
  );

  /**
   * @param {Vector} other
   * @returns {Vector} new vector
   */
  add = (other) => new Vector(this.x + other.x, this.y + other.y, this.z + other.z);

  /**
   * @param {Vector} other
   * @returns {Vector} new vector
   */
  subtract = (other) => new Vector(this.x - other.x, this.y - other.y, this.z - other.z);

  invert = () => new Vector(-this.x, -this.y, -this.z);

  normalize = () => {
    const l = this.length();
    return new Vector(this.x / l, this.y / l, this.z / l);
  };

  /**
   * @param {number} factor
   * @returns {Vector} new vector
   */
  scale = (factor) => new Vector(this.x * factor, this.y * factor, this.z * factor);

  toString = () => `Vector(${this.x}, ${this.y}, ${this.z})`;
}

export default Vector;
