import Request from "./Request";
import Unit from "./Unit";
import UnitResponse from "./UnitResponse";

export default interface Strategy {
  execute(responses: UnitResponse[], request: Request, units: Unit[]): Promise<boolean>;
}