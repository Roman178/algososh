import { SortingPage } from "./sorting-page";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
jest.setTimeout(240000);

it("The length of the array never be 0 or 1", () => {
  const { container } = render(
    <Router>
      <SortingPage />
    </Router>
  );
  let arrLengths = [];
  // fire 100 clicks to test that sorting arr never have 0 or 1 length
  for (let i = 0; i < 100; i++) {
    fireEvent.click(screen.getByText("Новый массив"));
    arrLengths.push(container.querySelectorAll(".text_type_column").length);
  }
  const arrLengthIsEmptyOrOne =
    arrLengths.includes(0) || arrLengths.includes(1);
  expect(arrLengthIsEmptyOrOne).toBeFalsy();
});

describe("The array is sorted correctly", () => {
  const testingCb = (sortingType, ascOrDesc) => {
    return async () => {
      const { container } = render(
        <Router>
          <SortingPage />
        </Router>
      );
      userEvent.click(screen.getByText(sortingType));
      userEvent.click(screen.getByText(ascOrDesc));

      const initNumbers = [
        ...container.querySelectorAll(".text_type_column"),
      ].map((i) => parseInt(i.textContent));
      initNumbers.pop();
      let sortedNums;

      ascOrDesc === "По возрастанию"
        ? (sortedNums = [...initNumbers].sort((a, b) => a - b))
        : (sortedNums = [...initNumbers].sort((a, b) => b - a));

      const sortedNumsStr = sortedNums.join("");
      const imgLoader = await screen.findByAltText("Загрузка.");

      await waitFor(
        () => {
          expect(imgLoader).not.toBeInTheDocument();
        },
        { timeout: 60000 }
      );
      expect(container.querySelector(".columnBox").textContent).toEqual(
        sortedNumsStr
      );
    };
  };
  it("when selection asc", testingCb("Выбор", "По возрастанию"));
  it("when selection desc", testingCb("Выбор", "По убыванию"));
  it("when bubble asc", testingCb("Пузырек", "По возрастанию"));
  it("when bubble desc", testingCb("Пузырек", "По убыванию"));
});
