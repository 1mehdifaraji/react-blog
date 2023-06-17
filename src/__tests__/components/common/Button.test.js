import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { Button } from "components";

describe("Button component", () => {
  it("Button component exists in document", () => {
    const { getByTestId } = render(<Button />);
    const element = getByTestId("button");

    expect(element).toBeInTheDocument();
  });

  it("Button custom className applies to component", () => {
    const { getByTestId } = render(<Button className="custom-class" />);
    const element = getByTestId("button");

    const buttonOwnClasses =
      "rounded-3xl py-2 px-4 bg-blue active:bg-darkBlue shadow-btn active:shadow-none transition-all text-sm flex items-center space-x-2 hover:shadow-btnHover text-white";

    expect(element).toHaveClass(buttonOwnClasses);
    expect(element).toHaveClass("custom-class");
  });

  it("Button onClick", async () => {
    const handleOnClick = jest.fn();

    const { getByTestId } = render(<Button onClick={handleOnClick} />);
    const element = getByTestId("button");

    fireEvent.click(element);

    expect(handleOnClick).toBeCalled();
  });

  it("Button loading", async () => {
    const { getByTestId } = render(<Button loading />);
    const element = getByTestId("button");

    expect(element).toBeDisabled();
  });
});
