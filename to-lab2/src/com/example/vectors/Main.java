package com.example.vectors;

public class Main {
  public static void main(String[] args) {
    Vector2D v1 = new Vector2D(2, 3);
    Polar2DInheritance v2 = new Polar2DInheritance(2, 1);
    Vector3DInheritance v3 = new Vector3DInheritance(1, 4, 3);

    System.out.println("=== COORDINATES ===");
    System.out.println("--- V1 ---");
    printCoords(v1.getComponents());
    System.out.println("--- V2 ---");
    printCoords(v2.getComponents());
    System.out.println("--- V3 ---");
    printCoords(v3.getComponents());
    System.out.println();

    System.out.println("=== POLAR COORDINATES ===");
    System.out.println("--- V1 ---");
    System.out.println("(" + v1.abs() + ", " + new Polar2DAdapter(v1).getAngle() + "rad)");
    System.out.println("--- V2 ---");
    System.out.println("(" + v2.abs() + ", " + v2.getAngle() + "rad)");
    System.out.println("--- V3 ---");
    System.out.println("(" + v3.abs() + ", " + new Polar2DAdapter(v3).getAngle() + "rad)");
    System.out.println();

    System.out.println("=== DOT PRODUCT ===");
    System.out.println("--- V1 * V2---");
    System.out.println(v1.cdot(v2));
    System.out.println("--- V1 * V3---");
    System.out.println(v1.cdot(v3));
    System.out.println("--- V2 * V3---");
    System.out.println(v2.cdot(v3));
    System.out.println();

    System.out.println("=== CROSS PRODUCT ===");
    System.out.println("--- V1 * V2---");
    printCoords(new Vector3DDecorator(v1, 0).cross(new Vector3DDecorator(v2, 0)).getComponents());
    System.out.println("--- V2 * V1---");
    printCoords(new Vector3DDecorator(v2, 0).cross(new Vector3DDecorator(v1, 0)).getComponents());
    System.out.println("--- V1 * V3---");
    printCoords(new Vector3DDecorator(v1, 0).cross(v3).getComponents());
    System.out.println("--- V3 * V1---");
    printCoords(v3.cross(new Vector3DDecorator(v1, 0)).getComponents());
    System.out.println("--- V2 * V3---");
    printCoords(new Vector3DDecorator(v2, 0).cross(v3).getComponents());
    System.out.println("--- V3 * V2---");
    printCoords(v3.cross(new Vector3DDecorator(v2, 0)).getComponents());
    System.out.println();
  }

  public static void printCoords(double[] coords) {
    String[] axes = {"X", "Y", "Z"};
    StringBuilder line = new StringBuilder();

    for (int i = 0; i < coords.length; i++) {
      line.append(axes[i]);
      line.append(": ");
      line.append(coords[i]);
      line.append(", ");
    }

    System.out.println(line);
  }
}
