import { AppProps } from "next/dist/next-server/lib/router/router";
import { Router } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../context/DarkMode";
import TopBar from "./TopBar";
import TopBarLoading from "./TopBarLoading";

export const Page: FC<AppProps> = ({ Component, pageProps }) => {
  const [isLoading, setLoading] = useState(false);
  const darkMode = useContext(DarkModeContext);

  useEffect(() => {
    const onRouteChangeStart = () => {
      setLoading(true);
    };
    const onRouteChangeComplete = () => {
      setLoading(false);
    };
    const onRouteChangeError = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", onRouteChangeStart);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);
    Router.events.on("routeChangeError", onRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
      Router.events.off("routeChangeError", onRouteChangeError);
    };
  }, []);

  return (
    <div className={`${darkMode.isEnabled ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 h-screen">
        <div className="fixed">
          <TopBar />
        </div>
        <TopBarLoading isLoading={isLoading} />
        <div className="px-8 py-24 fade-in h-screen w-screen overflow-scroll">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};
