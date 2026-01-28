import type Producer from "./producers/Producer";

export default class DeliveryContract {
  private from: Producer;
  private amount: number;
  private time: number;

  public constructor(from: Producer, amount: number, time: number) {
    this.from = from;
    this.amount = amount;
    this.time = time;
  }

  public getFrom() {
    return this.from;
  }

  public getAmount() {
    return this.amount;
  }

  public getTime() {
    return this.time;
  }

  public tick() {
    this.time--;
  }
}