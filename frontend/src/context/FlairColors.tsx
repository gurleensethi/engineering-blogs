import { createContext, FC, useContext, useMemo } from "react";
import { DarkModeContext } from "./DarkMode";

const flairColors = [
  "text-red-500 bg-red-100",
  "text-blue-500 bg-blue-100",
  "text-green-500 bg-green-100",
  "text-teal-500 bg-teal-100",
  "text-orange-500 bg-orange-100",
  "text-indigo-500 bg-indigo-100",
  "text-violet-500 bg-violet-100",
];

const flairColorsDark = [
  "text-white bg-red-500",
  "text-white bg-blue-500",
  "text-white bg-green-500",
  "text-white bg-teal-500",
  "text-white bg-orange-500",
  "text-white bg-indigo-500",
  "text-white bg-violet-500",
];

const getFlairColor = (id: string): string => {
  return flairColors[id.charCodeAt(0) % flairColors.length];
};

const getFlairColorDark = (id: string): string => {
  return flairColorsDark[id.charCodeAt(0) % flairColors.length];
};

type FlairColorData = { getFlairColor: (id: string) => string };

export const FlairColorsContext = createContext<FlairColorData>({
  getFlairColor,
});

export const FlairColorsProvider: FC = ({ children }) => {
  const darkMode = useContext(DarkModeContext);

  const state = useMemo<FlairColorData>(
    () => ({
      getFlairColor: darkMode.isEnabled ? getFlairColorDark : getFlairColor,
    }),
    [darkMode.isEnabled]
  );

  return (
    <FlairColorsContext.Provider value={state}>
      {children}
    </FlairColorsContext.Provider>
  );
};
