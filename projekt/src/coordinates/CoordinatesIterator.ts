import type Iterator from "../types/Iterator";
import Coordinates from "./Coordinates";

export default class CoordinatesIterator implements Iterator<Coordinates> {
  private maxX = 1000;
  private maxY = 1000;

  hasNext(): boolean {
    return true;
  }

  getNext(): Coordinates {
    return new Coordinates(this.maxX, this.maxY);
  }
}