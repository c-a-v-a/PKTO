import type TruckState from "./TruckState";
import TruckStateAvailable from "./TruckStateAvailable";
import TruckStateGone from "./TruckStateGone";

export default class Truck {
  private name: string;
  private state: TruckState;

  public constructor(name: string) {
    this.name = name;
    this.state = new TruckStateAvailable();
  }

  public getName() {
    return this.name;
  }

  public isAvailable(): boolean {
    return this.state.isAvailable();
  }

  public rollOut() {
    this.state = new TruckStateGone();
  }

  public goBack() {
    this.state = new TruckStateAvailable();
  }
}