class Ray {
  constructor(start, direction) {
    this.start = start;
    this.direction = direction;
  }

  trace = (scene) => scene.background;
}

export default Ray;
