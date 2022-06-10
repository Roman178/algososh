import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { IQueueItem } from "./queue-page.types";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [queue, setQueue] = useState<IQueueItem[]>(Array(6).fill({}, 0, 6));
  const [headIndex, setHeadIndex] = useState(-1);
  const [tailIndex, setTailIndex] = useState(-1);
  const [tailIsShown, setTailIsShown] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState<"" | "add" | "rmv">("");

  function enqueue() {
    if (tailIndex === queue.length - 1) return;
    setBtnDisabled("add");
    const copy = [...queue];

    if (!tailIsShown) {
      copy[tailIndex] = { letter: value, state: ElementStates.Changing };
      setTailIsShown(true);
      setQueue([...copy]);

      setTimeout(() => {
        copy[tailIndex] = { ...copy[tailIndex], state: ElementStates.Default };
        setQueue([...copy]);
        setBtnDisabled("");
      }, 500);

      return;
    }

    copy[tailIndex + 1] = {
      ...copy[tailIndex + 1],
      state: ElementStates.Changing,
    };

    setTimeout(() => {
      copy[tailIndex + 1] = {
        ...copy[tailIndex + 1],
        state: ElementStates.Default,
      };
      setQueue([...copy]);
      setBtnDisabled("");
    }, 500);

    setTailIndex(tailIndex + 1);
    copy[tailIndex + 1] = { ...copy[tailIndex + 1], letter: value };
    if (headIndex === -1) {
      setHeadIndex(headIndex + 1);
    }

    setQueue([...copy]);
  }

  function dequeue() {
    if (tailIndex === -1) return;
    setBtnDisabled("rmv");
    const copy = [...queue];

    if (tailIndex === headIndex) {
      if (!tailIsShown) return;
      copy[headIndex] = { ...copy[headIndex], state: ElementStates.Changing };
      setQueue([...copy]);

      setTimeout(() => {
        copy[headIndex] = { letter: "", state: ElementStates.Default };
        setTailIsShown(false);
        setQueue([...copy]);
        setBtnDisabled("");
      }, 500);

      return;
    }

    copy[headIndex] = { ...copy[headIndex], state: ElementStates.Changing };
    setQueue([...copy]);

    setTimeout(() => {
      copy[headIndex] = { letter: "", state: ElementStates.Default };
      setHeadIndex(headIndex + 1);
      setQueue([...copy]);
      setBtnDisabled("");
    }, 500);
  }

  function clearQueue() {
    setHeadIndex(-1);
    setTailIndex(-1);
    setTailIsShown(true);
    setQueue(Array(6).fill({}, 0, 6));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <Input
          value={value}
          onChange={handleChange}
          extraClass={styles.input}
        />
        <Button
          text="Добавить"
          onClick={enqueue}
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "add"}
        />
        <Button
          text="Удалить"
          onClick={dequeue}
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "rmv"}
        />
        <Button text="Очистить" onClick={clearQueue} disabled={!!btnDisabled} />
      </div>
      <div className={styles.queue}>
        {queue.length > 0 &&
          queue.map((el, i) => {
            return (
              <Circle
                key={i}
                state={el.state}
                letter={el.letter}
                head={`${i === headIndex ? "head" : ""}`}
                tail={`${i === tailIndex && tailIsShown ? "tail" : ""}`}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
