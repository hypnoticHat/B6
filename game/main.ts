import { gameLoop, createSprite, input, setMainSprite } from "../engine/engine.js";

window.onload = async () => {
  const hero = await createSprite("./assets/hero.png", 100, 100, 100, 100);
  setMainSprite(hero);
  requestAnimationFrame(gameLoop);

  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") input.right = true;
    if (e.key === "ArrowLeft") input.left = true;
    if (e.key === "ArrowUp") input.up = true;
    if (e.key === "ArrowDown") input.down = true;
  });

  window.addEventListener("keyup", e => {
    if (e.key === "ArrowRight") input.right = false;
    if (e.key === "ArrowLeft") input.left = false;
    if (e.key === "ArrowUp") input.up = false;
    if (e.key === "ArrowDown") input.down = false;
  });
};
