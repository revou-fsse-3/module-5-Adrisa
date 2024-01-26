import { fireEvent, render, screen } from "@testing-library/react";
import Input from ".";
describe("Input component unit testing", () => {
  const mocking = {
    onChange: jest.fn(),
  };
  test("Expect render correctly", () => {
    const document = render(
      <Input
        placeHolder="testing-placeholder"
        handleOnChange={mocking.onChange}
      />
    );
    expect(document).toMatchSnapshot();
  });

  test("Expect the placeholder to have right content", () => {
    render(
      <Input
        placeHolder="testing-placeholder"
        handleOnChange={mocking.onChange}
      />
    );
    const element = screen.getByPlaceholderText("testing-placeholder");
    expect(element).toMatchSnapshot();
  });
});
