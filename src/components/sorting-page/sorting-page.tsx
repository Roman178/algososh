import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { IColumn, RadioValues, SortingType } from "./sorting-page.types";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<IColumn[]>([]);
  const [radio, setRadio] = useState<RadioValues>(RadioValues.SELECTION_SORT);
  const [btnDisabled, setBtnDisabled] = useState<"" | "asc" | "desc">("");

  function handleChangeRadio(e: ChangeEvent<HTMLInputElement>) {
    setRadio(e.target.value as RadioValues);
  }

  function randomArr() {
    let arrLength = 0;
    let resultArr = [];

    while (arrLength < 3 || arrLength > 17) {
      arrLength = Math.floor(Math.random() * 18);
    }

    for (let i = 0; i < arrLength; i++) {
      resultArr.push({
        index: Math.ceil(Math.random() * 100),
        state: ElementStates.Default,
      });
    }

    setArr(resultArr);
    return resultArr;
  }

  useEffect(() => {
    randomArr();
  }, []);

  function handleSortingTypeClick(sortType: SortingType) {
    if (arr.length === 0) return;

    if (radio === RadioValues.SELECTION_SORT) {
      if (sortType === SortingType.DESC) {
        setBtnDisabled("desc");
        sortSelectionDesc();
      } else {
        setBtnDisabled("asc");
        sortSelectionAsc();
      }
    } else {
      if (sortType === SortingType.DESC) {
        setBtnDisabled("desc");
        sortBubbleDesc();
      } else {
        setBtnDisabled("asc");
        sortBubbleAsc();
      }
    }
  }

  function sortSelectionDesc() {
    if (arr.length === 1) {
      const initArr = [...arr];
      initArr[0] = { ...initArr[0], state: ElementStates.Changing };
      setArr([...initArr]);
      setTimeout(() => {
        initArr[0] = { ...initArr[0], state: ElementStates.Modified };
        setArr([...initArr]);
        setBtnDisabled("");
      }, 300);
      return;
    }

    let counter = 1;
    const initArr = [...arr];
    const finishedArr: IColumn[] = [];
    initArr[0] = { ...initArr[0], state: ElementStates.Changing };
    initArr[1] = { ...initArr[1], state: ElementStates.Changing };

    setArr([...initArr]);

    let max =
      initArr[0].index > initArr[1].index ? initArr[0].index : initArr[1].index;
    let maxIndex = initArr[0].index > initArr[1].index ? 0 : 1;

    const interval = setInterval(() => {
      if (initArr.length === 2) {
        initArr[0].index > initArr[1].index
          ? setArr([
              ...finishedArr,
              { ...initArr[0], state: ElementStates.Modified },
              { ...initArr[1], state: ElementStates.Modified },
            ])
          : setArr([
              ...finishedArr,
              { ...initArr[1], state: ElementStates.Modified },
              { ...initArr[0], state: ElementStates.Modified },
            ]);

        clearInterval(interval);
        setBtnDisabled("");
        return;
      }
      if (counter + 1 === initArr.length) {
        finishedArr.push({
          ...initArr[maxIndex],
          state: ElementStates.Modified,
        });

        initArr.splice(maxIndex, 1);

        max =
          initArr[0].index > initArr[1].index
            ? initArr[0].index
            : initArr[1].index;
        maxIndex = initArr[0].index > initArr[1].index ? 0 : 1;

        initArr[0] = { ...initArr[0], state: ElementStates.Changing };
        initArr[1] = { ...initArr[1], state: ElementStates.Changing };
        initArr[initArr.length - 1] = {
          ...initArr[initArr.length - 1],
          state: ElementStates.Default,
        };
        counter = 1;

        setArr([...finishedArr, ...initArr]);
      } else {
        initArr[0] = { ...initArr[0], state: ElementStates.Changing };
        initArr[counter + 1] = {
          ...initArr[counter + 1],
          state: ElementStates.Changing,
        };
        initArr[counter] = {
          ...initArr[counter],
          state: ElementStates.Default,
        };
        setArr([...finishedArr, ...initArr]);

        if (initArr[counter + 1].index > max) {
          max = initArr[counter + 1].index;
          maxIndex = counter + 1;
        }

        counter++;
      }
    }, 300);
  }

  function sortSelectionAsc() {
    if (arr.length === 1) {
      const initArr = [...arr];
      initArr[0] = { ...initArr[0], state: ElementStates.Changing };
      setArr([...initArr]);
      setTimeout(() => {
        initArr[0] = { ...initArr[0], state: ElementStates.Modified };
        setArr([...initArr]);
        setBtnDisabled("");
      }, 300);
      return;
    }

    let counter = 1;
    const initArr = [...arr];
    const finishedArr: IColumn[] = [];
    initArr[0] = { ...initArr[0], state: ElementStates.Changing };
    initArr[1] = { ...initArr[1], state: ElementStates.Changing };

    setArr([...initArr]);

    let min =
      initArr[0].index < initArr[1].index ? initArr[0].index : initArr[1].index;
    let minIndex = initArr[0].index < initArr[1].index ? 0 : 1;

    const interval = setInterval(() => {
      if (initArr.length === 2) {
        initArr[0].index < initArr[1].index
          ? setArr([
              ...finishedArr,
              { ...initArr[0], state: ElementStates.Modified },
              { ...initArr[1], state: ElementStates.Modified },
            ])
          : setArr([
              ...finishedArr,
              { ...initArr[1], state: ElementStates.Modified },
              { ...initArr[0], state: ElementStates.Modified },
            ]);

        clearInterval(interval);
        setBtnDisabled("");
        return;
      }
      if (counter + 1 === initArr.length) {
        finishedArr.push({
          ...initArr[minIndex],
          state: ElementStates.Modified,
        });

        initArr.splice(minIndex, 1);

        min =
          initArr[0].index < initArr[1].index
            ? initArr[0].index
            : initArr[1].index;
        minIndex = initArr[0].index < initArr[1].index ? 0 : 1;

        initArr[0] = { ...initArr[0], state: ElementStates.Changing };
        initArr[1] = { ...initArr[1], state: ElementStates.Changing };
        initArr[initArr.length - 1] = {
          ...initArr[initArr.length - 1],
          state: ElementStates.Default,
        };
        counter = 1;

        setArr([...finishedArr, ...initArr]);
      } else {
        initArr[0] = { ...initArr[0], state: ElementStates.Changing };
        initArr[counter + 1] = {
          ...initArr[counter + 1],
          state: ElementStates.Changing,
        };
        initArr[counter] = {
          ...initArr[counter],
          state: ElementStates.Default,
        };
        setArr([...finishedArr, ...initArr]);

        if (initArr[counter + 1].index < min) {
          min = initArr[counter + 1].index;
          minIndex = counter + 1;
        }

        counter++;
      }
    }, 300);
  }

  function sortBubbleDesc() {
    if (arr.length === 1) {
      const initArr = [...arr];
      initArr[0] = { ...initArr[0], state: ElementStates.Changing };
      setArr([...initArr]);
      setTimeout(() => {
        initArr[0] = { ...initArr[0], state: ElementStates.Modified };
        setArr([...initArr]);
        setBtnDisabled("");
      }, 300);
      return;
    }

    const cloneArr: IColumn[] = [...arr];
    cloneArr[0] = { ...cloneArr[0], state: ElementStates.Changing };
    cloneArr[1] = { ...cloneArr[1], state: ElementStates.Changing };

    if (cloneArr[0].index < cloneArr[1].index) {
      const min = cloneArr[0];
      const max = cloneArr[1];

      cloneArr.splice(0, 1, max);
      cloneArr.splice(1, 1, min);
    }

    let counter = 2;
    let uncheckedLength = cloneArr.length - 1;

    setArr([...cloneArr]);

    const intrvl = setInterval(() => {
      if (uncheckedLength === 1) {
        if (cloneArr[0].index < cloneArr[1].index) {
          const min = cloneArr[0];
          const max = cloneArr[1];

          cloneArr.splice(0, 1, max);
          cloneArr.splice(1, 1, min);
        }

        cloneArr[0] = { ...cloneArr[0], state: ElementStates.Modified };
        cloneArr[1] = { ...cloneArr[1], state: ElementStates.Modified };

        setArr([...cloneArr]);
        clearInterval(intrvl);
        setBtnDisabled("");

        return;
      }
      if (counter === uncheckedLength) {
        cloneArr[counter - 2] = {
          ...cloneArr[counter - 2],
          state: ElementStates.Default,
        };
        cloneArr[counter - 1] = {
          ...cloneArr[counter - 1],
          state: ElementStates.Default,
        };

        cloneArr[0] = { ...cloneArr[0], state: ElementStates.Changing };
        cloneArr[1] = { ...cloneArr[1], state: ElementStates.Changing };

        if (cloneArr[0].index < cloneArr[1].index) {
          const min = cloneArr[0];
          const max = cloneArr[1];

          cloneArr.splice(0, 1, max);
          cloneArr.splice(1, 1, min);
        }

        if (cloneArr[counter - 1].index < cloneArr[counter].index) {
          const min = cloneArr[counter - 1];
          const max = cloneArr[counter];

          cloneArr.splice(counter - 1, 1, max);
          cloneArr.splice(counter, 1, min);
        }

        cloneArr[counter] = {
          ...cloneArr[counter],
          state: ElementStates.Modified,
        };

        counter = 2;
        uncheckedLength--;

        setArr([...cloneArr]);
      } else {
        cloneArr[counter - 2] = {
          ...cloneArr[counter - 2],
          state: ElementStates.Default,
        };
        cloneArr[counter] = {
          ...cloneArr[counter],
          state: ElementStates.Changing,
        };

        if (cloneArr[counter - 1].index < cloneArr[counter].index) {
          const min = cloneArr[counter - 1];
          const max = cloneArr[counter];

          cloneArr.splice(counter - 1, 1, max);
          cloneArr.splice(counter, 1, min);
        }

        setArr([...cloneArr]);

        counter++;
      }
    }, 300);
  }

  function sortBubbleAsc() {
    if (arr.length === 1) {
      const initArr = [...arr];
      initArr[0] = { ...initArr[0], state: ElementStates.Changing };
      setArr([...initArr]);
      setTimeout(() => {
        initArr[0] = { ...initArr[0], state: ElementStates.Modified };
        setArr([...initArr]);
        setBtnDisabled("");
      }, 300);
      return;
    }

    const cloneArr: IColumn[] = [...arr];
    cloneArr[0] = { ...cloneArr[0], state: ElementStates.Changing };
    cloneArr[1] = { ...cloneArr[1], state: ElementStates.Changing };

    if (cloneArr[0].index > cloneArr[1].index) {
      const min = cloneArr[1];
      const max = cloneArr[0];

      cloneArr.splice(0, 1, min);
      cloneArr.splice(1, 1, max);
    }

    let counter = 2;
    let uncheckedLength = cloneArr.length - 1;

    setArr([...cloneArr]);

    const intrvl = setInterval(() => {
      if (uncheckedLength === 1) {
        if (cloneArr[0].index > cloneArr[1].index) {
          const max = cloneArr[0];
          const min = cloneArr[1];

          cloneArr.splice(0, 1, min);
          cloneArr.splice(1, 1, max);
        }

        cloneArr[0] = { ...cloneArr[0], state: ElementStates.Modified };
        cloneArr[1] = { ...cloneArr[1], state: ElementStates.Modified };

        setArr([...cloneArr]);
        clearInterval(intrvl);
        setBtnDisabled("");
        return;
      }
      if (counter === uncheckedLength) {
        cloneArr[counter - 2] = {
          ...cloneArr[counter - 2],
          state: ElementStates.Default,
        };
        cloneArr[counter - 1] = {
          ...cloneArr[counter - 1],
          state: ElementStates.Default,
        };

        cloneArr[0] = { ...cloneArr[0], state: ElementStates.Changing };
        cloneArr[1] = { ...cloneArr[1], state: ElementStates.Changing };

        if (cloneArr[0].index > cloneArr[1].index) {
          const min = cloneArr[1];
          const max = cloneArr[0];

          cloneArr.splice(0, 1, min);
          cloneArr.splice(1, 1, max);
        }

        if (cloneArr[counter - 1].index > cloneArr[counter].index) {
          const min = cloneArr[counter];
          const max = cloneArr[counter - 1];

          cloneArr.splice(counter - 1, 1, min);
          cloneArr.splice(counter, 1, max);
        }

        cloneArr[counter] = {
          ...cloneArr[counter],
          state: ElementStates.Modified,
        };

        counter = 2;
        uncheckedLength--;

        setArr([...cloneArr]);
      } else {
        cloneArr[counter - 2] = {
          ...cloneArr[counter - 2],
          state: ElementStates.Default,
        };
        cloneArr[counter] = {
          ...cloneArr[counter],
          state: ElementStates.Changing,
        };

        if (cloneArr[counter - 1].index > cloneArr[counter].index) {
          const min = cloneArr[counter];
          const max = cloneArr[counter - 1];

          cloneArr.splice(counter - 1, 1, min);
          cloneArr.splice(counter, 1, max);
        }

        setArr([...cloneArr]);

        counter++;
      }
    }, 300);
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    // In react-testing-library e.nativeEvent.submitter = undefined;
    // bug-report is opened https://github.com/testing-library/react-testing-library/issues/870
    // const submitter = e.nativeEvent.submitter as HTMLButtonElement;
    const submitter = document.activeElement as HTMLButtonElement;
    if (submitter.name === SortingType.ASC) {
      handleSortingTypeClick(SortingType.ASC);
    } else if (submitter.name === SortingType.DESC) {
      handleSortingTypeClick(SortingType.DESC);
    } else {
      randomArr();
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form
        data-testid="test-sorting-form"
        className={styles.wrapper}
        onSubmit={handleSubmit}
      >
        <RadioInput
          label={RadioValues.SELECTION_SORT}
          value={RadioValues.SELECTION_SORT}
          checked={radio === RadioValues.SELECTION_SORT}
          onChange={handleChangeRadio}
        />
        <RadioInput
          label={RadioValues.BUBBLE_SORT}
          value={RadioValues.BUBBLE_SORT}
          checked={radio === RadioValues.BUBBLE_SORT}
          onChange={handleChangeRadio}
        />
        <Button
          type="submit"
          extraClass={styles.btn}
          text="По возрастанию"
          disabled={!!btnDisabled}
          name={SortingType.ASC}
          isLoader={btnDisabled === "asc"}
        />
        <Button
          type="submit"
          extraClass={styles.btn}
          text="По убыванию"
          name={SortingType.DESC}
          disabled={!!btnDisabled}
          isLoader={btnDisabled === "desc"}
        />
        <Button
          type="submit"
          extraClass={styles.btn}
          text="Новый массив"
          name="randomArr"
          disabled={!!btnDisabled}
        />
      </form>
      <div className={styles.columnBox}>
        {arr.map((item, i) => {
          return (
            <Column
              extraClass={styles.column}
              state={item.state}
              index={item.index}
              key={i}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
