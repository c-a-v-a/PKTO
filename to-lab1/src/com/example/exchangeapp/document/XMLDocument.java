package com.example.exchangeapp.document;

import com.example.exchangeapp.ExchangeRate;
import com.example.exchangeapp.ExchangeTable;
import java.io.StringReader;
import java.time.LocalDate;
import java.util.HashMap;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element; 
import org.w3c.dom.NodeList; 
import org.xml.sax.InputSource;

public class XMLDocument implements ExchangeDocument {
  @Override
  public ExchangeTable getTable(String content) throws DocumentException {
    try {
      DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
      DocumentBuilder builder = factory.newDocumentBuilder();
      InputSource source = new InputSource(new StringReader(content));
      Document document = builder.parse(source);

      HashMap<String, ExchangeRate> rates = new HashMap<>();

      Element root = document.getDocumentElement();
      String id = root.getAttribute("uid");
      LocalDate timestamp = LocalDate.parse(
          root.getElementsByTagName("data_publikacji").item(0).getTextContent());
      NodeList list = root.getElementsByTagName("pozycja");

      for (int i = 0; i < list.getLength(); i++) {
        Element element = (Element) list.item(i);
        String key = element.getElementsByTagName("kod_waluty").item(0).getTextContent();
        String name = element.getElementsByTagName("nazwa_waluty").item(0).getTextContent();
        double multiplier = Double.parseDouble(
            element.getElementsByTagName("przelicznik").item(0).getTextContent().replace(',', '.'));
        double rate = Double.parseDouble(
            element.getElementsByTagName("kurs_sredni").item(0).getTextContent().replace(',', '.'));

        rates.put(key, new ExchangeRate(rate, multiplier, name, key));
      }

      return new ExchangeTable(id, timestamp, rates);
    } catch (Exception e) {
      throw new DocumentException("Could not create document.", e);
    }
  }
}
