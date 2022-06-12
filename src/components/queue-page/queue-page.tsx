import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Queue } from "../../utils/Queue";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { IQueueItem } from "./queue-page.types";
import { take } from "rxjs/operators";

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

    queueInst.enqueue({
      firstTick: { state: ElementStates.Changing, letter: "" },
      secondTick: { state: ElementStates.Changing, letter: value },
      thirdTick: { state: ElementStates.Default, letter: value },
    });

    setQueue(queueInst.elements);
    setTailIndex(queueInst.tailIndex);
    setHeadIndex(queueInst.headIndex);

    let counter = 0;
    queueInst.currentQueue$.pipe(take(2)).subscribe((currQueue: any) => {
      setQueue([...currQueue]);
      setTailIndex(queueInst.tailIndex);
      setHeadIndex(queueInst.headIndex);
      counter++;
      if (counter === 2) setBtnDisabled("");
    });
  }

  function dequeue() {
    if (tailIndex === -1) return;

    setBtnDisabled("dequeue");

    queueInst.dequeue({
      firstTick: { ...queue[headIndex], state: ElementStates.Changing },
      secondTick: { letter: "", state: ElementStates.Default },
    });

    setQueue(queueInst.elements);
    setHeadIndex(queueInst.headIndex);

    queueInst.currentQueue$.pipe(take(1)).subscribe((currQueue: any) => {
      setQueue([...currQueue]);
      setHeadIndex(queueInst.headIndex);
      setTailIndex(queueInst.tailIndex);
      setBtnDisabled("");
    });
  }

  function clearQueue() {
    queueInst.clear();
    setQueue([...queueInst.elements]);
    setHeadIndex(queueInst.headIndex);
    setTailIndex(queueInst.tailIndex);
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
