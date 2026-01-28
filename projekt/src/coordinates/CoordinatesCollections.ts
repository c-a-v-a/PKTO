import type Collection from "../types/Collection";
import type Iterator from "../types/Iterator";
import Coordinates from "./Coordinates";
import CoordinatesIterator from "./CoordinatesIterator";

export default class CoordinatesCollection implements Collection<Coordinates> {
  private static instance?: CoordinatesCollection;

  private constructor() {}

  public static getInstance(): CoordinatesCollection {
    if (!this.instance) {
      this.instance = new CoordinatesCollection();
    }

    return this.instance;
  }

  createIterator(): Iterator<Coordinates> {
    return new CoordinatesIterator();
  }
}