import type ProducerState from "./ProducerStrategy";

export default class ProducerStrategyUnderproducing implements ProducerState {
  adjustProduction(current: number): number {
    return Math.floor(current + (Math.random() * 0.1 + 0.1) * current);
  }
}