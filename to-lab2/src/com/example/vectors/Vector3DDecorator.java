package com.example.vectors;

class Vector3DDecorator implements IVector {
  private IVector srcVector;
  private double z;

  public Vector3DDecorator(IVector srcVector, double z) {
    this.srcVector = srcVector;
    this.z = z;
  }

  public IVector getSrcVector() {
    return srcVector;
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
    double[] vec = srcVector.getComponents();

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
