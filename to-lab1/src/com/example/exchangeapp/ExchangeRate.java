package com.example.exchangeapp;

public class ExchangeRate {
  private double rate;
  private double multiplier;
  private String name;
  private String id;

  public ExchangeRate(double rate, double multiplier, String name, String id) {
    this.rate = rate;
    this.multiplier = multiplier;
    this.name = name;
    this.id = id;
  }

  public double getRate() {
    return rate;
  }

  public double getMultiplier() {
    return multiplier;
  }

  public String getName() {
    return name;
  }

  public String getId() {
    return id;
  }
}
