import { useRef } from "react";

const useDebounce = (time: number): [(callback: () => void) => void] => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = (callback: () => void) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(), time);
  };

  return [start];
};

export default useDebounce;
