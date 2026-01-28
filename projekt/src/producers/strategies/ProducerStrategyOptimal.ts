import type ProducerState from "./ProducerStrategy";

export default class ProducerStrategyOptimal implements ProducerState {
  adjustProduction(current: number): number {
    return current;
  }
}