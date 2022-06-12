class LinkedListNode<T> {
  public value;
  public next;

  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  public head: null | LinkedListNode<string> = null;
  public tail: null | LinkedListNode<string> = null;

  public get arrayedList() {
    return this.toArray();
  }

  constructor(initArr: any[]) {
    this.head = this._toLinkedList(initArr);
    this.tail = this._findTail();
  }

  private _toLinkedList(arr: any[]) {
    return arr
      .reverse()
      .reduce((acc, curr) => new LinkedListNode(curr, acc), null);
  }

  private _findTail() {
    if (!this.head) {
      return null;
    }
    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
    return null;
  }

  public prepend(value: string) {
    let newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) this.tail = newNode;
  }

  public append(value: string) {
    let newNode = new LinkedListNode(value);
    if (this.tail) this.tail.next = newNode;
    this.tail = newNode;

    if (!this.head) this.head = newNode;
  }

  private _getByIndex(index: number) {
    let counter = 0;
    let node = this.head;

    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }

  public addByIndex(value: string, index: number) {
    if (!this.head) {
      this.head = new LinkedListNode(value);
      return;
    }
    if (index === 0) {
      this.head = new LinkedListNode(value, this.head);
      return;
    }
    const previous: any = this._getByIndex(index - 1) || this._findTail();
    const node = new LinkedListNode(value, previous?.next);
    previous.next = node;
  }

  public deleteByIndex(index: number) {
    if (!this.head) {
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    const prev = this._getByIndex(index - 1);
    if (!prev || !prev.next) {
      return;
    }
    prev.next = prev.next.next;
  }

  public deleteHead() {
    if (!this.head) return null;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
  }

  public deleteTail() {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }

    let current = this.head;
    while (current?.next) {
      if (!current.next.next) {
        current.next = null;
      } else {
        current = current.next;
      }
    }

    this.tail = current;
  }

  public toArray() {
    let curr = this.head;
    let arr = [this.head?.value];

    while (curr?.next) {
      curr = curr?.next;
      arr.push(curr?.value);
    }

    return arr;
  }
}
