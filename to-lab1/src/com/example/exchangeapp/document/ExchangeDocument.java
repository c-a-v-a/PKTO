package com.example.exchangeapp.document;

import com.example.exchangeapp.ExchangeTable;

public interface ExchangeDocument {
  public ExchangeTable getTable(String content) throws DocumentException;
}
