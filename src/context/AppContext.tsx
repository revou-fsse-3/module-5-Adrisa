import { Dispatch, ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}

export interface Location {
  name: string;
  iso3?: string;
  iso2?: string;
  states?: string[];
}

export interface PropCity {
  name: any;
}

interface Context {
  location?: Location;
  setLocation?: React.Dispatch<React.SetStateAction<Location>>;
  currentCity?: PropCity | undefined;
  setCurrentCity?: React.Dispatch<React.SetStateAction<PropCity>>;
}

const defaultValue: Context = {
  location: undefined,
  setLocation: undefined,
  currentCity: undefined,
  setCurrentCity: undefined,
};

const initialValue = {
  name: "",
  iso3: "",
  iso2: "",
  states: [],
};

export const AppContext = createContext(defaultValue);

export const AppContextProvider = ({ children }: Props) => {
  const [location, setLocation] = useState<Location>(initialValue);
  const [currentCity, setCurrentCity] = useState<PropCity>();
  const value = { location, setLocation, currentCity, setCurrentCity };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
