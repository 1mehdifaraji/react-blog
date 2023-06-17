import { render } from "@testing-library/react";
import { Textarea } from "components";

describe("Textarea component", () => {
  it("Textarea component exists in document", () => {
    const { getByTestId } = render(<Textarea />);
    const element = getByTestId("textarea");

    expect(element).toBeInTheDocument();
  });

  it("Textarea renders label correctly", () => {
    const { getByTestId } = render(<Textarea label="label" />);
    const textareaLabel = getByTestId("textarea-label");
    const textarea = getByTestId("textarea");

    expect(textarea).toHaveClass("mt-2");
    expect(textareaLabel).toBeInTheDocument();
  });
});
