export class Sprite {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public vy: number = 0;
  public vx: number = 0;
  private image: HTMLImageElement;

  constructor(
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update(dt: number): void {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}