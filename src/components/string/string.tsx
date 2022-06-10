import React, { SyntheticEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { ILettersToRender } from "./string.types";

export const StringComponent: React.FC = () => {
  const [currentString, setCurrentString] = useState<string>("");
  const [currentLettersToRender, setCurrentLettersToRender] = useState<
    ILettersToRender[]
  >([]);
  const [isLoader, setIsLoader] = useState(false);

  function handleInput(e: SyntheticEvent<HTMLInputElement>) {
    setCurrentString(e.currentTarget.value);
  }

  function generateCircleLetters() {
    const circleLetters = currentString.split("").map((letter, i, arr) => ({
      letter,
      state:
        i === 0 || i === arr.length - 1
          ? ElementStates.Changing
          : ElementStates.Default,
    }));
    setCurrentLettersToRender(circleLetters);
    reverseLettersArray(circleLetters);
  }

  function reverseLettersArray(circleLetters: ILettersToRender[]) {
    setIsLoader(true);
    let copy = [...circleLetters];
    let counter = 0;

    const interval = setInterval(() => {
      const first = counter;
      const last = circleLetters.length - 1 - first;

      if (last - 1 === first || last - 2 === first) {
        clearInterval(interval);
        setIsLoader(false);
      }

      copy[first + 1] = { ...copy[first + 1], state: ElementStates.Changing };
      copy[last - 1] = { ...copy[last - 1], state: ElementStates.Changing };

      copy[first] = { ...circleLetters[last], state: ElementStates.Modified };
      copy[last] = { ...circleLetters[first], state: ElementStates.Modified };

      if (last - 2 === first) {
        copy[last - 1] = { ...copy[last - 1], state: ElementStates.Modified };
      }

      setCurrentLettersToRender([...copy]);
      counter++;
    }, 1000);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <Input maxLength={15} value={currentString} onInput={handleInput} />
        <Button
          isLoader={isLoader}
          text="Развернуть"
          onClick={generateCircleLetters}
        ></Button>
      </div>
      <div className={styles.circles}>
        {currentLettersToRender.map((letterData, i) => {
          return (
            <Circle
              key={i}
              letter={letterData.letter}
              state={letterData.state}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
