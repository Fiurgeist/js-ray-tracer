import Sphere from '../sphere.js';
import Camera from '../camera.js';
import Color from '../color.js';
import Scene from '../scene.js';
import Vector from '../vector.js';
import Appearance from '../appearance.js';
import Light from '../light.js';

export const ColoredSpheres = () => {
  const camera = new Camera(new Vector(0, 2, -8), Vector.Z);
  const background = Color.Black;
  const shapes = [
    new Sphere(new Vector(-4, 0, 4), 1, new Appearance(Color.Yellow)),
    new Sphere(new Vector(-2, 0, 2), 1, new Appearance(Color.Red)),
    new Sphere(new Vector(0, 0, 0), 1, new Appearance(Color.White)),
    new Sphere(new Vector(2, 0, 2), 1, new Appearance(Color.Green)),
    new Sphere(new Vector(4, 0, 4), 1, new Appearance(Color.Blue)),
  ];
  const lights = [new Light(new Vector(5, 10, -5), Color.White)];
  return new Scene(camera, background, shapes, lights);
}
