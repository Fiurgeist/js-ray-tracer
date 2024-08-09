class Vector {
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

  static from = (origin) => ({ to: (target) => target.subtract(origin) });

  length = () => Math.sqrt(this.dot(this));

  dot = (that) => this.x * that.x + this.y * that.y + this.z * that.z;
  cross = (that) => new Vector(
    this.y * that.z - this.z * that.y,
    this.z * that.x - this.x * that.z,
    this.x * that.y - this.y * that.x,
  );
  add = (that) => new Vector(this.x + that.x, this.y + that.y, this.z + that.z);
  subtract = (that) => new Vector(this.x - that.x, this.y - that.y, this.z - that.z);

  invert = () => new Vector(-this.x, -this.y, -this.z);
  normalize = () => {
    const l = this.length();
    return new Vector(this.x / l, this.y / l, this.z / l);
  };
  scale = (factor) => new Vector(this.x * factor, this.y * factor, this.z * factor);

  toString = () => `Vector(${this.x}, ${this.y}, ${this.z})`;
}

export default Vector;
