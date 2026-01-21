import Constants from "./Constants";
import Request from "./Request";

export default class RequestIterator {
  public next(): Request {
    return new Request(
      Math.random() * (Constants.MAX_X - Constants.MIN_X) + Constants.MIN_X,
      Math.random() * (Constants.MAX_Y - Constants.MIN_Y) + Constants.MIN_Y
    );
  }
}