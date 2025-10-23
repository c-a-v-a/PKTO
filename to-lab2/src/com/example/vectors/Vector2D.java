package com.example.vectors;

class Vector2D implements IVector {
  private double x;
  private double y;

  public Vector2D(double x, double y) {
    this.x = x;
    this.y = y;
  }

  @Override
  public double abs() {
    double[] vec = getComponents();
    double result = 0;

    for (int i = 0; i < vec.length; i++) {
      result += vec[i] * vec[i];
    }

    return Math.sqrt(result);
  }

  @Override
  public double cdot(IVector param) {
    double[] first = getComponents();
    double[] second = param.getComponents();
    double result = 0;

    for (int i = 0; i < Math.max(first.length, second.length); i++) {
      double x = i < first.length ? first[i] : 0;
      double y = i < second.length ? second[i] : 0;

      result += x * y;
    }

    return result;
  }

  @Override
  public double[] getComponents() {
    return new double[] {x, y};
  }
}
