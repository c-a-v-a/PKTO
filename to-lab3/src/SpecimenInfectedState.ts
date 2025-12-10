import type Specimen from "./Specimen";
import SpecimenState from "./SpecimenState";
import SpecimenSymptomaticState from "./SpecimenSymptomaticState";

export default class SpecimenInfectedState extends SpecimenState {
  protected override name: string = "infected";

  public override handle(specimen: Specimen): void {
    if (Math.random() > 0.5) {
      return;
    }

    if (Math.random() > 0.5) {
      specimen.setState(new SpecimenInfectedState());
    } else {
      specimen.setState(new SpecimenSymptomaticState());
    }
  }
}