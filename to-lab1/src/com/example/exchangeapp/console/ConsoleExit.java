package com.example.exchangeapp.console;

import com.example.exchangeapp.ExchangeApp;

public class ConsoleExit extends ConsoleInterface {
  public ConsoleExit() {
    parameter = "0";
    next = new ConsoleDisplayTable();
  }

  @Override
  protected void handleConcrete() {
    System.exit(0);
  }
}
