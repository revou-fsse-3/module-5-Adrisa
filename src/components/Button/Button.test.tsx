import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Button from ".";

describe("Buttn componenet unit testing", () => {
  const mocking = {
    onSubmit: jest.fn(),
  };

  test("Button render correctly", () => {
    const document = render(
      <Button
        label={"Button testing"}
        onClick={mocking.onSubmit}
        name={"testing-name"}
      ></Button>
    );
    expect(document).toMatchSnapshot();
  });

  test("Button should able to click", async () => {
    render(
      <Button
        label={"Button testing"}
        onClick={mocking.onSubmit}
        name={"testing-name"}
      ></Button>
    );
    const button = screen.getByText("Button testing");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mocking.onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
