import { Button } from "./button";
import { render, fireEvent, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("Button renders correctly", () => {
  it("without text", () => {
    const ButtonWithouText = renderer.create(<Button />);
    expect(ButtonWithouText).toMatchSnapshot();
  });

  it("with text", () => {
    const ButtonWithText = renderer.create(<Button text="text" />);
    expect(ButtonWithText).toMatchSnapshot();
  });

  it("when disabled", () => {
    const ButtonWithouText = renderer.create(<Button disabled={true} />);
    expect(ButtonWithouText).toMatchSnapshot();
  });

  it("when loading", () => {
    const ButtonWithouText = renderer.create(<Button isLoader={true} />);
    expect(ButtonWithouText).toMatchSnapshot();
  });
});

describe("Button events:", () => {
  it("click calls function once", () => {
    const mockCallBack = jest.fn();
    render(<Button onClick={mockCallBack} text="Test btn click" />);
    const btn = screen.getByText("Test btn click");
    fireEvent.click(btn);
    expect(mockCallBack.call.length).toEqual(1);
  });
})
