package com.example.vectors;

class Vector3DInheritance extends Vector2D {
  private double z;

  public Vector3DInheritance(double x, double y, double z) {
    super(x, y);

    this.z = z;
  }

  @Override
  public double[] getComponents() {
    double[] vec = super.getComponents();

    return new double[] {vec[0], vec[1], z};
  }

  public Vector3DInheritance cross(IVector param) {
    double[] first = getComponents();
    double[] vec = param.getComponents();
    double[] second;

    if (vec.length < 3) {
      second = new double[3];
      second[0] = vec[0];
      second[1] = vec[1];
      second[2] = 0;
    } else {
      second = vec;
    }

    return new Vector3DInheritance(
        (first[1] * second[2] - second[1] * first[2]),
        -1 * (first[0] * second[2] - second[0] * first[2]),
        (first[0] * second[1] - second[0] * first[1])
      );
  }
}
