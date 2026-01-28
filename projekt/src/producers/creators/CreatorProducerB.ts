import CoordinatesCollection from "../../coordinates/CoordinatesCollections";
import type Creator from "../../types/Creator";
import ProducerB from "../ProducerB";

export default class CreatorProducerB implements Creator<ProducerB> {
  create(name: string): ProducerB {
    const collection = CoordinatesCollection.getInstance();
    const coordinates = collection.createIterator().getNext();

    return new ProducerB(coordinates.getX(), coordinates.getY(), name);
  }
}