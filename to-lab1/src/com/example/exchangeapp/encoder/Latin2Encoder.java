package com.example.exchangeapp.encoder;

import java.nio.charset.Charset;

public class Latin2Encoder implements Encoder {
  public String encode(byte[] bytes) {
    return new String(bytes, Charset.forName("ISO-8859-2"));
  }
}
