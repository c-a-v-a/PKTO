package com.example.exchangeapp.console;

public class ConsoleMenu extends ConsoleInterface {
  public ConsoleMenu() {
    parameter = new String();
    next = new ConsoleExit();
  }

  @Override
  protected void handleConcrete() {
    System.out.println("Exchange app");
    System.out.println("[1] Display currency table");
    System.out.println("[2] Exchange currency");
    System.out.println("[0] Exit");
  }
}
