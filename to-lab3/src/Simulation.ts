import SimulationMemento from "./SimulationMemento";
import { SpawnPosition } from "./SpawnPosition";
import Specimen from "./Specimen";
import SpecimenResistantState from "./SpecimenResistantState";
import type SpecimenState from "./SpecimenState";

export default class Simulation {
  private n: number;
  private m: number;
  private i: number;

  private specimens: Specimen[] = [];
  private proximity: Record<string, number> = {};
  private sick: Record<string, number> = {};

  constructor(n: number, m: number, i: number) {
    this.n = n;
    this.m = m;
    this.i = i;

    for (let i = 0; i < this.i; i++) {
      const specimen =
        new Specimen(Math.random() * this.n, Math.random() * this.m, Math.random() * 2 * Math.PI)
      
      if (specimen.getState().getName() === "infected"
        || specimen.getState().getName() === "symptomatic") {
        this.sick[specimen.getId()] = 0;
      }

      this.specimens.push(specimen);
    }
  }

  public getN(): number {
    return this.n;
  }

  public getM(): number {
    return this.m;
  }

  public getI(): number {
    return this.i;
  }

  public getSpecimens(): Specimen[] {
    return this.specimens;
  }

  public spawnNewSpecimen() {
    for (let i = 0; i < this.i * 0.1; i++) {
      const spawnPosition: SpawnPosition = Math.floor(Math.random() * 4);
      let angle: number;

      switch (spawnPosition) {
        case SpawnPosition.LEFT:
          if (Math.random() > 0.5) {
            angle = Math.random() * 0.5 * Math.PI;
          } else {
            angle = Math.random() * 2 * Math.PI + 1.5 * Math.PI;
          }

          this.specimens.push(new Specimen(0, Math.random() * this.m, angle));
          break;
        case SpawnPosition.UP:
          angle = Math.random() * 2 * Math.PI + Math.PI;

          this.specimens.push(new Specimen(Math.random() * this.n, 0, angle));
          break;
        case SpawnPosition.RIGHT:
          angle = Math.random() * 1.5 * Math.PI + 0.5 * Math.PI;

          this.specimens.push(new Specimen(this.n, Math.random() * this.m, angle));
          break;
        case SpawnPosition.DOWN:
          angle = Math.random() * Math.PI;

          this.specimens.push(new Specimen(Math.random() * this.n, this.m, angle));
          break;
      }
    }
  }

  // Simulation
  public step(dt: number) {
    for (let i = 0; i < this.specimens.length; i++) {
      const specimen = this.specimens[i];

      specimen?.move();

      if (!specimen?.isInBorders(this.n, this.m)) {
        if (Math.random() > 0.5) {
          specimen?.setNewVector();
        } else {
          this.specimens.splice(i, 1);
        }
      }
    }

    for (let i = 0; i < this.specimens.length; i++) {
      const first = this.specimens[i] as Specimen;

      if (first.getState().getName() !== "infected"
        && first.getState().getName() !== "symptomatic") {
        continue;
      }

      for (let j = 0; j < this.specimens.length; j++) {
        if (i === j) {
          continue;
        }

        const second = this.specimens[j] as Specimen;

        const dx = first.getX() - second.getX();
        const dy = first.getY() - second.getY();

        const distance = Math.sqrt(dx * dx + dy * dy);
        const key = `${first.getId()}-${second.getId()}`;

        if (distance <= 2) {
          this.proximity[key] = (this.proximity[key] || 0) + dt;

          if (this.proximity[key] > 3000) {
            const prevState: SpecimenState = second.getState();

            first.getState().handle(second);

            if (
              prevState.getName() !== second.getState().getName() &&
              (second.getState().getName() === "infected" ||
              second.getState().getName() === "symptomatic")
            ) {
              this.sick[second.getId()] = 0;
            }
          }
        } else {
          delete this.proximity[key];
        }
      }
    }

    for (let key in this.sick) {
      this.sick[key]! += dt;
      
      if (Math.random() * 10000 + 20000 < this.sick[key]!) {
        const specimen = this.specimens.find(x => x.getId() === Number(key));
        specimen?.setState(new SpecimenResistantState());
        
        delete this.sick[key];
      }
    }
  }

  // Snapshots
  public snapshot(): SimulationMemento {
    const specimenCopy = JSON.parse(JSON.stringify(this.specimens));
    const proximityCopy = JSON.parse(JSON.stringify(this.proximity));
    const sickCopy = JSON.parse(JSON.stringify(this.sick));

    return new SimulationMemento(this.n, this.m, this.i, specimenCopy, proximityCopy, sickCopy);
  }

  public restore(snapshot: SimulationMemento) {
    console.log(snapshot);
    this.n = snapshot.n;
    this.m = snapshot.m;
    this.i = snapshot.i;
    this.specimens = snapshot.specimens;
    this.proximity = JSON.parse(JSON.stringify(snapshot.proximity));
    this.sick = JSON.parse(JSON.stringify(snapshot.sick));
  }
}