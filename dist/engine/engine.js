var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sprite } from './Sprite.js';
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = 800;
const canvasHeight = 600;
const canvasColor = '#000000';
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const updatables = [];
const drawables = [];
export const input = {
    left: false,
    right: false,
    up: false,
    down: false,
};
export function add(obj) {
    updatables.push(obj);
    drawables.push(obj);
}
export function createSprite(url, x, y, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const img = new Image();
        img.src = url;
        yield new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = (err) => reject(new Error(`Failed to load image at ${url}: ${err}`));
        });
        const sprite = new Sprite(img, x, y, width, height);
        add(sprite);
        return sprite;
    });
}
export function handleInput(sprite) {
    const speed = 100;
    sprite.vx = 0;
    sprite.vy = 0;
    if (input.left)
        sprite.vx = -speed;
    if (input.right)
        sprite.vx = speed;
    if (input.up)
        sprite.vy = -speed;
    if (input.down)
        sprite.vy = speed;
}
let lastTime = performance.now();
let mainSprite;
export function setMainSprite(s) {
    mainSprite = s;
}
export function gameLoop(now = performance.now()) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    if (mainSprite)
        handleInput(mainSprite);
    updatables.forEach(obj => obj.update(dt));
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawables.forEach(obj => obj.draw(ctx));
    requestAnimationFrame(gameLoop);
}
