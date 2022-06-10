import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { IStackCircle } from "./stack-page.types";

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<IStackCircle[]>([]);
  const [value, setValue] = useState("");
  const [btnDisabled, setBtnDisabled] = useState<"" | "add" | "rmv">("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function push() {
    if (!value) return;
    setBtnDisabled("add");
    const clone = [...stack];
    clone.push({ letter: value, state: ElementStates.Changing });
    setStack([...clone]);

    setTimeout(() => {
      clone[clone.length - 1] = { letter: value, state: ElementStates.Default };
      setStack([...clone]);
      setBtnDisabled("");
    }, 500);
  }

  function pop() {
    setBtnDisabled("rmv");
    const clone = [...stack];
    clone[clone.length - 1] = {
      ...clone[clone.length - 1],
      state: ElementStates.Changing,
    };
    setStack([...clone]);

    setTimeout(() => {
      clone.pop();
      setStack([...clone]);
      setBtnDisabled("");
    }, 500);
  }

  function clearStack() {
    setStack([]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <Input
          maxLength={4}
          extraClass={styles.input}
          value={value}
          onChange={handleChange}
        />
        <Button
          text="Добавить"
          onClick={push}
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "add"}
        />
        <Button
          text="Удалить"
          onClick={pop}
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "rmv"}
        />
        <Button text="Очистить" onClick={clearStack} disabled={!!btnDisabled} />
      </div>

      <div className={styles.stack}>
        {stack.length > 0 &&
          stack.map((el, i) => {
            return (
              <Circle
                key={i}
                state={el.state}
                letter={el.letter}
                head={`${i === stack.length - 1 ? "top" : ""}`}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
