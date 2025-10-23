package com.example.exchangeapp;

import com.example.exchangeapp.document.XMLDocument;
import com.example.exchangeapp.encoder.Latin2Encoder;
import com.example.exchangeapp.repository.RestRepository;

public class Main {
  public static void main(String[] args) {
    RestRepository repository = new RestRepository();
    Latin2Encoder encoder = new Latin2Encoder();
    XMLDocument document = new XMLDocument();
    ExchangeApp app = ExchangeApp.getInstance();

    app.setRepository(repository);
    app.setEncoder(encoder);
    app.setDocument(document);

    app.run("http://static.nbp.pl/dane/kursy/xml/LastA.xml");
  }
}
