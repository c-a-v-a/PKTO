import type ProducerStrategy from "./strategies/ProducerStrategy";
import ProducerStrategyOptimal from "./strategies/ProducerStrategyOptimal";

export default abstract class Producer {
  protected x: number;
  protected y: number;
  protected productionRate: number;
  protected stockpile: number;
  protected strategy: ProducerStrategy;
  protected name: string;
  protected closed: boolean;

  protected maxRate = 25;
  protected minRate = 10;

  constructor(x: number, y: number, name: string) {
    this.x = x;
    this.y = y;
    this.productionRate = Math.floor(Math.random() * (this.maxRate - this.minRate) + this.minRate);
    this.stockpile = 0;
    this.strategy = new ProducerStrategyOptimal();
    this.name = name;
    this.closed = false;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public getStockpile() {
    return this.stockpile;
  }

  public getProductionRate() {
    return this.productionRate;
  }

  public getName() {
    return this.name;
  }

  public isClosed() {
    return this.closed;
  }

  public abstract produce(): void;

  public abstract weeklyUpdate(): void;

  public setStrategy(strategy: ProducerStrategy) {
    this.strategy = strategy;
  }
}