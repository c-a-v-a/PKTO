import type Iterator from "./Iterator";

export default interface Collection<T> {
  createIterator(): Iterator<T>;
}