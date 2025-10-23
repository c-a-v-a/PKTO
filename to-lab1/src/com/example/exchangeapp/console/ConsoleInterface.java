package com.example.exchangeapp.console;

abstract class ConsoleInterface {
  protected String parameter;
  protected ConsoleInterface next;

  public void handle(String param) throws ConsoleInterfaceException {
    if (checkCondition(param)) {
      handleConcrete();
    } else if (next != null) {
      next.handle(param);
    } else {
      throw new ConsoleInterfaceException();
    }
  }

  protected boolean checkCondition(String condition) {
    return parameter.equals(condition);
  }

  protected abstract void handleConcrete();
}
