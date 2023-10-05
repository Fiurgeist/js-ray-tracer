class Ray {
  constructor(start, direction) {
    this.start = start;
    this.direction = direction;
  }

  trace = (scene) => {
    const distances = scene.shapes.map((s) => s.closestDistanceAlongRay(this));
    const shortestDistance = Math.min.apply(Math, distances);
    if (shortestDistance === Infinity) {
      return scene.background;
    }
    const nearestShape = scene.shapes[distances.indexOf(shortestDistance)];

    const point = this.start.add(this.direction.scale(shortestDistance));
    return nearestShape.getColorAt(point, this, scene);
  };

  reflect = (normal) => {
    const normalSquid = normal.squid()
    if (normalSquid === 0) return this.direction
    return this.direction.subtract(normal.scale(2 * this.direction.dot(normal) / normalSquid))
  };
}

export default Ray;
