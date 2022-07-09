import React, { SyntheticEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ILettersToRender } from "./string.types";
import { StringReverse } from "./StringReverse";

const stringReverse = new StringReverse();

export const StringComponent: React.FC = () => {
  const [currentString, setCurrentString] = useState<string>("");
  const [currentLettersToRender, setCurrentLettersToRender] = useState<
    ILettersToRender[]
  >([]);
  const [isLoader, setIsLoader] = useState(false);

  function handleInput(e: SyntheticEvent<HTMLInputElement>) {
    setCurrentString(e.currentTarget.value);
  }

  function reverseString(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentString) return;
    setIsLoader(true);

    let counter = 0;
    const circleLetters = stringReverse.generateCircleLetters(currentString);
    setCurrentLettersToRender(circleLetters);
    
    const interval = setInterval(() => {
      stringReverse.setFirstAndLastOnTick(counter);

      setCurrentLettersToRender([...stringReverse.getCurrentLetters()]);
      
      counter++;

      if (stringReverse.isStringReversed) {
        clearInterval(interval);
        setIsLoader(false);
      }
    }, 1000);
  }

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={reverseString} className={styles.wrapper}>
        <Input maxLength={15} value={currentString} onInput={handleInput} />
        <Button
          type="submit"
          isLoader={isLoader}
          disabled={!currentString}
          text="Развернуть"
        ></Button>
      </form>
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
