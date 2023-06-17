import { render } from "@testing-library/react";
import { Input } from "components";

describe("Input component", () => {
  it("Input component exists in document", () => {
    const { getByTestId } = render(<Input />);
    const element = getByTestId("input");

    expect(element).toBeInTheDocument();
  });

  it("Input renders label correctly", () => {
    const { getByTestId } = render(<Input label="label" />);
    const inputLabel = getByTestId("input-label");
    const input = getByTestId("input");

    expect(input).toHaveClass("mt-2");
    expect(inputLabel).toBeInTheDocument();
  });
});
