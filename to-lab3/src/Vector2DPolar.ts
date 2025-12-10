export default class Vector2DPolar {
  private angle: number;
  private length: number;

  constructor(angle: number, length: number) {
    this.angle = angle;
    this.length = length;
  }

  public getX(): number {
    return this.length * Math.cos(this.angle);
  }

  public getY(): number {
    return this.length * Math.sin(this.angle);
  }
}