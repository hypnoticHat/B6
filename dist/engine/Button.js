export class Button {
    constructor(x, y, width, height, options) {
        var _a;
        this.isMouseDown = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.onClick = options.onClick;
        this.onMouseDown = options.onMouseDown;
        this.onMouseUp = options.onMouseUp;
        this.label = (_a = options.label) !== null && _a !== void 0 ? _a : "Button";
        window.addEventListener("mousedown", this.handleMouseDown.bind(this));
        window.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }
    handleMouseDown(evt) {
        var _a;
        const { offsetX, offsetY } = evt;
        if (offsetX >= this.x &&
            offsetX <= this.x + this.width &&
            offsetY >= this.y &&
            offsetY <= this.y + this.height) {
            this.isMouseDown = true;
            (_a = this.onMouseDown) === null || _a === void 0 ? void 0 : _a.call(this);
        }
    }
    handleMouseUp(evt) {
        var _a, _b;
        if (!this.isMouseDown)
            return;
        const { offsetX, offsetY } = evt;
        if (offsetX >= this.x &&
            offsetX <= this.x + this.width &&
            offsetY >= this.y &&
            offsetY <= this.y + this.height) {
            (_a = this.onClick) === null || _a === void 0 ? void 0 : _a.call(this); // click nếu thả chuột trong vùng
        }
        (_b = this.onMouseUp) === null || _b === void 0 ? void 0 : _b.call(this);
        this.isMouseDown = false;
    }
    update(dt) {
    }
    draw(ctx) {
        ctx.fillStyle = "#555";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#fff";
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }
}
