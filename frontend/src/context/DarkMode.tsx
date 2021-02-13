import { createContext, FC, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type DarkModeData = { isEnabled: boolean; toggle: () => void };

export const DarkModeContext = createContext<DarkModeData>({
  isEnabled: false,
  toggle: () => {},
});

export const DarkModeProvider: FC = ({ children }) => {
  const [isEnabled, setEnabled] = useLocalStorage<boolean>("darkMode", false);

  const data = useMemo<DarkModeData>(() => {
    return { isEnabled, toggle: () => setEnabled((val) => !val) };
  }, [isEnabled]);

  return (
    <DarkModeContext.Provider value={data}>{children}</DarkModeContext.Provider>
  );
};
