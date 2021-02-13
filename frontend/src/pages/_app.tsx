import { AppProps } from "next/app";
import "../../styles/globals.css";
import React from "react";
import UserProvider from "../context/UserProvider";
import { DarkModeProvider } from "../context/DarkMode";
import { Page } from "../components/Page";
import { FlairColorsProvider } from "../context/FlairColors";

const App = (props: AppProps) => {
  return (
    <React.StrictMode>
      <UserProvider>
        <DarkModeProvider>
          <FlairColorsProvider>
            <Page {...props} />
          </FlairColorsProvider>
        </DarkModeProvider>
      </UserProvider>
    </React.StrictMode>
  );
};

export default App;
