class Material {
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }
  getColorAt = (_point) => { throw('Classes which extend Material must implement getColorAt') }
}

export default Material;
