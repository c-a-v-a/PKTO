import type Specimen from "./Specimen";

export default abstract class SpecimenState {
  protected abstract name: string;

  public getName(): string {
    return this.name;
  }

  public abstract handle(specimen: Specimen): void;
}