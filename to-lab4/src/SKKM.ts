import Constants from "./Constants";
import Request from "./Request";
import RequestState from "./RequestState";
import type Strategy from "./Strategy";
import StrategyFire from "./StrategyFire";
import StrategyLocalDanger from "./StrategyLocalDanger";
import Unit from "./Unit";
import type UnitResponse from "./UnitResponse";

export default class SKKM {
  private strategy?: Strategy;
  private units: Unit[] = [];
  private requestQueue: Request[] = [];

  public constructor() {
    this.addObserver(new Unit("JRG-1", 50.06005228623131, 19.943127236434425, Constants.TRUCK_COUNT));
    this.addObserver(new Unit("JRG-2", 50.033537528025185, 19.935837168700054, Constants.TRUCK_COUNT));
    this.addObserver(new Unit("JRG-3", 50.07588593762735, 19.887345955209387, Constants.TRUCK_COUNT));
    this.addObserver(new Unit("JRG-4", 50.03782642661006, 20.005766197535944, Constants.TRUCK_COUNT));
    this.addObserver(new Unit("JRG-5", 50.092018031278926, 19.920027697538377, Constants.TRUCK_COUNT));
    this.addObserver(new Unit("JRG-6", 50.0160573055595, 20.015639068699144, Constants.TRUCK_COUNT));
    this.addObserver(new Unit("JRG-7", 50.09422957989656, 19.977393811030918, Constants.TRUCK_COUNT));
  }

  // Strategy
  private setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  // Observer
  private addObserver(unit: Unit) {
    this.units.push(unit);
  }

  private notifyAll(request: Request): UnitResponse[] {
    return this.units.map(unit => unit.update(request));
  }

  public async onNewRequest(request: Request) {
    console.log(`NEW REQUEST [${request.getStateString()}] AT ${request.getX()}, ${request.getY()}`);

    this.requestQueue.push(request);

    if (request.getState() === RequestState.LocalDanger) {
      this.setStrategy(new StrategyLocalDanger());
    } else {
      this.setStrategy(new StrategyFire());
    }

    const current = this.requestQueue.shift()!;
    const result = await this.strategy?.execute(this.notifyAll(current), current, this.units);

    if (!result) {
      this.requestQueue.push(current);
    }
  }

  public getUnits() {
    return this.units;
  }

  public getRequestQueue() {
    return this.requestQueue;
  }
}