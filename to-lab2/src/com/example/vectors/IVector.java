package com.example.vectors;

interface IVector {
  public double abs();
  public double cdot(IVector param);
  public double[] getComponents();
}
