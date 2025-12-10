import SimulationMemento from "./SimulationMemento";
import Specimen from "./Specimen";

export default class SimulationHistory {
  private history: SimulationMemento[] = [];

  public add(snapshot: SimulationMemento) {
    this.history.push(snapshot);
  }

  public peek(): SimulationMemento | undefined {
    return this.history[this.history.length - 1];
  }

  public get(index: number): SimulationMemento | undefined {
    return this.history[index];
  }

  public getLength(): number {
    return this.history.length;
  }

  public toJSON(): string {
    return JSON.stringify(this.history, null, 2);
  }

  public fromJSON(json: string) {
    const parsed = JSON.parse(json);

    this.history = parsed.map((x: any) => {
      const specimens = x.specimens.map((spec: any) => {
        const specimen = new Specimen(0, 0, 0);
        specimen.fromJSON(spec.x, spec.y, spec.vector.angle, spec.vector.length, spec.state.name);
        return specimen;
      });

      return new SimulationMemento(x.n, x.m, x.i, x.t, specimens, x.proximity, x.sick);
    });
  }
}