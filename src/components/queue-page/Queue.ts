export class Queue<T = {}> {
  private _elements: T[] = new Array(6).fill({}, 0, 6);
  public tailIndex = -1;
  public headIndex = -1;

  public get elements() {
    return this._elements;
  }

  public get isEmpty() {
    return this.headIndex === this.tailIndex;
  }

  public get head() {
    return this.headIndex;
  }

  public get tail() {
    return this.tailIndex;
  }

  public enqueue(el: T): void {
    if (this.headIndex === -1) {
      this.headIndex = 0;
    }
    if (this.headIndex > this.tailIndex) {
      this.tailIndex = this.headIndex;
    } else {
      this.tailIndex++;
    }

    this.elements.splice(this.tailIndex, 1, el);
  }

  public dequeue(): void {
    this.elements.splice(this.headIndex, 1, {} as T);
    if (this.isEmpty && this.headIndex !== -1) {
      this.tailIndex = -1;
    } else {
      this.headIndex++;
    }
  }

  public clear(): void {
    this._elements = new Array(6).fill({}, 0, 6);
    this.headIndex = -1;
    this.tailIndex = -1;
  }
}
