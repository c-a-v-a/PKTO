import Constants from "./Constants";
import RequestState from "./RequestState";

export default class Request {
  private x: number;
  private y: number;
  private state: RequestState;

  public constructor(x: number, y: number) {
    if (Math.random() <= Constants.LOCAL_DANGER_CHANCE) {
      this.state = RequestState.LocalDanger;
    } else {
      this.state = RequestState.Fire;
    }

    this.x = x;
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getState(): RequestState {
    return this.state;
  }

  public getStateString(): string {
    return this.state === RequestState.LocalDanger ? "LD" : "F";
  }
}