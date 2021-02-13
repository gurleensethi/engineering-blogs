import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    let value: string = window.localStorage.getItem(key);

    if (!value) {
      window.localStorage.setItem(
        key,
        JSON.stringify({ payload: initialValue })
      );
    } else {
      setState(JSON.parse(value).payload);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify({ payload: state }));
  }, [state]);

  return [state, setState];
}

export default useLocalStorage;
