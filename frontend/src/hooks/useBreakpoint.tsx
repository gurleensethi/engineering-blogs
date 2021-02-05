import React from "react";
import { useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import customConfig from "../../tailwind.config";

const fullConfig = resolveConfig(customConfig);

const useBreakpoint = (breakpoint: string): boolean => {
  const [windowWidth, setWindowWidth] = React.useState<null | number>(null);

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);

    // Calling the method once so that we have a window size.
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!windowWidth) {
    return false;
  }

  const width: string | undefined = fullConfig.theme.screens[breakpoint];

  if (!width) {
    return false;
  }

  const widthNum = Number(width.split("px")[0]);

  return windowWidth >= widthNum;
};

export default useBreakpoint;
