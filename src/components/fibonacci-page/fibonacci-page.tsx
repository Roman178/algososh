import React, { SyntheticEvent, useState } from "react";
import { Fibonacci } from "../../utils/Fibonacci";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

const fibonacci = new Fibonacci();

export const FibonacciPage: React.FC = () => {
  const [fibNums, setFibNums] = useState<number[]>([]);
  const [currentNum, setCurrentNum] = useState<string>("");
  const [isLoader, setIsLoader] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  function handleInput(e: SyntheticEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setCurrentNum(value);
    if (isNaN(parseInt(value)) || parseInt(value) > 19) {
      setIsBtnDisabled(true);
    } else {
      setIsBtnDisabled(false);
    }
  }

  function renderFibNums(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoader(true);

    const fibNums = fibonacci.getFibonacciNumbers(currentNum);
    const arr: number[] = [];
    let counter = 0;

    const interval = setInterval(() => {
      if (fibNums.length - 1 === arr.length) {
        clearInterval(interval);
        setIsLoader(false);
        return;
      }
      arr.push(fibNums[counter]);
      setFibNums([...arr]);
      counter++;
    }, 500);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={renderFibNums} className={styles.wrapper}>
        <Input value={currentNum} onInput={handleInput} />
        <Button
          type="submit"
          isLoader={isLoader}
          text="Рассчитать"
          disabled={isBtnDisabled}
        ></Button>
      </form>
      <p>Максимальное число - 19</p>
      <div className={styles.circles}>
        {fibNums.map((num, i) => {
          return <Circle key={i} tail={i.toString()} letter={num.toString()} />;
        })}
      </div>
    </SolutionLayout>
  );
};
