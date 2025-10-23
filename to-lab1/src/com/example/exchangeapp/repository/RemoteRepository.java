package com.example.exchangeapp.repository;

import java.util.concurrent.CompletableFuture;

public interface RemoteRepository {
  public CompletableFuture<byte[]> get(String url);
}
