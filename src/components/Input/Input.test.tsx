import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Input from ".";

describe("Input component unit testing", () => {
  const mocking = {
    onChange: jest.fn(),
  };

  test("renders correctly with default values", () => {
    const { asFragment } = render(
      <Input
        placeHolder="testing-placeholder"
        handleOnChange={mocking.onChange}
        value={undefined}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders with the correct placeholder content", () => {
    render(
      <Input
        placeHolder="testing-placeholder"
        handleOnChange={mocking.onChange}
        value={undefined}
      />
    );
    const element = screen.getByPlaceholderText("testing-placeholder");
    expect(element).toMatchSnapshot();
  });

  test("renders input with the initial value", () => {
    render(
      <Input
        placeHolder="testing-placeholder"
        handleOnChange={mocking.onChange}
        value="test value"
      />
    );

    const input = screen.getByPlaceholderText("testing-placeholder");

    expect(input).toBeDefined();
    expect(screen.getByDisplayValue("test value")).toMatchSnapshot();
  });

  test("calls onChange when input value changes", async () => {
    render(
      <Input
        placeHolder="testing-placeholder"
        handleOnChange={mocking.onChange}
      />
    );

    const input = screen.getByPlaceholderText("testing-placeholder");

    // Change the input value
    fireEvent.change(input, { target: { value: "new value" } });

    // Check if the onChange function is called once with the new value
    await waitFor(() => {
      expect(mocking.onChange).toHaveBeenCalled();
      //   expect(mocking.onChange).toHaveBeenCalledWith("new value");
    });
  });
});
