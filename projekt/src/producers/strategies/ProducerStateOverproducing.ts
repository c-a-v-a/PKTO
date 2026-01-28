import type ProducerState from "./ProducerStrategy";

export default class ProducerStrategyOverproducing implements ProducerState {
  adjustProduction(current: number): number {
    return current - Math.floor((Math.random() * 0.1 + 0.1) * current); 
  }
}