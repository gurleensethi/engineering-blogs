import { useEffect } from "react";

function usePropChanged<T>(
  previousValue: T,
  newValue: T,
  update: (value: T) => void
) {
  useEffect(() => {
    if (previousValue != newValue) {
      update(newValue);
    }
  }, [newValue]);
}

export default usePropChanged;
