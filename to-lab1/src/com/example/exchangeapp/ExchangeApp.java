package com.example.exchangeapp;

import com.example.exchangeapp.console.ConsoleMenu;
import com.example.exchangeapp.encoder.Encoder;
import com.example.exchangeapp.document.DocumentException;
import com.example.exchangeapp.document.ExchangeDocument;
import com.example.exchangeapp.repository.RemoteRepository;
import java.util.Scanner;

public class ExchangeApp {
  private static ExchangeApp instance;
  private ExchangeTable table;
  private RemoteRepository repository;
  private Encoder encoder;
  private ExchangeDocument document;

  private ExchangeApp() {}

  public static ExchangeApp getInstance() {
    if (instance == null) {
      instance = new ExchangeApp();
    }

    return instance;
  }

  public void setRepository(RemoteRepository repository) {
    this.repository = repository;
  }

  public void setEncoder(Encoder encoder) {
    this.encoder = encoder;
  }

  public void setDocument(ExchangeDocument document) {
    this.document = document;
  }

  public ExchangeTable getTable() {
    return table;
  }

  public void run(String url) {
    repository.get(url)
      .thenAccept(bytes -> {
        try {
          table = document.getTable(encoder.encode(bytes));
        } catch (Exception e) {
          System.err.println("Error. Could not obtain data.");
          System.err.println(e.getMessage());
          System.exit(1);
        }
      });

    ConsoleMenu menu = new ConsoleMenu();
    Scanner scanner = new Scanner(System.in);
    String userInput = new String();

    while (true) {
      try {
        menu.handle(userInput);
        userInput = scanner.nextLine();
        menu.handle(userInput);
        userInput = new String();
      } catch (Exception e) {
        userInput = new String();
        System.out.println("Please select a valid option.");
      }
    }
  }
}
