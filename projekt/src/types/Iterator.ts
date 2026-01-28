export default interface Iterator<T> {
  getNext(): T;
  hasNext(): boolean;
}