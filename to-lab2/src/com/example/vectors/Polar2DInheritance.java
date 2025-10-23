package com.example.vectors;

class Polar2DInheritance extends Vector2D {
  public Polar2DInheritance(double x, double y) {
    super(x, y);
  }

  public double getAngle() {
    double[] vec = getComponents();

    return Math.atan2(vec[1], vec[0]);
  }
}
