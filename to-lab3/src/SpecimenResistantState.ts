import type Specimen from "./Specimen";
import SpecimenState from "./SpecimenState";

export default class SpecimenResistantState extends SpecimenState {
  name = "resistant";

  public override handle(specimen: Specimen): void {
    return;
  }
}