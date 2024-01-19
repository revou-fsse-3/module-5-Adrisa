import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppContext, Location, PropCity } from "@/context";

const initialSearchState = {
  currentStates: [],
  searchField: "",
};

const City = () => {
  const country = localStorage.getItem("country");
  const { currentCity, location, setCurrentCity } = useContext(AppContext);
  const navigate = useRouter();
  const [search, setSearch] = useState(initialSearchState);
  const nameCountry = location?.name;
  const getStateList = (location: any) => {
    return location?.states;
  };

  const handleClickLocation = (state: Location) => {
    setCurrentCity?.(state);
    localStorage.removeItem("country");
    localStorage.setItem("state", state.name);
    navigate.push("/weather");
    console.log(currentCity);
  };

  useEffect(() => {
    const setStateList = getStateList(location);
    setSearch((prevValue) => {
      return {
        currentStates: setStateList,
        searchField: prevValue.searchField,
      };
    });
  }, []);

  const { currentStates, searchField } = search;
  const [filteredCountries, setFilteredCountries] = useState(currentStates);

  useEffect(() => {
    const newFilteredCountries = currentStates.filter((country: Location) => {
      return country.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredCountries(newFilteredCountries);
  }, [currentStates, searchField]);

  const handleOnChange = (event: { target: { value: string } }) => {
    const newValue = event.target.value.toLocaleLowerCase();

    setSearch((prevValue) => {
      return {
        currentStates: prevValue.currentStates,
        searchField: newValue,
      };
    });
  };
  const handleBack = () => {
    navigate.push("/");
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-6">
        <button
          onClick={handleBack}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back
        </button>
        <div className="relative">
          <input
            onChange={handleOnChange}
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Search City of ${nameCountry}`}
            required
          />
        </div>
      </div>
      <div className="flex  justify-center flex-wrap gap-5">
        {filteredCountries?.map((state: any, id) => {
          const name = state.name;
          return (
            <div
              key={id}
              className="basis-64 bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs"
            >
              <img
                className="mb-3  mx-auto shadow-md "
                src="https://9to5mac.com/wp-content/uploads/sites/6/2023/04/Apple-Weather-app.jpg?quality=82&strip=all&w=1600"
                alt={`flag of ${name}`}
              />
              <h1 className="text-lg text-gray-700 overflow-hidden">
                {" "}
                {name}{" "}
              </h1>

              <button
                name={`${name}`}
                onClick={() => handleClickLocation(state)}
                className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
              >
                Select
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default City;
