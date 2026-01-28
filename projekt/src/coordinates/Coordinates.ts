export default class Coordinates {
  private x: number;
  private y: number;

  public constructor(maxX: number, maxY: number) {
    this.x = Math.random() * maxX;
    this.y = Math.random() * maxY;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }
}