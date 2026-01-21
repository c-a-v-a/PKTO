import Request from "./Request";
import Truck from "./Truck";
import UnitResponse from "./UnitResponse";

export default class Unit {
  private name: string;
  private requests: Request[] = [];
  private trucks: Truck[];
  private x: number;
  private y: number;

  public constructor(name: string, x: number, y: number, trucksCount: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.trucks = [];

    for (let i = 0; i < trucksCount; i++)
      this.trucks.push(new Truck(`${this.name}-${i}`));
  }

  public getName() {
    return this.name;
  }

  public update(request: Request) {
    return new UnitResponse(
      this.calculateDistance(request),
      this.trucks
    );
  }

  private calculateDistance(request: Request) {
    return Math.sqrt((this.x - request.getX()) ** 2 + (this.y - request.getY()) ** 2);
  }

  public addRequest(request: Request) {
    if (!this.requests.includes(request)) {
      this.requests.push(request);
    }
  }

  public removeRequest(request: Request) {
    if (this.requests.includes(request)) {
      this.requests.splice(this.requests.indexOf(request), 1);
    }
  }

  public getRequests() {
    return this.requests;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public getLabel() {
    const availableTrucks = this.trucks.filter(truck => truck.isAvailable());

    return `${this.name} [${availableTrucks.length}/${this.trucks.length}]`;
  }
}