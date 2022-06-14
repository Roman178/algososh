import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./Queue";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { IQueueItem } from "./queue-page.types";

const queueInst = new Queue<IQueueItem>();

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [queue, setQueue] = useState<IQueueItem[]>(Array(6).fill({}, 0, 6));
  const [headIndex, setHeadIndex] = useState(-1);
  const [tailIndex, setTailIndex] = useState(-1);
  const [btnDisabled, setBtnDisabled] = useState<"" | "enqueue" | "dequeue">(
    ""
  );

  function enqueue() {
    if (
      tailIndex === queue.length - 1 ||
      headIndex === queue.length - 1 ||
      !value
    ) {
      return;
    }
    setBtnDisabled("enqueue");
    queueInst.enqueue({ state: ElementStates.Default, letter: value });

    let arr = [...queue];
    arr[tailIndex + 1] = { letter: "", state: ElementStates.Changing };
    setQueue([...arr]);

    setTimeout(() => {
      setTailIndex(queueInst.tail);
      setHeadIndex(queueInst.head);
      arr = [...queueInst.elements];
      arr[tailIndex + 1] = {
        ...arr[tailIndex + 1],
        state: ElementStates.Changing,
      };
      setQueue([...arr]);
      setTimeout(() => {
        setQueue([...queueInst.elements]);
        setBtnDisabled("");
      }, 500);
    }, 500);
  }

  function dequeue() {
    if (tailIndex === -1) return;
    queueInst.dequeue();
    setBtnDisabled("dequeue");

    let arr = [...queue];
    arr[headIndex] = { ...arr[headIndex], state: ElementStates.Changing };
    setQueue([...arr]);

    setTimeout(() => {
      setQueue([...queueInst.elements]);
      setHeadIndex(queueInst.head);
      setTailIndex(queueInst.tail);
      setBtnDisabled("");
    }, 500);
  }

  function clearQueue() {
    queueInst.clear();
    setQueue([...queueInst.elements]);
    setHeadIndex(queueInst.head);
    setTailIndex(queueInst.tail);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const submitter = e.nativeEvent.submitter as HTMLButtonElement;
    submitter.name === "enqueue" ? enqueue() : dequeue();
  }

  return (
    <SolutionLayout title="Очередь">
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <Input
          value={value}
          onChange={handleChange}
          extraClass={styles.input}
          maxLength={4}
        />
        <Button
          type="submit"
          text="Добавить"
          name="enqueue"
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "enqueue"}
        />
        <Button
          type="submit"
          text="Удалить"
          name="dequeue"
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "dequeue"}
        />
        <Button text="Очистить" onClick={clearQueue} disabled={!!btnDisabled} />
      </form>
      <div className={styles.queue}>
        {queue.length > 0 &&
          queue.map((el, i) => {
            return (
              <Circle
                key={i}
                index={i}
                state={el.state}
                letter={el.letter}
                head={`${i === headIndex ? "head" : ""}`}
                tail={`${i === tailIndex ? "tail" : ""}`}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
