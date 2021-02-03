import { AppProps } from "next/app";
import "../../styles/globals.css";
import TopBar from "../components/TopBar";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <div className="bg-white h-screen">
        <div className="fixed">
          <TopBar />
        </div>
        <div className="pt-10">
          <Component {...pageProps} />
        </div>
      </div>
    </React.StrictMode>
  );
}
