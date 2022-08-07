import { ILettersToRender } from "./string.types";
import { ElementStates } from "../../types/element-states";

export class StringReverse {
  public first: number | null = null;
  public last: number | null = null;
  public copy: ILettersToRender[] = [];
  public circleLetters: ILettersToRender[] = [];

  public get isStringReversed() {
    return (
      (this.last as number) - 1 === this.first ||
      (this.last as number) - 2 === this.first ||
      this.first === this.last
    );
  }

  public generateCircleLetters(currentStr: string): ILettersToRender[] {
    this.circleLetters = currentStr.split("").map((letter, i, arr) => ({
      letter,
      state:
        i === 0 || i === arr.length - 1
          ? ElementStates.Changing
          : ElementStates.Default,
    }));

    this.copy = [...this.circleLetters];

    return this.circleLetters;
  }

  public setFirstAndLastOnTick(counter: number): void {
    if (this.circleLetters.length === 1) {
      this.first = counter;
      this.last = counter;
      return;
    }
    this.first = counter;
    this.last = this.circleLetters.length - 1 - this.first;
  }

  public getCurrentLetters(): ILettersToRender[] {
    const first = this.first as number;
    const last = this.last as number;

    if (!(this.first === 0 && this.last === 0 && this.first === this.last)) {
      this.copy[first + 1] = {
        ...this.copy[first + 1],
        state: ElementStates.Changing,
      };
      this.copy[last - 1] = {
        ...this.copy[last - 1],
        state: ElementStates.Changing,
      };
    }

    this.copy[first] = {
      ...this.circleLetters[last],
      state: ElementStates.Modified,
    };
    this.copy[last] = {
      ...this.circleLetters[first],
      state: ElementStates.Modified,
    };

    if (last - 2 === first) {
      this.copy[last - 1] = {
        ...this.copy[last - 1],
        state: ElementStates.Modified,
      };
    }

    return this.copy;
  }
}
