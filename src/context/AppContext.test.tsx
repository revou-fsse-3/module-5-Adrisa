import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useLocation, AppContextProvider } from "./AppContext";

test("AppProvider should be return coreact value", async () => {
  const userData = {
    name: "Indonesia",
    iso3: "IDN",
    iso2: "ID",
    states: ["Bandung", "jakarta"],
  };

  const TestComponent = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = useLocation();
    const { location, setLocation } = context;

    const getUserData = () => {
      setLocation?.(userData);
    };

    return (
      <>
        <div>
          <p>{`Name: ${location?.name}`}</p>
          <button onClick={getUserData}>New User</button>
        </div>
      </>
    );
  };

  // render semua tampilan
  render(
    <AppContextProvider>
      <TestComponent />
    </AppContextProvider>
  );

  // cek dan test semua tampilan pada TestComponent
  expect(screen.getByText("New User")).toBeDefined();
  waitFor(() => fireEvent.click(screen.getByRole("button")));
  expect(screen.getByText(`Name: ${userData.name}`)).toBeDefined();
});
