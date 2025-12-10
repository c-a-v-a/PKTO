import type Specimen from "./Specimen";

export default class SimulationMemento {
  constructor(
    public readonly n: number,
    public readonly m: number,
    public readonly i: number,
    public readonly specimens: Specimen[],
    public readonly proximity: Record<string, number>,
    public readonly sick: Record<string, number>
  ) {}
}