import type Specimen from "./Specimen";
import SpecimenState from "./SpecimenState";

export default class SpecimenHealthyState extends SpecimenState {
  protected override name: string = "healthy";

  public override handle(specimen: Specimen): void {
    return;
  }
}