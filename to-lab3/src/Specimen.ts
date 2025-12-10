import SpecimenHealthyState from "./SpecimenHealthyState";
import SpecimenInfectedState from "./SpecimenInfectedState";
import SpecimenResistantState from "./SpecimenResistantState";
import type SpecimenState from "./SpecimenState";
import SpecimenSymptomaticState from "./SpecimenSymptomaticState";
import Vector2DPolar from "./Vector2DPolar";

export default class Specimen {
  private static counter: number = 0;

  private id: number;
  private x: number;
  private y: number;
  private state: SpecimenState;
  private vector: Vector2DPolar;

  constructor(x: number, y: number, angle: number) {
    this.id = Specimen.counter;
    this.x = x;
    this.y = y;
    this.vector = new Vector2DPolar(angle, Math.random() * 0.1);
    this.state = new SpecimenHealthyState();

    if (Math.random() < 0.1) {
      if (Math.random() > 0.5) {
        this.setState(new SpecimenInfectedState());
      } else {
        this.setState(new SpecimenSymptomaticState());
      }
    }

    Specimen.incrementCounter();
  }

  public fromJSON(x: number, y: number, angle: number, length: number, state: string) {
    this.x = x;
    this.y = y;
    this.vector = new Vector2DPolar(angle, length);

    switch(state) {
      case "infected":
        this.state = new SpecimenInfectedState();
        break;
      case "healthy":
        this.state = new SpecimenHealthyState();
        break;
      case "resistant":
        this.state = new SpecimenResistantState();
        break;
      case "symptomatic":
        this.state = new SpecimenSymptomaticState();
        break;
    }
  }

  public static incrementCounter() {
    this.counter++;
  }

  public getId(): number {
    return this.id;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getState(): SpecimenState {
    return this.state;
  }

  public setState(state: SpecimenState) {
    if (this.state.getName() === "resistant") {
      return;
    }

    if ((state.getName() === "infected" || state.getName() === "symptomatic")
      && (this.state.getName() === "resistant" || this.state.getName() === "symptomatic")) {
      return;
    }

    this.state = state;
  }

  public move() {
    this.x += this.vector.getX();
    this.y += this.vector.getY();

    if (Math.random() > 0.75) {
      this.setNewVector();
    }
  }

  public isInBorders(n: number, m: number) {
    return this.x > 0 && this.x < n && this.y > 0 && this.y < m;
  }

  public setNewVector() {
    this.vector = new Vector2DPolar(Math.random() * 2 * Math.PI, Math.random() * 0.1);
  }
}