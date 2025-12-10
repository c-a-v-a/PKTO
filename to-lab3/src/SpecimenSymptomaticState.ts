import type Specimen from "./Specimen";
import SpecimenInfectedState from "./SpecimenInfectedState";
import SpecimenState from "./SpecimenState";

export default class SpecimenSymptomaticState extends SpecimenState {
  protected override name: string = "symptomatic";

  public override handle(specimen: Specimen): void {
    if (Math.random() > 0.5) {
      specimen.setState(new SpecimenInfectedState());
    } else {
      specimen.setState(new SpecimenSymptomaticState());
    }
  }
}