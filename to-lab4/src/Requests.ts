import RequestIterator from "./RequestIterator";

export default class Requests {
  public getIterator() {
    return new RequestIterator();
  }
}