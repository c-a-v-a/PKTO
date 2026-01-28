export default interface ProducerStrategy {
  adjustProduction(current: number): number;
}