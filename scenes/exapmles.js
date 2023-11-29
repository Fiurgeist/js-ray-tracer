import Camera from '../camera.js';
import Color from '../color.js';
import Scene from '../scene.js';
import Vector from '../vector.js';
import Appearance from '../appearance.js';
import Light from '../light.js';
import Box from '../shapes/box.js';
import Plane from '../shapes/plane.js';
import Sphere from '../shapes/sphere.js';
import Finish from '../finish.js';

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

export const AssortedShapes = () => {
  const camera = new Camera(new Vector(-5, 7, -15), new Vector(0, 4, 0));
  const background = Color.Grey;
  const shiny = new Finish({ shiny: 0.5, reflection: 0.5 })
  const shapes = [
    new Plane(Vector.Y, 0, new Appearance(Color.White)),
    new Box(new Vector(-2, 0, -2), new Vector(2, 4, 2), new Appearance(Color.Red, shiny)),
    new Sphere(new Vector(6, 0, 2), 2, new Appearance(Color.Magenta, shiny)),
    new Sphere(new Vector(6, 1, -4), 1, new Appearance(Color.Yellow, shiny)),
    new Sphere(new Vector(-2, 2, 4), 2, new Appearance(Color.Green, shiny)),
    new Sphere(new Vector(-4, 4, 10), 4, new Appearance(Color.Blue, shiny)),
    new Sphere(new Vector(-3.2, 1, -1), 1, new Appearance(Color.Cyan, shiny)),
  ];
  const lights = [new Light(new Vector(-30, 25, -12), Color.White)];
  return new Scene(camera, background, shapes, lights);
}

export const ManyBoxes = () => {
  const camera = new Camera(new Vector(-5, 7, -15), new Vector(0, 4, 0));
  const background = Color.Black;
  const shiny = new Finish({ shiny: 0.5, reflection: 0.5 })
  const shapes = [
    new Plane(Vector.Y, 0, new Appearance(Color.White)),
    new Box(new Vector(-2, 0, -2), new Vector(2, 4, 2), new Appearance(Color.Red, shiny)),
    new Box(new Vector(6, 0, 2), new Vector(4, 4, 0), new Appearance(Color.Magenta, shiny)),
    new Box(new Vector(6, 1, -4), new Vector(4, 6, -2), new Appearance(Color.Yellow, shiny)),
    new Box(new Vector(-2, 2, 4), new Vector(-4, 4, 2), new Appearance(Color.Green, shiny)),
    new Box(new Vector(-4, 4, 10), new Vector(-6, 8, 8), new Appearance(Color.Blue, shiny)),
    new Box(new Vector(-3.2, 1, -1), new Vector(-5, 4, -2), new Appearance(Color.Cyan, shiny)),
  ];
  const lights = [new Light(new Vector(-30, 25, -12), Color.White)];
  return new Scene(camera, background, shapes, lights);
}
