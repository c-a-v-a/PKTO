package com.example.exchangeapp;

import com.example.exchangeapp.ExchangeRate;

public class Exchange {
  public static double exchange(double amount, ExchangeRate from, ExchangeRate to) {
    return amount * from.getRate() / from.getMultiplier() / to.getRate() * to.getMultiplier();
  }
}
