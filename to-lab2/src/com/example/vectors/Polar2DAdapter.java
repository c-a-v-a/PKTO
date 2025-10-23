package com.example.vectors;

class Polar2DAdapter implements IPolar2D, IVector {
  private Vector2D srcVector;

  public Polar2DAdapter(Vector2D srcVector) {
    this.srcVector = srcVector;
  }

  @Override
  public double getAngle() {
    double[] vec = getComponents();

    return Math.atan2(vec[1], vec[0]);
  }

  @Override
  public double abs() {
    return srcVector.abs();
  }

  @Override
  public double cdot(IVector param) {
    return srcVector.cdot(param);
  }

  @Override
  public double[] getComponents() {
    return srcVector.getComponents();
  }
}
