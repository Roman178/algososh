export class Fibonacci {
  public getFibonacciNumbers(currNum: string): number[] {
    let first = 0;
    let second = 1;
    let next;
    const arr = [0, 1];

    for (let i = 1; i <= parseInt(currNum); i++) {
      next = first + second;
      arr.push(next);
      first = second;
      second = next;
    }

    return arr;
  }
}
