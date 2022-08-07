import { Circle } from "./circle";
import renderer from "react-test-renderer";
import { Button } from "../button/button";

describe("Circle renders correctly", () => {
  it("without letters", () => {
    const CircleWithouText = renderer.create(<Circle />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("with letters", () => {
    const CircleWithouText = renderer.create(<Circle letter="abcd" />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("with head", () => {
    const CircleWithouText = renderer.create(<Circle head="head" />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("with head as the React component", () => {
    const CircleWithouText = renderer.create(<Circle head={<Button />} />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("with tail", () => {
    const CircleWithouText = renderer.create(<Circle tail="head" />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("with tail as the React component", () => {
    const CircleWithouText = renderer.create(<Circle tail={<Button />} />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("with index", () => {
    const CircleWithouText = renderer.create(<Circle index={1} />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("when isSmall prop is true", () => {
    const CircleWithouText = renderer.create(<Circle isSmall={true} />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("when default state", () => {
    const CircleWithouText = renderer.create(<Circle state="default" />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("when changing state", () => {
    const CircleWithouText = renderer.create(<Circle state="changing" />);
    expect(CircleWithouText).toMatchSnapshot();
  });

  it("when modified state", () => {
    const CircleWithouText = renderer.create(<Circle state="modified" />);
    expect(CircleWithouText).toMatchSnapshot();
  });
});
