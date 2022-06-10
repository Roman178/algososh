import React, { SyntheticEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

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

  function renderFibNums() {
    setIsLoader(true);
    const arr: number[] = [];

    const interval = setInterval(() => {
      if (arr.length.toString() === currentNum) {
        clearInterval(interval);
        setIsLoader(false);
      }

      if (arr.length === 0 || arr.length === 1) {
        arr.push(1);
      } else {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
      }

      setFibNums([...arr]);
    }, 500);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <Input value={currentNum} onInput={handleInput} />
        <Button
          isLoader={isLoader}
          onClick={renderFibNums}
          text="Рассчитать"
          disabled={isBtnDisabled}
        ></Button>
      </div>
      <p>Максимальное число - 19</p>
      <div className={styles.circles}>
        {fibNums.map((num, i) => {
          return <Circle key={i} tail={i.toString()} letter={num.toString()} />;
        })}
      </div>
    </SolutionLayout>
  );
};
