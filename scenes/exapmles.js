import Sphere from '../sphere.js';
import Camera from '../camera.js';
import Color from '../color.js';
import Scene from '../scene.js';
import Vector from '../vector.js';

export const ColoredSpheres = () => {
  const camera = new Camera(new Vector(0, 2, -8), Vector.Z);
  const background = Color.Black;
  const shapes = [
    new Sphere(new Vector(-4, 0, 4), 1, Color.Yellow),
    new Sphere(new Vector(-2, 0, 2), 1, Color.Red),
    new Sphere(new Vector(0, 0, 0), 1, Color.White),
    new Sphere(new Vector(2, 0, 2), 1, Color.Green),
    new Sphere(new Vector(4, 0, 4), 1, Color.Blue),
  ];
  return new Scene(camera, background, shapes);
}
