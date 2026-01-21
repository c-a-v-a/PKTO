import type TruckState from "./TruckState";

export default class TruckStateGone implements TruckState {
  public isAvailable(): boolean {
    return false;
  }
}