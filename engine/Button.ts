export class Button {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  private onClick?: () => void;
  private onMouseDown?: () => void;
  private onMouseUp?: () => void;
  private isMouseDown = false;
  private label: string;

  constructor(
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
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.onClick = options.onClick;
    this.onMouseDown = options.onMouseDown;
    this.onMouseUp = options.onMouseUp;
    this.label = options.label ?? "Button";

    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  private handleMouseDown(evt: MouseEvent): void {
    const { offsetX, offsetY } = evt;
    if (
      offsetX >= this.x &&
      offsetX <= this.x + this.width &&
      offsetY >= this.y &&
      offsetY <= this.y + this.height
    ) {
      this.isMouseDown = true;
      this.onMouseDown?.();
    }
  }

  private handleMouseUp(evt: MouseEvent): void {
    if (!this.isMouseDown) return;

    const { offsetX, offsetY } = evt;
    if (
      offsetX >= this.x &&
      offsetX <= this.x + this.width &&
      offsetY >= this.y &&
      offsetY <= this.y + this.height
    ) {
      this.onClick?.(); // click nếu thả chuột trong vùng
    }

    this.onMouseUp?.();
    this.isMouseDown = false;
  }

  update(dt: number): void {
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#555";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#fff";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2);
  }
}
