import type TruckState from "./TruckState";

export default class TruckStateAvailable implements TruckState {
  public isAvailable(): boolean {
    return true;
  }
}