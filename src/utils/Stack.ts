export class Stack<T> {
  private _elements: T[] = [];

  public get elements() {
    return this._elements;
  }

  public get size() {
    return this.elements.length;
  }

  public push(el: T): void {
    this._elements.push(el);
  }

  public pop() {
    this._elements.pop();
  }

  public clear() {
    this._elements = [];
  }

  public setByIndex(index: number, el: T) {
    this._elements[index] = el;
  }
}
