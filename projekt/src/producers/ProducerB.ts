import DeliveryContract from "../DeliveryContract";
import Producer from "./Producer";
import ProducerStrategyOverproducing from "./strategies/ProducerStateOverproducing";
import ProducerStrategyUnderproducing from "./strategies/ProducerStateUnderproducing";
import ProducerStrategyOptimal from "./strategies/ProducerStrategyOptimal";

export default class ProducerB extends Producer {
  public constructor(x: number, y: number, name: string) {
    super(x, y, name);
    this.productionRate = Math.floor(this.productionRate);
  }

  public override produce(): void {
    this.stockpile = Math.min(this.stockpile + this.productionRate, 6 * this.productionRate);
  }

  public override weeklyUpdate(): void {
    if (this.stockpile > 2 * this.productionRate) {
      this.setStrategy(new ProducerStrategyOverproducing());
    } else if (this.stockpile < 0.5 * this.productionRate) {
      this.setStrategy(new ProducerStrategyUnderproducing());
    } else {
      this.setStrategy(new ProducerStrategyOptimal());
    }

    this.productionRate = this.strategy.adjustProduction(this.productionRate);

    if (this.productionRate > this.maxRate) {
      this.productionRate = this.maxRate;
    }

    if (this.productionRate < this.minRate || this.stockpile >= 6 * this.productionRate) {
      this.closed = true;
    }
  }

  public deliver(amount: number, time: number) {
    this.stockpile -= amount;

    return new DeliveryContract(this, amount, time);
  }
}