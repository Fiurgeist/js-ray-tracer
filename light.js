class Light {
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  illuminate = (material, point, brightness) =>
    material.getDiffuseColorAt(point).multiply(this.color).scale(brightness);
}

export default Light;
