import { gameLoop, createSprite,createButton, input, setMainSprite } from "../engine/engine.js";

window.onload = async () => {
  const hero = await createSprite("./assets/hero.png", 100, 100, 100, 100);
  setMainSprite(hero);
  requestAnimationFrame(gameLoop);

createButton(220, 220, 80, 50, {
    label: "←",
    onMouseDown: () => input.left = true,
    onMouseUp: () => input.left = false
  });

  createButton(320, 220, 80, 50, {
    label: "→",
    onMouseDown: () => input.right = true,
    onMouseUp: () => input.right = false
  });

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
