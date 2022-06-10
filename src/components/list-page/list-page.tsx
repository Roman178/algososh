import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [list, setList] = useState(["0", "34", "8", "1"]);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");
  const [topSmallCircleIndex, setTopSmallCircleIndex] = useState(-1);
  const [bottomSmallCircleIndex, setBottomSmallCircleIndex] = useState(-1);
  const [modifiedIndex, setModifiedIndex] = useState(-1);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);
  const [smallCircleLetter, setSmallCircleLetter] = useState("");

  const [btnDisable, setBtnDisable] = useState<
    | "addHead"
    | "addTail"
    | "rmvHead"
    | "rmvTail"
    | "addByIndex"
    | "rmvByIndex"
    | ""
  >("");

  function addToTail() {
    if (!value) return;
    setBtnDisable("addTail");
    setTopSmallCircleIndex(list.length - 1);
    setSmallCircleLetter(value);

    setTimeout(() => {
      const copy = [...list];
      copy.push(value);
      setTopSmallCircleIndex(-1);
      setSmallCircleLetter("");
      setModifiedIndex(copy.length - 1);
      setList(copy);

      setTimeout(() => {
        setModifiedIndex(-1);
        setBtnDisable("");
      }, 500);
    }, 500);
  }

  function addToHead() {
    if (!value) return;
    setBtnDisable("addHead");
    setTopSmallCircleIndex(0);
    setSmallCircleLetter(value);

    setTimeout(() => {
      const copy = [...list];
      copy.splice(0, 0, value);
      setTopSmallCircleIndex(-1);
      setSmallCircleLetter("");
      setModifiedIndex(0);
      setList(copy);

      setTimeout(() => {
        setModifiedIndex(-1);
        setBtnDisable("");
      }, 500);
    }, 500);
  }

  function removeFromTail() {
    setBtnDisable("rmvTail");
    const copy = [...list];
    setSmallCircleLetter(copy[copy.length - 1]);
    copy[copy.length - 1] = "";
    setBottomSmallCircleIndex(copy.length - 1);
    setList([...copy]);

    setTimeout(() => {
      copy.pop();
      setBottomSmallCircleIndex(-1);
      setSmallCircleLetter("");
      setList([...copy]);
      setBtnDisable("");
    }, 1000);
  }

  function removeFromHead() {
    setBtnDisable("rmvHead");
    const copy = [...list];
    setSmallCircleLetter(copy[0]);
    copy[0] = "";
    setBottomSmallCircleIndex(0);
    setList([...copy]);

    setTimeout(() => {
      copy.shift();
      setBottomSmallCircleIndex(-1);
      setSmallCircleLetter("");
      setList([...copy]);
      setBtnDisable("");
    }, 1000);
  }

  function removeByIndex() {
    if (index === "" || +index < 0 || +index >= list.length) return;
    setBtnDisable("rmvByIndex");

    let counter = 1;
    const arr: number[] = [];
    arr.push(0);
    setChangingIndexes([...arr]);

    const interval = setInterval(() => {
      if ((counter - 1).toString() === index) {
        clearInterval(interval);
        const copy = [...list];

        setBottomSmallCircleIndex(+index);
        setSmallCircleLetter(copy[+index]);

        copy[+index] = "";
        arr.pop();

        setList([...copy]);
        setChangingIndexes([...arr]);

        setTimeout(() => {
          copy.splice(+index, 1);
          setChangingIndexes([]);
          setBottomSmallCircleIndex(-1);
          setList([...copy]);
          setBtnDisable("");
        }, 1000);
        return;
      }

      arr.push(counter);
      setChangingIndexes([...arr]);

      counter++;
    }, 1000);
  }

  function addByIndex() {
    if (index === "" || +index < 0 || +index >= list.length) return;
    setBtnDisable("addByIndex");

    const arr: number[] = [];
    arr.push(0);
    setChangingIndexes([...arr]);

    setSmallCircleLetter(value);
    setTopSmallCircleIndex(0);
    let counter = 0;

    const interval = setInterval(() => {
      if (counter.toString() === index) {
        clearInterval(interval);

        setChangingIndexes([]);
        setTopSmallCircleIndex(-1);
        setModifiedIndex(counter);
        const copy = [...list];
        copy.splice(counter, 0, value);
        setList([...copy]);
        setTimeout(() => {
          setModifiedIndex(-1);
          setSmallCircleLetter("");
          setBtnDisable("");
        }, 1000);
        return;
      }

      arr.push(counter);
      setChangingIndexes([...arr]);
      setTopSmallCircleIndex(counter + 1);

      counter++;
    }, 1000);
  }

  function applyCircleState(index: number): ElementStates {
    if (index === modifiedIndex) return ElementStates.Modified;
    if (changingIndexes.includes(index)) return ElementStates.Changing;
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Связный список">
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
          disabled={!!btnDisable}
          isLoader={btnDisable === "addHead"}
          text="Добавить в head"
          onClick={addToHead}
        />
        <Button
          disabled={!!btnDisable}
          isLoader={btnDisable === "addTail"}
          text="Добавить в tail"
          onClick={addToTail}
        />
        <Button
          disabled={!!btnDisable}
          isLoader={btnDisable === "rmvHead"}
          text="Удалить из head"
          onClick={removeFromHead}
        />
        <Button
          disabled={!!btnDisable}
          isLoader={btnDisable === "rmvTail"}
          text="Удалить из tail"
          onClick={removeFromTail}
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
          disabled={!!btnDisable}
          isLoader={btnDisable === "addByIndex"}
          text="Добавить по индексу"
          onClick={addByIndex}
          extraClass={styles.largeBtn}
        />
        <Button
          disabled={!!btnDisable}
          isLoader={btnDisable === "rmvByIndex"}
          text="Удалить по индексу"
          onClick={removeByIndex}
          extraClass={styles.largeBtn}
        />
      </div>

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
                  tail={`${
                    i === list.length - 1 && bottomSmallCircleIndex === -1
                      ? "tail"
                      : ""
                  }`}
                  head={`${
                    i === 0 && topSmallCircleIndex === -1 ? "head" : ""
                  }`}
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
