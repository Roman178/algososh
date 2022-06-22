import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./LinkedListNode";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { LinkedListActionsEnum } from "./list-page.types";

const linkedList = new LinkedList(
  new Array(6)
    .fill(0, 0, 6)
    .map((i) => (i + Math.ceil(Math.random() * 100)).toString())
);

export const ListPage: React.FC = () => {
  const [list, setList] = useState<string[]>(linkedList.arrayedList);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [topSmallCircleIndex, setTopSmallCircleIndex] = useState(-1);
  const [bottomSmallCircleIndex, setBottomSmallCircleIndex] = useState(-1);
  const [modifiedIndex, setModifiedIndex] = useState(-1);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);
  const [smallCircleLetter, setSmallCircleLetter] = useState("");

  const [btnDisable, setBtnDisable] = useState<LinkedListActionsEnum | "">("");

  function addToHead() {
    if (!value) return;

    setBtnDisable(LinkedListActionsEnum.ADD_HEAD);

    linkedList.prepend(value);
    setTopSmallCircleIndex(0);
    setSmallCircleLetter(value);

    setTimeout(() => {
      setList(linkedList.arrayedList);
      setTopSmallCircleIndex(-1);
      setSmallCircleLetter("");
      setModifiedIndex(0);

      setTimeout(() => {
        setModifiedIndex(-1);
        setBtnDisable("");
      }, 500);
    }, 500);
  }

  function addToTail() {
    if (!value) return;

    setBtnDisable(LinkedListActionsEnum.ADD_TAIL);

    linkedList.append(value);
    setTopSmallCircleIndex(list.length - 1);
    setSmallCircleLetter(value);

    setTimeout(() => {
      setList(linkedList.arrayedList);
      setTopSmallCircleIndex(-1);
      setSmallCircleLetter("");
      setModifiedIndex(linkedList.arrayedList.length - 1);

      setTimeout(() => {
        setModifiedIndex(-1);
        setBtnDisable("");
      }, 500);
    }, 500);
  }

  function removeFromHead() {
    setBtnDisable(LinkedListActionsEnum.RMV_HEAD);

    linkedList.deleteHead();
    setBottomSmallCircleIndex(0);
    setSmallCircleLetter(list[0] as string);
    setList(
      list.map((item, i) => {
        if (i === 0) {
          item = "";
          return item;
        } else {
          return item;
        }
      })
    );

    setTimeout(() => {
      setList(linkedList.arrayedList);
      setBottomSmallCircleIndex(-1);
      setSmallCircleLetter("");
      setBtnDisable("");
    }, 500);
  }

  function removeFromTail() {
    setBtnDisable(LinkedListActionsEnum.RMV_TAIL);

    linkedList.deleteTail();
    setBottomSmallCircleIndex(list.length - 1);
    setSmallCircleLetter(list[list.length - 1] as string);
    setList(
      list.map((item, i) => {
        if (i === list.length - 1) {
          item = "";
          return item;
        } else {
          return item;
        }
      })
    );

    setTimeout(() => {
      setList(linkedList.arrayedList);
      setBottomSmallCircleIndex(-1);
      setSmallCircleLetter("");
      setBtnDisable("");
    }, 500);
  }

  function addByIndex() {
    if (
      !index ||
      !value ||
      parseInt(index) < 0 ||
      parseInt(index) >= list.length
    ) {
      return;
    }

    setBtnDisable(LinkedListActionsEnum.ADD_BY_INDEX);
    linkedList.addByIndex(value, parseInt(index));
    let counter = 0;
    setTopSmallCircleIndex(0);
    setSmallCircleLetter(value);
    const arr: number[] = [];
    const interval = setInterval(() => {
      if (counter === parseInt(index)) {
        setTopSmallCircleIndex(-1);
        setSmallCircleLetter("");

        setChangingIndexes([]);
        setModifiedIndex(parseInt(index));
        setList(linkedList.arrayedList);

        setTimeout(() => {
          setModifiedIndex(-1);
          setBtnDisable("");
        }, 500);

        clearInterval(interval);
        return;
      }

      arr.push(counter);
      setChangingIndexes([...arr]);
      counter++;
      setTopSmallCircleIndex(counter);
    }, 500);
  }

  function removeByIndex() {
    if (!index || parseInt(index) < 0 || parseInt(index) >= list.length) return;

    setBtnDisable(LinkedListActionsEnum.RMV_BY_INDEX);

    linkedList.deleteByIndex(parseInt(index));
    const arr = [0];
    let counter = 0;
    setChangingIndexes([...arr]);

    const interval = setInterval(() => {
      if (counter === parseInt(index)) {
        setBottomSmallCircleIndex(parseInt(index));
        setSmallCircleLetter(list[parseInt(index)] as string);
        arr.pop();
        setChangingIndexes([...arr]);
        setList(
          list.map((item, i) => {
            if (i === parseInt(index)) {
              item = "";
              return item;
            } else {
              return item;
            }
          })
        );

        clearInterval(interval);

        setTimeout(() => {
          setChangingIndexes([]);
          setBottomSmallCircleIndex(-1);
          setSmallCircleLetter("");
          setList(linkedList.arrayedList);
          setBtnDisable("");
        }, 500);
        return;
      }

      counter++;
      arr.push(counter);
      setChangingIndexes([...arr]);
    }, 500);
  }
  function applyCircleState(index: number): ElementStates {
    if (index === modifiedIndex) return ElementStates.Modified;
    if (changingIndexes.includes(index)) return ElementStates.Changing;
    return ElementStates.Default;
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const submitter = e.nativeEvent.submitter as HTMLButtonElement;
    switch (submitter.name) {
      case LinkedListActionsEnum.ADD_HEAD:
        addToHead();
        break;
      case LinkedListActionsEnum.ADD_TAIL:
        addToTail();
        break;
      case LinkedListActionsEnum.RMV_HEAD:
        removeFromHead();
        break;
      case LinkedListActionsEnum.RMV_TAIL:
        removeFromTail();
        break;
      case LinkedListActionsEnum.ADD_BY_INDEX:
        addByIndex();
        break;
      case LinkedListActionsEnum.RMV_BY_INDEX:
        removeByIndex();
        break;
      default:
        break;
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <div>
            <Input
              extraClass={styles.input}
              maxLength={4}
              placeholder="Введите значение"
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
            <span>Максимум - 4 символа</span>
          </div>
          <Button
            type="submit"
            name={LinkedListActionsEnum.ADD_HEAD}
            isLoader={btnDisable === LinkedListActionsEnum.ADD_HEAD}
            disabled={!!btnDisable}
            text="Добавить в head"
          />
          <Button
            type="submit"
            name={LinkedListActionsEnum.ADD_TAIL}
            isLoader={btnDisable === LinkedListActionsEnum.ADD_TAIL}
            disabled={!!btnDisable}
            text="Добавить в tail"
          />
          <Button
            type="submit"
            name={LinkedListActionsEnum.RMV_HEAD}
            isLoader={btnDisable === LinkedListActionsEnum.RMV_HEAD}
            disabled={!!btnDisable}
            text="Удалить из head"
          />
          <Button
            type="submit"
            name={LinkedListActionsEnum.RMV_TAIL}
            isLoader={btnDisable === LinkedListActionsEnum.RMV_TAIL}
            disabled={!!btnDisable}
            text="Удалить из tail"
          />
        </div>
        <div className={styles.box}>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            value={index}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIndex(e.target.value)
            }
          />
          <Button
            type="submit"
            name={LinkedListActionsEnum.ADD_BY_INDEX}
            isLoader={btnDisable === LinkedListActionsEnum.ADD_BY_INDEX}
            disabled={!!btnDisable}
            text="Добавить по индексу"
            extraClass={styles.largeBtn}
          />
          <Button
            type="submit"
            name={LinkedListActionsEnum.RMV_BY_INDEX}
            isLoader={btnDisable === LinkedListActionsEnum.RMV_BY_INDEX}
            disabled={!!btnDisable}
            text="Удалить по индексу"
            extraClass={styles.largeBtn}
          />
        </div>
      </form>

      <div className={styles.listWrapper}>
        {list.map((item, i) => {
          return (
            <div className={styles.circles} key={i}>
              {i === topSmallCircleIndex && (
                <Circle
                  letter={smallCircleLetter}
                  extraClass={styles.topSmallCircle}
                  isSmall={true}
                  state={ElementStates.Changing}
                />
              )}
              <div className={styles.circleArrowWrapper} key={item}>
                <Circle
                  index={i}
                  letter={item}
                  tail={`${i === list.length - 1 ? "tail" : ""}`}
                  head={`${i === 0 ? "head" : ""}`}
                  state={applyCircleState(i)}
                />{" "}
                <ArrowIcon />
              </div>
              {i === bottomSmallCircleIndex && (
                <Circle
                  letter={smallCircleLetter}
                  extraClass={styles.bottomSmallCircle}
                  isSmall
                  state={ElementStates.Changing}
                />
              )}
            </div>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
