import { StringComponent } from "./string";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
jest.setTimeout(30000);

describe("Reverse string correctly", () => {
  const testingCb = (string, reversedString) => {
    return async () => {
      const { container } = render(
        <Router>
          <StringComponent />
        </Router>
      );
      const input = screen.getByTestId("test-input");
      userEvent.type(input, string);
      const reverseBtn = screen.getByText("Развернуть");
      fireEvent.click(reverseBtn);
      await waitFor(
        () => {
          expect(container.querySelector(".circles").textContent).toBe(
            reversedString
          );
        },
        { timeout: 10000 }
      );
    };
  };
  it("with an even number of chars", testingCb("123456", "654321"));
  it("with an odd number of chars", testingCb("12345", "54321"));
  it("with an empty string", () => {
    const { container } = render(
      <Router>
        <StringComponent />
      </Router>
    );
    const reverseBtn = screen.getByText("Развернуть");
    fireEvent.click(reverseBtn);
    expect(container.querySelector(".circles").innerHTML).toBeFalsy();
  });
  it("with one char", async () => {
    const { container } = render(
      <Router>
        <StringComponent />
      </Router>
    );
    const input = screen.getByTestId("test-input");
    userEvent.type(input, "1");
    const reverseBtn = screen.getByText("Развернуть");
    fireEvent.click(reverseBtn);

    let cirlce = container.querySelector(".circle");
    expect(cirlce).toHaveClass("changing");

    await waitFor(
      () => {
        expect(cirlce).toHaveClass("modified");
      },
      { timeout: 5000 }
    );
    expect(cirlce.textContent).toBe("1");
  });
});
