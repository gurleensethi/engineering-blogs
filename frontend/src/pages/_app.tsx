import { AppProps } from "next/app";
import "../../styles/globals.css";
import TopBar from "../components/TopBar";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Loading from "../components/Loading";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setLoading] = useState(false);

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
    <React.StrictMode>
      <div className="bg-white h-screen">
        <div className="fixed">
          <TopBar />
        </div>
        <Loading isLoading={isLoading} />
        <div className="pt-10">
          <Component {...pageProps} />
        </div>
      </div>
    </React.StrictMode>
  );
}
