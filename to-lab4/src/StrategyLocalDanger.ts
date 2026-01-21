import Constants from "./Constants";
import Request from "./Request";
import type Strategy from "./Strategy";
import type Truck from "./Truck";
import type Unit from "./Unit";
import type UnitResponse from "./UnitResponse";

export default class StrategyLocalDanger implements Strategy {
  private trucksNeeded = 2;

  public async execute(responses: UnitResponse[], request: Request, units: Unit[]): Promise<boolean> {
    const sortedResponses = responses.sort((a, b) => a.getDistance() - b.getDistance());
    const selectedTrucks = this.selectTrucks(sortedResponses);
    const trucksString = this.getTrucksString(selectedTrucks);

    if (selectedTrucks.length < this.trucksNeeded) {
      return false;
    }

    for (const truck of selectedTrucks) {
      units
        .find(unit => truck.getName().startsWith(unit.getName()))
        ?.addRequest(request);

      truck.rollOut();
    }

    console.log(`TRUCKS ${trucksString} ROLL OUT`);

    await (new Promise(r => setTimeout(r, Math.random() * 3000)));

    console.log(`TRUCKS ${trucksString} ARRIVED`);

    if (Math.random() <= Constants.FALSE_ALARM_CHANCE) {
      console.log("FALSE ALARM");
    } else { 
      await (new Promise(r => setTimeout(r, Math.random() * (25000 - 5000) + 5000)));
      
      console.log("MISSION DONE");
    }

    await (new Promise(r => setTimeout(r, Math.random() * 3000)));

    for (const truck of selectedTrucks) {
      truck.goBack();
    }

    for (const unit of units) {
      if (unit.getRequests().includes(request)) {
        unit.getRequests().splice(unit.getRequests().indexOf(request), 1);
      }
    }

    console.log(`TRUCKS ${trucksString} WENT BACK`);

    return true;
  }
  
  private selectTrucks(responses: UnitResponse[]) {
    const selectedTrucks = [];

    for (const response of responses) {
      for (const truck of response.getAvailableTrucks()) {
        selectedTrucks.push(truck);

        if (selectedTrucks.length >= this.trucksNeeded) {
          return selectedTrucks;
        }
      }
    }

    return selectedTrucks;
  }

  private getTrucksString(trucks: Truck[]) {
    const names = trucks.map(truck => truck.getName());
    const str = names.join(" ");

    return `[${str}]`;
  }
}