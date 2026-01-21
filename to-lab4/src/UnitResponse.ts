import Truck from "./Truck";

export default class UnitResponse {
  private distance: number;
  private availableTrucks: Truck[];

  public constructor(distance: number, trucks: Truck[]) {
    this.distance = distance;
    this.availableTrucks = trucks.filter(truck => truck.isAvailable());
  }

  public getDistance() {
    return this.distance;
  }

  public getAvailableTrucks() {
    return this.availableTrucks;
  }
}