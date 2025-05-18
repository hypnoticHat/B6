var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { gameLoop, createSprite, input, setMainSprite } from "../engine/engine.js";
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    const hero = yield createSprite("./assets/hero.png", 100, 100, 100, 100);
    setMainSprite(hero);
    requestAnimationFrame(gameLoop);
    window.addEventListener("keydown", e => {
        if (e.key === "ArrowRight")
            input.right = true;
        if (e.key === "ArrowLeft")
            input.left = true;
        if (e.key === "ArrowUp")
            input.up = true;
        if (e.key === "ArrowDown")
            input.down = true;
    });
    window.addEventListener("keyup", e => {
        if (e.key === "ArrowRight")
            input.right = false;
        if (e.key === "ArrowLeft")
            input.left = false;
        if (e.key === "ArrowUp")
            input.up = false;
        if (e.key === "ArrowDown")
            input.down = false;
    });
});
