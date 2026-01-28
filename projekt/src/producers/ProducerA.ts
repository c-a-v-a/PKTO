import type DeliveryContract from "../DeliveryContract";
import CreatorProducerB from "./creators/CreatorProducerB";
import Producer from "./Producer";
import type ProducerB from "./ProducerB";
import ProducerStrategyUnderproducing from "./strategies/ProducerStateUnderproducing";

export default class ProducerA extends Producer {
  private subProducerCreator: CreatorProducerB;
  private subProducers: ProducerB[];
  private resourceBStockpile: number;
  private resourceBBottlenecks: number;
  private subProducerTracker = 3;
  private contracts: DeliveryContract[];

  public constructor(x: number, y: number, name: string) {
    super(x, y, name);

    this.minRate = 25;
    this.maxRate = 100;
    this.productionRate = Math.floor(Math.random() * (this.maxRate - this.minRate) + this.minRate);

    this.resourceBBottlenecks = 0;
    this.resourceBStockpile = 0;
    this.subProducers = [];
    this.subProducerCreator = new CreatorProducerB();

    this.subProducers.push(this.subProducerCreator.create("PB-1"));
    this.subProducers.push(this.subProducerCreator.create("PB-2"));
    this.subProducers.push(this.subProducerCreator.create("PB-3"));

    this.contracts = [];
  }

  public override produce(): void {
    this.notifyAll();

    const sorted = this.subProducers
      .filter(producer => !producer.isClosed())
      .sort((a, b) => {
        return b.getProductionRate() - a.getProductionRate() || this.getTime(a) - this.getTime(b)
      });

    this.recieveContracts();
    this.makeContracts(sorted);

    if (this.resourceBStockpile < this.productionRate) {
      this.resourceBBottlenecks++;
      this.stockpile += this.resourceBStockpile;
      this.resourceBStockpile = 0;
    } else {
      this.stockpile += this.productionRate;
      this.resourceBStockpile -= this.productionRate;
    }
  }

  public override weeklyUpdate(): void {
    this.subProducers = this.subProducers.filter(producer => !producer.isClosed());

    this.productionRate = this.strategy.adjustProduction(this.productionRate);

    if (this.resourceBBottlenecks > 0 && this.strategy instanceof ProducerStrategyUnderproducing) {
      this.subProducerTracker++;
      this.subProducers.push(this.subProducerCreator.create(`PB-${this.subProducerTracker}`));
    }

    for (const p of this.subProducers) {
      p.weeklyUpdate();
    }

    this.resourceBBottlenecks = 0;
  }

  private notifyAll() {
    for (const p of this.subProducers) {
      p.produce();
    }

    for (const c of this.contracts) {
      c.tick();
    }
  }

  private makeContracts(producers: ProducerB[]) {
    let goal = Math.floor(1.1 * this.productionRate);

    for (const producer of producers) {
      const amount = Math.min(goal, producer.getStockpile());

      this.contracts.push(producer.deliver(amount, this.getTime(producer)));

      goal -= amount;

      if (goal <= 0) {
        break;
      }
    }
  }

  private recieveContracts() {
    for (const contract of this.contracts) {
      if (contract.getTime() <= 0) {
        this.resourceBStockpile += contract.getAmount();
      }
    }

    this.contracts = this.contracts.filter(contract => contract.getTime() > 0);
  };

  private getTime(to: Producer) {
    const distance = Math.sqrt((this.x - to.getX()) ** 2 + (this.y - to.getY()) ** 2);

    return Math.floor(distance / 100) + 1;
  }

  public deliver(amount: number) {
    this.stockpile -= amount;

    return amount;
  }

  public getSubproducers() {
    return this.subProducers;
  }

  public getContracts() {
    return this.contracts;
  }

  public getStockpileB(): number {
    return this.resourceBStockpile;
  }
}