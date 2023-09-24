import Camera from './camera.js';
import Color from './color.js';
import Renderer from './renderer.js';
import Scene from './scene.js';
import Vector from './vector.js';

const canvas = document.getElementById('render');
const ctx = canvas.getContext('2d');
const renderer = new Renderer(canvas.clientWidth, canvas.height);

const paintPixel = (x, y, color) => {
  ctx.fillStyle = color.html;
  ctx.fillRect(x, y, 1, 1);
}

const camera = new Camera(new Vector(-4, 1, -5), Vector.O);
const background = Color.Blue;
const scene = new Scene(camera, background);

renderer.render(scene, paintPixel);
