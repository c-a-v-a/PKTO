package com.example.exchangeapp.console;

import com.example.exchangeapp.ExchangeApp;
import com.example.exchangeapp.ExchangeRate;
import com.example.exchangeapp.ExchangeTable;

public class ConsoleDisplayTable extends ConsoleInterface {
  public ConsoleDisplayTable() {
    parameter = "1";
    next = new ConsoleExchangeCurrency();
  }

  @Override
  protected void handleConcrete() {
    ExchangeTable table = ExchangeApp.getInstance().getTable();

    if (table == null) {
      System.out.println("Sorry. It seems like there was a problem with downloading your data.");
      return;
    }

    System.out.println("CODE - NAME - RATE - MULTIPLIER");

    for (ExchangeRate value : table.getRates().values()) {
      System.out.println(
          value.getId() + " - " + 
          value.getName() + " - " + 
          value.getRate() + " - " + 
          value.getMultiplier() + " - ");
    }
  }
}
