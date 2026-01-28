import ProducerA from "./producers/ProducerA";
import ProducerStrategyOverproducing from "./producers/strategies/ProducerStateOverproducing";
import ProducerStrategyUnderproducing from "./producers/strategies/ProducerStateUnderproducing";
import ProducerStrategyOptimal from "./producers/strategies/ProducerStrategyOptimal";

export default class Consumer {
  private static instance?: Consumer;

  private producer: ProducerA;
  private weeklyQuota: number;
  private deliveredProducts: number;
  private wasMet: boolean;

  private constructor() {
    this.producer = new ProducerA(500, 500, "PA-1");
    this.weeklyQuota = Math.floor(Math.random() * (100 - 25) + 25) * 7;
    this.deliveredProducts = 0;
    this.wasMet = false;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Consumer();
    }

    return this.instance;
  }

  public dialyUpdate() {
    this.producer.produce();
  }

  public weeklyUpdate() {
    this.deliveredProducts = this.producer.deliver(Math.min(this.weeklyQuota, this.producer.getStockpile()));

    if (this.deliveredProducts < this.weeklyQuota) {
      this.producer.setStrategy(new ProducerStrategyUnderproducing());
      this.wasMet = false;
    } else if (this.producer.getStockpile() > 0.2 * this.weeklyQuota) {
      this.producer.setStrategy(new ProducerStrategyOverproducing());
      this.wasMet = true;
    } else {
      this.producer.setStrategy(new ProducerStrategyOptimal());
      this.wasMet = true;
    }

    this.producer.weeklyUpdate();

    if (Math.random() > 0.5) {
      this.weeklyQuota = Math.floor(this.weeklyQuota + this.weeklyQuota * (Math.random() * 0.2 - 0.1));
    }
    
    this.deliveredProducts = 0;
  }

  public getProducer() {
    return this.producer;
  }

  public getQuota() {
    return this.weeklyQuota;
  }

  public getWasMet() {
    return this.wasMet;
  }
}