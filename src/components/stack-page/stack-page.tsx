import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../../utils/Stack";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { IStackCircle } from "./stack-page.types";

const stackInst = new Stack<IStackCircle>();

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
    stackInst.push({ letter: value, state: ElementStates.Changing });
    setStack([...stackInst.elements]);

    setTimeout(() => {
      stackInst.setByIndex(stackInst.size - 1, {
        letter: value,
        state: ElementStates.Default,
      });
      setStack([...stackInst.elements]);
      setBtnDisabled("");
    }, 500);
  }

  function pop() {
    setBtnDisabled("rmv");

    stackInst.setByIndex(stackInst.size - 1, {
      ...stackInst.elements[stackInst.size - 1],
      state: ElementStates.Changing,
    });
    setStack([...stackInst.elements]);
    setTimeout(() => {
      stackInst.pop();
      setStack([...stackInst.elements]);
      setBtnDisabled("");
    }, 500);
  }

  function clearStack() {
    stackInst.clear();
    setStack([...stackInst.elements]);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter as HTMLButtonElement;
    submitter.name === "add" ? push() : pop();
  }

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <Input
          maxLength={4}
          extraClass={styles.input}
          value={value}
          onChange={handleChange}
        />
        <Button
          type="submit"
          text="Добавить"
          name="add"
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "add"}
        />
        <Button
          type="submit"
          text="Удалить"
          name="rmv"
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "rmv"}
        />
        <Button text="Очистить" onClick={clearStack} disabled={!!btnDisabled} />
      </form>

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
