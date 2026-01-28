export default interface Creator<T> {
  create(name: string): T;
}