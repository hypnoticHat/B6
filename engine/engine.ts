import { Sprite } from './Sprite.js';
import { Button } from './Button.js';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const canvasWidth = 800;
const canvasHeight = 400;
const canvasColor = '#000000';

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const updatables: Array<{ update(dt: number): void }> = [];
const drawables: Array<{ draw(ctx: CanvasRenderingContext2D): void }> = [];

export const input = {
  left: false,
  right: false,
  up: false,
  down: false,
};

export function add(obj: { update(dt: number): void } & { draw(ctx: CanvasRenderingContext2D): void }) {
  updatables.push(obj);
  drawables.push(obj);
}

export async function createSprite(url: string, x: number, y: number, width: number, height: number) {
  const img = new Image();
  img.src = url;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (err) => reject(new Error(`Failed to load image at ${url}: ${err}`));
  });

  const sprite = new Sprite(img, x, y, width, height);
  add(sprite);
  return sprite;
}

export function createButton(
  x: number,
  y: number,
  width: number,
  height: number,
  options: {
    onClick?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    label?: string;
  }
) {
  const btn = new Button(x, y, width, height, options);
  add(btn);
  return btn;
}

export function handleInput(sprite: Sprite) {
  const speed = 100;
  sprite.vectorX = 0;
  sprite.vectorY = 0;

  if (input.left) sprite.vectorX = -speed;
  if (input.right) sprite.vectorX = speed;
  if (input.up) sprite.vectorY = -speed;
  if (input.down) sprite.vectorY = speed;
}

let lastTime = performance.now();
let mainSprite: Sprite;

export function setMainSprite(s: Sprite) {
  mainSprite = s;
}

export function gameLoop(now: number = performance.now()) {
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  if (mainSprite) handleInput(mainSprite);

  updatables.forEach(obj => obj.update(dt));

  ctx.fillStyle = canvasColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawables.forEach(obj => obj.draw(ctx));

  requestAnimationFrame(gameLoop);
}
