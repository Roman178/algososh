import { interval, Subject } from "rxjs";
import { take } from "rxjs/operators";

export class Queue<T> {
  private _currentQueueSource = new Subject<T[]>();
  public currentQueue$ = this._currentQueueSource.asObservable();

  private _elements: T[] = new Array(6).fill({}, 0, 6);
  public tailIndex = -1;
  public headIndex = -1;

  public get elements() {
    return this._elements;
  }

  public get isEmpty() {
    return this.elements.length === 0;
  }

  public enqueue(el: { firstTick: T; secondTick: T; thirdTick: T }): void {
    if (this.headIndex === -1) {
      this.headIndex = 0;
    }
    if (this.headIndex > this.tailIndex) {
      this.tailIndex = this.headIndex;
    } else {
      this.tailIndex++;
    }

    this.elements.splice(this.tailIndex, 1, el.firstTick);

    interval(500)
      .pipe(take(2))
      .subscribe((value) => {
        if (value === 0) {
          this.elements.splice(this.tailIndex, 1, el.secondTick);
        } else {
          this.elements.splice(this.tailIndex, 1, el.thirdTick);
        }
        this._currentQueueSource.next(this.elements);
      });
  }

  public dequeue(el: { firstTick: T; secondTick: T }): void {
    this.elements.splice(this.headIndex, 1, el.firstTick);

    interval(500)
      .pipe(take(1))
      .subscribe(() => {
        this.elements.splice(this.headIndex, 1, el.secondTick);
        if (this.headIndex === this.tailIndex && this.headIndex !== -1) {
          this.tailIndex = -1;
        } else {
          this.headIndex++;
        }
        this._currentQueueSource.next(this.elements);
      });
  }

  public clear(): void {
    this._elements = new Array(6).fill({}, 0, 6);
    this.headIndex = -1;
    this.tailIndex = -1;
  }
}
