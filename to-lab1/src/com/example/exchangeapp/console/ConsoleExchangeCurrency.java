package com.example.exchangeapp.console;

import com.example.exchangeapp.Exchange;
import com.example.exchangeapp.ExchangeApp;
import com.example.exchangeapp.ExchangeRate;
import com.example.exchangeapp.ExchangeTable;
import java.util.Scanner;

public class ConsoleExchangeCurrency extends ConsoleInterface {
  public ConsoleExchangeCurrency() {
    parameter = "2";
    next = null;
  }

  @Override
  protected void handleConcrete() {
    Scanner scanner = new Scanner(System.in);

    System.out.println("Specify the code of the currency to exchange from");
    String fromInput = scanner.nextLine();
    System.out.println("Specify the code of the currency to exchange to");
    String toInput = scanner.nextLine();
    System.out.println("Specify the amount");
    String amountInput = scanner.nextLine();

    ExchangeTable table = ExchangeApp.getInstance().getTable();
    ExchangeRate from = table.getRate(fromInput);
    ExchangeRate to = table.getRate(toInput);
    double amount;

    try {
      amount = Double.parseDouble(amountInput.replace(',', '.'));
    } catch (Exception e) {
      System.out.println("Incorrect amount format");
      return;
    }

    if (from == null || to == null) {
      System.out.println("Incorrect currency code");
      return;     
    }

    System.out.println("Conversion from " + amount + from.getId() + " yields " + 
        Exchange.exchange(amount, from, to) + to.getId());
  }
}
