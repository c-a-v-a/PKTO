package com.example.exchangeapp.repository;

import java.lang.RuntimeException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

public class RestRepository implements RemoteRepository {
  private HttpClient httpClient;

  public RestRepository() {
    httpClient = HttpClient.newHttpClient();
  }

  public CompletableFuture<byte[]> get(String url) {
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(url))
      .GET()
      .build();

    return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofByteArray())
      .thenApply(HttpResponse::body)
      .exceptionally(ex -> {
        throw new RuntimeException(ex);
      });
  }
}
