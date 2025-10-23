package com.example.exchangeapp;

import com.example.exchangeapp.ExchangeRate;
import java.util.HashMap;
import java.time.LocalDate;

public class ExchangeTable {
  private String id;
  private LocalDate timestamp;
  private HashMap<String, ExchangeRate> rates;

  public ExchangeTable(String id, LocalDate timestamp, HashMap<String, ExchangeRate> rates) {
    this.id = id;
    this.timestamp = timestamp;
    this.rates = rates;
  }

  public HashMap<String, ExchangeRate> getRates() {
    return rates;
  }

  public ExchangeRate getRate(String code) {
    return rates.get(code);
  }
}
