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
    return nearestShape.getColorAt(point, scene);
  };
}

export default Ray;
