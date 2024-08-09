import Renderer from './renderer.js';
import { AssortedShapes } from './scenes/exapmles.js';

const canvas = document.getElementById('render');
const ctx = canvas.getContext('2d');
const renderer = new Renderer(canvas.clientWidth, canvas.height);

const paintPixel = (x, y, color) => {
  ctx.fillStyle = color.html;
  ctx.fillRect(x, y, 1, 1);
}

const start = Date.now();
renderer.render(AssortedShapes(), paintPixel);
const duration = Date.now() - start;

document.getElementById('timer').innerHTML = `Rendering took ${duration / 1000}s`;
